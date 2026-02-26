package com.example.spring.app.configuration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class ConfigurationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getConfiguration_returns200() throws Exception {
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(status().isOk());
    }

    @Test
    void getConfiguration_contentTypeIsJson() throws Exception {
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(content().contentTypeCompatibleWith("application/json"));
    }

    @Test
    void getConfiguration_isPublic_noAuthHeaderRequired() throws Exception {
        // No X-Auth-Request-Access-Token header — public endpoint must still return 200
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(status().isOk());
    }

    @Test
    void getConfiguration_returnsOauthFields() throws Exception {
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(jsonPath("$.oauthBaseUrl").value("https://auth.test.local"))
                .andExpect(jsonPath("$.oauthSignInUrl").value("https://auth.test.local/sign-in"))
                .andExpect(jsonPath("$.oauthSignOutUrl").value("https://auth.test.local/sign-out"))
                .andExpect(jsonPath("$.oauthSignInRedirectUrl").value("https://app.test.local/ui"))
                .andExpect(jsonPath("$.oauthSignOutRedirectUrl").value("https://app.test.local/ui"));
    }

    @Test
    void getConfiguration_returnsStripeFields() throws Exception {
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(jsonPath("$.stripePriceIdFree").value("price_free_test"))
                .andExpect(jsonPath("$.stripePriceIdBasic").value("price_basic_test"))
                .andExpect(jsonPath("$.stripePriceIdPremium").value("price_premium_test"))
                .andExpect(jsonPath("$.stripeBillingPortalCode").value("portal_test"));
    }

    @Test
    void getConfiguration_returnsPostHogFields() throws Exception {
        mockMvc.perform(get("/v1/configuration/"))
                .andExpect(jsonPath("$.publicPostHogKey").value("test-posthog-key"))
                .andExpect(jsonPath("$.publicPostHogHost").value("https://posthog.test.local"));
    }
}
