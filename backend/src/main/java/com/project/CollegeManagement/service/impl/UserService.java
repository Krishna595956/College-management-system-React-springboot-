package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.repository.IUserRepository;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService
{
    @Autowired
    private IUserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void insertAdminUser()
    {
        if (repository.findByEmail("admin@example.com").isEmpty()) {
            User adminUser = User.builder()
                    .name("Admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("Admin@123!"))
                    .role("Admin")
                    .mobileNumber("9087213456")
                    .address("Admin Address")
                    .image("user.jpg")
                    .department("Head")
                    .build();

            repository.save(adminUser);
        }
    }

    @Override
    public void updateUser(User user) {
        repository.save(user);
    }

    @Override
    public void deleteUserById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return repository.findById(userId).get();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<User> getStudentsByIds(List<Long> studentIds) {
        return repository.findAllById(studentIds);
    }
}
