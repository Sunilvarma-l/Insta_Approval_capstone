package com.example.customer_service.dto;

public class LoginResponseDTO {

    private String token;
    private Long customerId;

    public LoginResponseDTO(String token, Long customerId) {
        this.token = token;
        this.customerId = customerId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
}
