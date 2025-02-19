package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.jwt.JwtHelper;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/college")
public class UserController
{
    private final JwtHelper jwtHelper;
    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(JwtHelper jwtHelper, IUserService userService, PasswordEncoder passwordEncoder) {
        this.jwtHelper = jwtHelper;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user/get/token")
    public ResponseEntity<Map<String, Object>> getUserById(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("msg", "Missing or malformed Authorization token.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            token = token.substring(7);

            if (!jwtHelper.validateToken(token)) {
                response.put("success", false);
                response.put("msg", "Invalid or expired token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Get the authenticated user from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                response.put("success", false);
                response.put("msg", "No authenticated user found.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            User user = (User) authentication.getPrincipal();

            response.put("success", true);
            response.put("user", user);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            // Catch unexpected exceptions
            response.put("success", false);
            response.put("msg", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/get/teachers/all")
    public ResponseEntity<?> getAllTeachers() {
        HashMap<String, Object> res = new HashMap<>();
        try {
            List<User> users = userService.getAllUsers();
            List<User> teachers = users.stream()
                    .filter(user -> "Teacher".equals(user.getRole()))
                    .collect(Collectors.toList());

            if (teachers.isEmpty()) {
                res.put("success", false);
                res.put("msg", "No teachers found.");
                return ResponseEntity.status(404).body(res);
            }

            res.put("success", true);
            res.put("teachers", teachers);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body(res);
        }
    }

    @GetMapping("/get/students/all")
    public ResponseEntity<?> getAllStudents() {
        HashMap<String, Object> res = new HashMap<>();
        try {
            List<User> users = userService.getAllUsers();
            List<User> students = users.stream()
                    .filter(user -> "Student".equals(user.getRole()))
                    .collect(Collectors.toList());

            if (students.isEmpty()) {
                res.put("success", false);
                res.put("msg", "No students found.");
                return ResponseEntity.status(404).body(res);
            }

            res.put("success", true);
            res.put("students", students);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body(res);
        }
    }


    @GetMapping("/get/users/all")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Check if the token is valid
            if (token == null || !token.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("msg", "Missing or malformed Authorization token.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            String jwtToken = token.substring(7); // Remove "Bearer " prefix

            // Validate the token (you can use JwtHelper or similar validation logic)
            System.out.println(jwtToken);
            boolean isValid = jwtHelper.validateToken(jwtToken);
            if (!isValid) {
                response.put("success", false);
                response.put("msg", "Invalid or expired token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            List<User> users = userService.getAllUsers();
            if (users.isEmpty()) {
                response.put("success", true);
                response.put("msg", "No users found.");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

            response.put("success", true);
            response.put("users", users);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("msg", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<Map<String, Object>> updateUserId(
            @RequestHeader("Authorization") String token,
            @PathVariable Long userId,
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("role") String role,
            @RequestParam("address") String address,
            @RequestParam("image") MultipartFile image) {

        Map<String, Object> response = new HashMap<>();
        try {
            // Validate the token
            if (token == null || !token.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("msg", "Missing or malformed Authorization token.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            String jwtToken = token.substring(7); // Remove "Bearer " prefix
            boolean isValid = jwtHelper.validateToken(jwtToken);
            if (!isValid) {
                response.put("success", false);
                response.put("msg", "Invalid or expired token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Retrieve the user details (optional but recommended)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                response.put("success", false);
                response.put("msg", "No authenticated user found.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Fetch the user to be updated
            User existingUser = userService.getUserById(userId);
            if (existingUser == null) {
                response.put("success", false);
                response.put("msg", "User not found for provided id: " + userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Ensure that only the admin or the authenticated user can update their details
            String authenticatedUsername = authentication.getName();
            if (!(authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("Admin")) || authenticatedUsername.equals(existingUser.getUsername()))) {
                response.put("success", false);
                response.put("msg", "You do not have permission to update this user.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Handle image upload
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path imageFilePath = Paths.get(filepath, "src", "main", "resources", "static", "images", image.getOriginalFilename());
            String imageUrl = image.getOriginalFilename();
            image.transferTo(imageFilePath);

            // Update the user details
            existingUser.setName(fullName);
            existingUser.setEmail(email);
            existingUser.setPassword(passwordEncoder.encode(password));  // Encode the password before saving
            existingUser.setMobileNumber(mobileNumber);
            existingUser.setAddress(address);
            existingUser.setRole(role);  // Ensure role is properly set
            existingUser.setImage(imageUrl);

            userService.updateUser(existingUser);

            response.put("success", true);
            response.put("msg", "User updated successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("msg", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<Map<String, Object>> deleteUserById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();
        try {
            // Validate Authorization token
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

            User userToDelete = userService.getUserById(id);
            if (userToDelete == null) {
                response.put("success", false);
                response.put("msg", "User not found for provided id: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            userService.deleteUserById(id);

            response.put("success", true);
            response.put("msg", "User deleted successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("msg", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
