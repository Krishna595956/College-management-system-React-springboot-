package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.Notification;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.jwt.JwtHelper;
import com.project.CollegeManagement.service.INotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class NotificationController
{
    private final INotificationService notificationService;
    private final JwtHelper jwtHelper;

    public NotificationController(INotificationService notificationService, JwtHelper jwtHelper) {
        this.notificationService = notificationService;
        this.jwtHelper = jwtHelper;
    }


    @GetMapping("/user/get/notification/userId")
    public ResponseEntity<?> getUserNotifications(@RequestHeader("Authorization") String token)
    {
        HashMap<String,Object> response = new HashMap<>();
        if (token == null || !token.startsWith("Bearer ")) {
            response.put("success", false);
            response.put("msg", "Missing or malformed Authorization token.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        String jwtToken = token.substring(7);
        boolean isValid = jwtHelper.validateToken(jwtToken);
        if (!isValid) {
            response.put("success", false);
            response.put("msg", "Invalid or expired token.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try
        {
            List<Notification> notifications = notificationService.getUserNotifications(user.getId());
            response.put("success",true);
            response.put("notifications",notifications);
            return ResponseEntity.ok(notifications);
        }
        catch (Exception e)
        {
            response.put("success",false);
            response.put("err","Failed to fetch the notification for provided id is"+user.getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }

    @GetMapping("/user/get/count")
    public ResponseEntity<?> getNotificationCount(@RequestHeader("Authorization") String token)
    {
        HashMap<String,Object> response = new HashMap<>();
        if (token == null || !token.startsWith("Bearer ")) {
            response.put("success", false);
            response.put("msg", "Missing or malformed Authorization token.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        String jwtToken = token.substring(7);
        boolean isValid = jwtHelper.validateToken(jwtToken);
        if (!isValid) {
            response.put("success", false);
            response.put("msg", "Invalid or expired token.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try {
            long unreadCount = notificationService.getNotificationCount(user.getId());
            response.put("success", true);
            response.put("count", unreadCount);
            return ResponseEntity.ok(unreadCount);
        }
        catch (Exception e)
        {
            response.put("success",false);
            response.put("err","Failed to fetch the notification count for provided user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read");
    }

    @PostMapping("/send/all")
    public ResponseEntity<String> sendNotificationToAllUsers(@RequestParam String title, @RequestParam String message) {
        notificationService.sendNotificationToAllUsers(title, message);
        return ResponseEntity.ok("Notification sent to all users");
    }

    @PostMapping("/sendTo/selectedRoles")
    public ResponseEntity<String> sendNotificationToSelectedRoles(@RequestParam String title, @RequestParam String message,@RequestParam String role) {
        notificationService.sendNotificationToSpecificRole(title, message,role);
        return ResponseEntity.ok("Notification sent to all "+role);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = notificationService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/all-notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveNotification(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
        return ResponseEntity.ok("Notification saved");
    }
}
