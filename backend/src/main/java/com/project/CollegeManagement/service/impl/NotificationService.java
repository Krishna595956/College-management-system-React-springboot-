package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Notification;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.repository.INotificationRepository;
import com.project.CollegeManagement.repository.IUserRepository;
import com.project.CollegeManagement.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService implements INotificationService {
    @Autowired
    private INotificationRepository notificationRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public long getNotificationCount(Long userId) {
        return notificationRepository.findByUserId(userId).stream().filter(notification -> !notification.isRead()).count();
    }

    @Override
    public void markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    @Override
    public void sendNotificationToAllUsers(String title, String message) {
        List<User> allUsers = getAllUsers();

        for (User user : allUsers) {
            Notification notification = new Notification();
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setRead(false);
            notification.setCreatedAt(LocalDateTime.now());
            notification.setUser(user);
            notificationRepository.save(notification);
        }
    }

    @Override
    public void sendNotificationToSpecificRole(String title, String message,String role) {
        List<User> teachers = userRepository.findByRole(role);

        for (User teacher : teachers) {
            Notification notification = new Notification();
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setRead(false);
            notification.setCreatedAt(LocalDateTime.now());
            notification.setUser(teacher);
            notificationRepository.save(notification);
        }
    }

    @Override
    public void sendNotificationToUserId(Long userId, String title,String message)
    {
        User user = userRepository.findById(userId).get();

        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setUser(user);
        notificationRepository.save(notification);

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }
}
