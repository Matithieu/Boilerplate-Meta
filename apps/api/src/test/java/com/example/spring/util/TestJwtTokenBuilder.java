package com.example.spring.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.List;
import java.util.Map;

/**
 * Builds fake (unsigned) JWT tokens for test purposes.
 * The application only Base64-decodes the payload — it does NOT verify the signature.
 * Format: base64(header).base64(payload).base64(fake_signature)
 */
public class TestJwtTokenBuilder {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static String buildToken(String userId, List<String> roles) {
        try {
            String header = Base64.getEncoder().encodeToString(
                    MAPPER.writeValueAsBytes(Map.of("alg", "RS256", "typ", "JWT"))
            );
            Map<String, Object> payload = Map.of(
                    "sub", userId,
                    "email", "test@example.com",
                    "preferred_username", "testuser",
                    "realm_access", Map.of("roles", roles)
            );
            String encodedPayload = Base64.getEncoder().encodeToString(
                    MAPPER.writeValueAsBytes(payload)
            );
            String signature = Base64.getEncoder().encodeToString("fake_signature".getBytes());
            return header + "." + encodedPayload + "." + signature;
        } catch (Exception e) {
            throw new RuntimeException("Failed to build test JWT token", e);
        }
    }

    public static String buildVerifiedUserToken(String userId) {
        return buildToken(userId, List.of("default-roles-myrealm", "verified", "offline_access"));
    }

    public static String buildUnverifiedUserToken(String userId) {
        return buildToken(userId, List.of("default-roles-myrealm", "offline_access"));
    }
}
