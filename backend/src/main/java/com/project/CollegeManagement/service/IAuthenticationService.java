package com.project.CollegeManagement.service;

import com.project.CollegeManagement.dto.LoginDto;
import com.project.CollegeManagement.entity.User;

public interface IAuthenticationService {
    User signup(User user);

    User authenticate(LoginDto input);

}
