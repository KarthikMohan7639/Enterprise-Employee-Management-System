package com.eems.auth_service.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.eems.auth_service.dto.LoginRequestDTO;
import com.eems.auth_service.dto.LoginResponseDTO;
import com.eems.auth_service.entity.User;
import com.eems.auth_service.repository.UserRepository;
import com.eems.auth_service.security.JwtService;
import com.eems.auth_service.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public LoginResponseDTO login(LoginRequestDTO requestDTO) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        requestDTO.getUsername(),
                        requestDTO.getPassword())

        );

        User user = userRepository.findByUsername(requestDTO.getUsername())
                .orElseThrow();

        String accessToken = jwtService.generateToken(user);

        return LoginResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken("")
                .tokenType("Bearer")
                .expiresIn(3600L)
                .build();
    }
}