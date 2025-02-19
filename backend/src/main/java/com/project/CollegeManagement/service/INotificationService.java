package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Notification;
import com.project.CollegeManagement.entity.User;

import java.util.List;

public interface INotificationService
{
    List<Notification> getUserNotifications(Long userId);

    long getNotificationCount(Long userId);

    void markNotificationAsRead(Long notificationId);

    void sendNotificationToAllUsers(String title, String message);

    void sendNotificationToSpecificRole(String title, String message, String role);

    void sendNotificationToUserId(Long userId, String title, String message);

    List<User> getAllUsers();
    List<Notification> getAllNotifications();

    void saveNotification(Notification notification);
}
