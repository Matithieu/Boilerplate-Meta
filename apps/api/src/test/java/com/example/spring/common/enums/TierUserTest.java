package com.example.spring.common.enums;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TierUserTest {

    @Test
    void fromString_TIER1_returnsTier1() {
        assertThat(TierUser.fromString("TIER1")).isEqualTo(TierUser.TIER1);
    }

    @Test
    void fromString_TIER2_returnsTier2() {
        assertThat(TierUser.fromString("TIER2")).isEqualTo(TierUser.TIER2);
    }

    @Test
    void fromString_ENTERPRISE_returnsEnterprise() {
        assertThat(TierUser.fromString("ENTERPRISE")).isEqualTo(TierUser.ENTERPRISE);
    }

    @Test
    void fromString_UNLIMITED_returnsUnlimited() {
        assertThat(TierUser.fromString("UNLIMITED")).isEqualTo(TierUser.UNLIMITED);
    }

    @Test
    void fromString_FREE_returnsFree() {
        assertThat(TierUser.fromString("FREE")).isEqualTo(TierUser.FREE);
    }

    @Test
    void fromString_null_returnsFree() {
        assertThat(TierUser.fromString(null)).isEqualTo(TierUser.FREE);
    }

    @Test
    void fromString_unknownValue_returnsFree() {
        assertThat(TierUser.fromString("UNKNOWN")).isEqualTo(TierUser.FREE);
        assertThat(TierUser.fromString("")).isEqualTo(TierUser.FREE);
        assertThat(TierUser.fromString("tier1")).isEqualTo(TierUser.FREE);
    }
}
