package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService
{
    void insertAdminUser();

    void updateUser(User user);

    void deleteUserById(Long id);

    List<User> getAllUsers();

    User getUserById(Long userId);

    Optional<User> findByEmail(String email);

    List<User> getStudentsByIds(List<Long> studentIds);
}
