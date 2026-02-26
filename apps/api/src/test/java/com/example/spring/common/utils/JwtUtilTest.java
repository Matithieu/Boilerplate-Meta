package com.example.spring.common.utils;

import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Unit tests for the pure static methods of JwtUtil.
 * Note: extractUserIdFromHeader() depends on RequestContextHolder and is tested
 * through controller integration tests instead.
 */
class JwtUtilTest {

    // --- splitToken ---

    @Test
    void splitToken_returnsThreeParts_forValidJwt() {
        String[] parts = JwtUtil.splitToken("header.payload.signature");
        assertThat(parts).hasSize(3);
        assertThat(parts[0]).isEqualTo("header");
        assertThat(parts[1]).isEqualTo("payload");
        assertThat(parts[2]).isEqualTo("signature");
    }

    @Test
    void splitToken_returnsTwoParts_forTokenMissingSignature() {
        String[] parts = JwtUtil.splitToken("header.payload");
        assertThat(parts).hasSize(2);
    }

    @Test
    void splitToken_returnsOnePart_forTokenWithNoDot() {
        String[] parts = JwtUtil.splitToken("nodottoken");
        assertThat(parts).hasSize(1);
    }

    @Test
    void splitToken_handlesMultipleDots() {
        String[] parts = JwtUtil.splitToken("a.b.c.d");
        assertThat(parts).hasSize(4);
    }

    // --- decodePayload ---

    @Test
    void decodePayload_correctlyDecodesBase64EncodedPayload() {
        String payload = "{\"sub\":\"user-123\",\"realm_access\":{\"roles\":[\"verified\"]}}";
        String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        String token = "header." + encodedPayload + ".signature";

        String decoded = JwtUtil.decodePayload(token);
        assertThat(decoded).isEqualTo(payload);
    }

    @Test
    void decodePayload_extractsSubField() {
        String payload = "{\"sub\":\"abc-123-def\",\"email\":\"a@b.com\"}";
        String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        String token = "header." + encodedPayload + ".sig";

        String decoded = JwtUtil.decodePayload(token);
        assertThat(decoded).contains("\"sub\":\"abc-123-def\"");
    }

    @Test
    void decodePayload_throwsForInvalidBase64() {
        String token = "header.!!!invalid!!!.signature";
        assertThatThrownBy(() -> JwtUtil.decodePayload(token))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void decodePayload_handlesEmptyPayload() {
        String encodedPayload = Base64.getEncoder().encodeToString("".getBytes(StandardCharsets.UTF_8));
        String token = "header." + encodedPayload + ".sig";
        assertThat(JwtUtil.decodePayload(token)).isEmpty();
    }
}
