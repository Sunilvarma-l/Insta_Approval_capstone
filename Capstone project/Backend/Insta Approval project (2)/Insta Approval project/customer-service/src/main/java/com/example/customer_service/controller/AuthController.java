package com.example.customer_service.controller;

import com.example.customer_service.dto.LoginRequestDTO;
import com.example.customer_service.dto.LoginResponseDTO;
import com.example.customer_service.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/customers")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO token = authService.login(loginRequestDTO);
        return ResponseEntity.ok(token);
    }
}
