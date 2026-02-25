package com.example.spring.common.enums;

public enum TierUser {
    FREE, TIER1, TIER2, ENTERPRISE, UNLIMITED;

    public static TierUser fromString(String tier) {
        return switch (tier) {
            case "TIER1" -> TIER1;
            case "TIER2" -> TIER2;
            case "ENTERPRISE" -> ENTERPRISE;
            case "UNLIMITED" -> UNLIMITED;
            case null, default -> FREE;
        };
    }
}
