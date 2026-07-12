package com.eems.auth_service.service;


import com.eems.auth_service.dto.LoginRequestDTO;
import com.eems.auth_service.dto.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO requestDTO);

}
