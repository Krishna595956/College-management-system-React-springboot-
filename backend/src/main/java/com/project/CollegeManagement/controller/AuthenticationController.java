package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.LoginDto;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.jwt.JwtHelper;
import com.project.CollegeManagement.service.IAuthenticationService;
import com.project.CollegeManagement.service.ITokenBlacklistService;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController
{
    private final JwtHelper jwtService;
    private final IAuthenticationService authenticationService;
    private final IUserService service;
    private final PasswordEncoder passwordEncoder;
    private final ITokenBlacklistService tokenBlacklistService;

    public AuthenticationController(JwtHelper jwtService, IAuthenticationService authenticationService, IUserService service, PasswordEncoder passwordEncoder, ITokenBlacklistService tokenBlacklistService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.service = service;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @GetMapping("/insert/admin")
    public ResponseEntity<?> insertAdminUser() {
        try {
            service.insertAdminUser();
            return ResponseEntity.ok("Admin user added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while adding admin user: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userRegistration(
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("role") String role,
            @RequestParam("address") String address,
            @RequestParam("department") String department,
            @RequestParam("image") MultipartFile image) {

        HashMap<String, Object> res = new HashMap<>();
        try {
            Optional<User> user1 = service.findByEmail(email);
            if (user1.isPresent()) {
                res.put("success", false);
                res.put("msg", "User already exists for the provided email: " + email);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            String uploadDir = Paths.get("src", "main", "resources", "static", "images").toAbsolutePath().toString();
            Path imageFilePath = Paths.get(uploadDir, fileName);

            image.transferTo(imageFilePath);

            User user = User.builder()
                    .name(fullName)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .mobileNumber(mobileNumber)
                    .role(role)
                    .department(department)
                    .address(address)
                    .image(fileName)
                    .build();

            authenticationService.signup(user);

            res.put("success", true);
            res.put("msg", role + " registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);

        } catch (IOException e) {
            res.put("success", false);
            res.put("msg", "Failed to save the user image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "Failed to add the user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginDto loginUserDto) {
        Map<String, Object> res = new HashMap<>();
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            List<String> rolesList = authenticatedUser.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            String role = String.join(", ", rolesList);

            res.put("success", true);
            res.put("role", role);
            res.put("token", jwtToken);
            res.put("expiryTime", jwtService.getExpirationTime());
            res.put("msg", role + " Login Successful");

            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (AuthenticationException e) {
            res.put("success", false);
            res.put("msg", "Invalid Credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred during authentication");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token)
    {
        HashMap<String,Object> res = new HashMap<>();
        try {
            if (token == null || !token.startsWith("Bearer "))
            {
                res.put("success",false);
                res.put("err","Token is missing or malformed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }
            String jwtToken = token.replace("Bearer ", "");
            tokenBlacklistService.blacklistToken(jwtToken);
            res.put("success",true);
            res.put("msg","Logged out successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e)
        {
            res.put("success",false);
            res.put("err","An error occurred during logout");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
