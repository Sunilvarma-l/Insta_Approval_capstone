package com.example.customer_service.service;

import com.example.customer_service.dto.LoginRequestDTO;
import com.example.customer_service.dto.LoginResponseDTO;
import com.example.customer_service.model.Customer;
import com.example.customer_service.repository.CustomerRepository;
import com.example.customer_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponseDTO login(LoginRequestDTO request) {
        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateTokenWithCustomerId(customer.getEmail(), customer.getCustomerId());

        return new LoginResponseDTO(token, customer.getCustomerId());
    }
}
