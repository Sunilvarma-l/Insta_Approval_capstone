package com.example.loan_transaction_service.security;

import com.example.loan_transaction_service.model.Admin;
import com.example.loan_transaction_service.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + email));
        return new User(
                admin.getEmail(),
                admin.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(admin.getRole().name()))
        );
    }
}
