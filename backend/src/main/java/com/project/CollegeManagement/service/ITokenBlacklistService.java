package com.project.CollegeManagement.service;

public  interface ITokenBlacklistService {
    public abstract void blacklistToken(String token);

    public abstract boolean isTokenBlacklisted(String token);

    public abstract void clearBlacklist();
}
