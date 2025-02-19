package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.service.ITokenBlacklistService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistService implements ITokenBlacklistService {

    private final Set<String> blacklistedTokens = new HashSet<>();

    @Override
    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    @Override
    public void clearBlacklist() {
        blacklistedTokens.clear();
    }
}
