package com.eems.auth_service.service;


import com.eems.auth_service.dto.UserRequestDTO;
import com.eems.auth_service.dto.UserResponseDTO;

public interface UserService {

    UserResponseDTO createUser(UserRequestDTO requestDTO);

}