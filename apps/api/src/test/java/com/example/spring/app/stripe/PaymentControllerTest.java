package com.example.spring.app.stripe;

import com.example.spring.app.user.UserDTO;
import com.example.spring.core.keycloakClient.UserResource;
import com.example.spring.util.TestJwtTokenBuilder;
import com.example.spring.util.TestUserFactory;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration tests for PaymentController.
 * UserResource is mocked to avoid Keycloak dependency.
 * Stripe static calls (CustomerUtil.findOrCreateCustomer, Session.create) are mocked via mockStatic.
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserResource userResource;

    private static final String TEST_USER_ID = "user-payment-test-001";

    @Test
    void createTrialSubscription_whenUserAlreadyVerified_returns409() throws Exception {
        String token = TestJwtTokenBuilder.buildVerifiedUserToken(TEST_USER_ID);
        UserDTO verifiedUser = TestUserFactory.buildVerifiedUser(TEST_USER_ID);
        when(userResource.getUserById(TEST_USER_ID)).thenReturn(verifiedUser);

        mockMvc.perform(post("/v1/payments/subscriptions/trial")
                        .header("X-Auth-Request-Access-Token", token)
                        .header("X-priceId", "price_basic_test"))
                .andExpect(status().isConflict())
                .andExpect(content().string("User is already verified"));
    }

    @Test
    void createTrialSubscription_whenUserNotFound_returns404() throws Exception {
        String token = TestJwtTokenBuilder.buildUnverifiedUserToken(TEST_USER_ID);
        when(userResource.getUserById(TEST_USER_ID)).thenReturn(null);

        mockMvc.perform(post("/v1/payments/subscriptions/trial")
                        .header("X-Auth-Request-Access-Token", token)
                        .header("X-priceId", "price_basic_test"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found"));
    }

    @Test
    void createTrialSubscription_whenUserNotVerified_createsCheckoutSessionAndReturnsUrl() throws Exception {
        String token = TestJwtTokenBuilder.buildUnverifiedUserToken(TEST_USER_ID);
        UserDTO unverifiedUser = TestUserFactory.buildUnverifiedUser(TEST_USER_ID);
        when(userResource.getUserById(TEST_USER_ID)).thenReturn(unverifiedUser);

        Customer mockCustomer = mock(Customer.class);
        when(mockCustomer.getId()).thenReturn("cus_test123");

        Session mockSession = mock(Session.class);
        when(mockSession.getUrl()).thenReturn("https://checkout.stripe.com/pay/cs_test_123");

        try (MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class);
             MockedStatic<Session> sessionMock = Mockito.mockStatic(Session.class)) {

            customerMock.when(() -> CustomerUtil.findOrCreateCustomer(any(UserDTO.class)))
                    .thenReturn(mockCustomer);
            sessionMock.when(() -> Session.create(any(SessionCreateParams.class)))
                    .thenReturn(mockSession);

            mockMvc.perform(post("/v1/payments/subscriptions/trial")
                            .header("X-Auth-Request-Access-Token", token)
                            .header("X-priceId", "price_basic_test"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("https://checkout.stripe.com/pay/cs_test_123"));
        }
    }

    @Test
    void createTrialSubscription_withMissingPriceIdHeader_returns400() throws Exception {
        String token = TestJwtTokenBuilder.buildUnverifiedUserToken(TEST_USER_ID);

        // Missing X-priceId header — Spring will return 400 Bad Request
        mockMvc.perform(post("/v1/payments/subscriptions/trial")
                        .header("X-Auth-Request-Access-Token", token))
                .andExpect(status().isBadRequest());
    }
}
