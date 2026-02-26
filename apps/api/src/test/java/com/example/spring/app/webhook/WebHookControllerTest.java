package com.example.spring.app.webhook;

import com.example.spring.app.stripe.CustomerUtil;
import com.example.spring.app.user.UserDTO;
import com.example.spring.common.enums.TierUser;
import com.example.spring.core.keycloakClient.RoleResource;
import com.example.spring.core.keycloakClient.UserResource;
import com.example.spring.util.TestUserFactory;
import com.stripe.model.*;
import com.stripe.net.Webhook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration tests for WebHookController.
 * Uses Mockito.mockStatic to bypass Stripe's signature verification and inject fake Event objects.
 * UserResource and RoleResource are mocked to avoid Keycloak dependency.
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class WebHookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserResource userResource;

    @MockitoBean
    private RoleResource roleResource;

    private static final String TEST_USER_ID = "user-webhook-test-001";
    private static final String TEST_CUSTOMER_ID = "cus_test123";
    private static final String TEST_EMAIL = "webhook-user@example.com";
    private static final String FAKE_SIG = "t=1234567890,v1=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

    @BeforeEach
    void setUp() {
        UserDTO user = TestUserFactory.buildUnverifiedUser(TEST_USER_ID);
        user.setEmail(TEST_EMAIL);
        when(userResource.getUserByEmail(TEST_EMAIL)).thenReturn(user);
    }

    // --- Signature verification ---

    @Test
    void stripeWebhook_withInvalidSignature_returns400() throws Exception {
        // Real Stripe SDK validates the signature — invalid sig throws SignatureVerificationException
        // Controller catches it and returns 400
        mockMvc.perform(post("/webhook/stripe")
                        .header("Stripe-Signature", FAKE_SIG)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"type\":\"charge.succeeded\",\"id\":\"evt_test\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid signature"));
    }

    // --- charge.succeeded ---

    @Test
    void stripeWebhook_chargeSucceeded_returns200_andDoesNotCallUserResource() throws Exception {
        Event mockEvent = buildMockEvent("charge.succeeded", null);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class)) {
            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Received"));
        }

        verifyNoInteractions(userResource);
        verifyNoInteractions(roleResource);
    }

    // --- customer.subscription.created ---

    @Test
    void stripeWebhook_subscriptionCreated_setsUserVerifiedAndCorrectTier() throws Exception {
        Subscription mockSubscription = buildMockSubscription("active", "price_basic_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.created", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Received"));
        }

        verify(roleResource).addRoleToUser(TEST_USER_ID, "verified");
        verify(userResource).updateUser(argThat(u ->
                u.isVerified() && TierUser.TIER1.equals(u.getTier())
        ));
    }

    @Test
    void stripeWebhook_subscriptionCreated_withFreePriceId_setsFreetier() throws Exception {
        Subscription mockSubscription = buildMockSubscription("trialing", "price_free_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.created", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }

        verify(userResource).updateUser(argThat(u -> TierUser.FREE.equals(u.getTier())));
    }

    // --- customer.subscription.updated ---

    @Test
    void stripeWebhook_subscriptionUpdated_whenCanceled_removesVerifiedRole() throws Exception {
        Subscription mockSubscription = buildMockSubscription("canceled", "price_basic_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.updated", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }

        verify(roleResource).removeRoleFromUser(TEST_USER_ID, "verified");
        verify(userResource).updateUser(argThat(u -> !u.isVerified()));
    }

    @Test
    void stripeWebhook_subscriptionUpdated_whenUnpaid_removesVerifiedRole() throws Exception {
        Subscription mockSubscription = buildMockSubscription("unpaid", "price_basic_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.updated", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }

        verify(roleResource).removeRoleFromUser(TEST_USER_ID, "verified");
    }

    /**
     * Documents the known bug at WebHookController.java:132.
     * When subscription status is "active" or "trialing", the controller should ADD the "verified"
     * role, but instead it REMOVES it. This test documents the current (buggy) behavior so that
     * fixing the bug (changing line 132 from removeRoleFromUser to addRoleToUser) will be obvious.
     */
    @Test
    void stripeWebhook_subscriptionUpdated_whenActive_hasBug_removesRoleInsteadOfAdding() throws Exception {
        Subscription mockSubscription = buildMockSubscription("active", "price_basic_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.updated", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }

        // BUG: should be addRoleToUser but current implementation calls removeRoleFromUser
        verify(roleResource).removeRoleFromUser(TEST_USER_ID, "verified");
        verify(roleResource, never()).addRoleToUser(TEST_USER_ID, "verified");
        // Despite the role bug, verified is correctly set to true
        verify(userResource).updateUser(argThat(UserDTO::isVerified));
    }

    // --- customer.subscription.deleted ---

    @Test
    void stripeWebhook_subscriptionDeleted_removesVerifiedRoleAndSetsVerifiedFalse() throws Exception {
        Subscription mockSubscription = buildMockSubscription("canceled", "price_basic_test");
        Customer mockCustomer = buildMockCustomer();
        Event mockEvent = buildMockEvent("customer.subscription.deleted", mockSubscription);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class);
             MockedStatic<CustomerUtil> customerMock = Mockito.mockStatic(CustomerUtil.class)) {

            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);
            customerMock.when(() -> CustomerUtil.retrieveCustomerById(TEST_CUSTOMER_ID))
                    .thenReturn(mockCustomer);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }

        verify(roleResource).removeRoleFromUser(TEST_USER_ID, "verified");
        verify(userResource).updateUser(argThat(u -> !u.isVerified()));
    }

    // --- Unknown event type ---

    @Test
    void stripeWebhook_unknownEventType_returns200() throws Exception {
        Event mockEvent = buildMockEvent("payment_intent.succeeded", null);

        try (MockedStatic<Webhook> webhookMock = Mockito.mockStatic(Webhook.class)) {
            webhookMock.when(() -> Webhook.constructEvent(anyString(), anyString(), anyString()))
                    .thenReturn(mockEvent);

            mockMvc.perform(post("/webhook/stripe")
                            .header("Stripe-Signature", FAKE_SIG)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Received"));
        }
    }

    // --- Helpers ---

    private Event buildMockEvent(String type, StripeObject dataObject) {
        Event event = mock(Event.class);
        when(event.getType()).thenReturn(type);
        when(event.getId()).thenReturn("evt_test_" + type.replace(".", "_"));

        EventDataObjectDeserializer deserializer = mock(EventDataObjectDeserializer.class);
        when(event.getDataObjectDeserializer()).thenReturn(deserializer);

        if (dataObject != null) {
            when(deserializer.getObject()).thenReturn(Optional.of(dataObject));
        } else {
            when(deserializer.getObject()).thenReturn(Optional.empty());
        }

        return event;
    }

    private Subscription buildMockSubscription(String status, String priceId) {
        Subscription subscription = mock(Subscription.class);
        when(subscription.getId()).thenReturn("sub_test123");
        when(subscription.getCustomer()).thenReturn(TEST_CUSTOMER_ID);
        when(subscription.getStatus()).thenReturn(status);

        SubscriptionItemCollection items = mock(SubscriptionItemCollection.class);
        SubscriptionItem item = mock(SubscriptionItem.class);
        Plan plan = mock(Plan.class);
        when(plan.getId()).thenReturn(priceId);
        when(item.getPlan()).thenReturn(plan);
        when(items.getData()).thenReturn(List.of(item));
        when(subscription.getItems()).thenReturn(items);

        return subscription;
    }

    private Customer buildMockCustomer() {
        Customer customer = mock(Customer.class);
        when(customer.getId()).thenReturn(TEST_CUSTOMER_ID);
        when(customer.getEmail()).thenReturn(TEST_EMAIL);
        return customer;
    }
}
