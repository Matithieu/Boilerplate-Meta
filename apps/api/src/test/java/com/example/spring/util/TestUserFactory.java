package com.example.spring.util;

import com.example.spring.app.user.UserDTO;
import com.example.spring.common.enums.TierUser;

public class TestUserFactory {

    public static UserDTO buildVerifiedUser(String id) {
        UserDTO user = new UserDTO();
        user.setId(id);
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setEmail("jane.doe@example.com");
        user.setUserName("janedoe");
        user.setTier(TierUser.TIER1);
        user.setVerified(true);
        user.setHasCompletedOnboarding(true);
        return user;
    }

    public static UserDTO buildUnverifiedUser(String id) {
        UserDTO user = new UserDTO();
        user.setId(id);
        user.setFirstName("John");
        user.setLastName("Smith");
        user.setEmail("john.smith@example.com");
        user.setUserName("johnsmith");
        user.setTier(TierUser.FREE);
        user.setVerified(false);
        user.setHasCompletedOnboarding(false);
        return user;
    }
}
