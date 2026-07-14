package com.eems.role_service.service;

import org.springframework.data.domain.Page;

import com.eems.role_service.dto.RoleRequestDTO;
import com.eems.role_service.dto.RoleResponseDTO;

public interface RoleService {

    RoleResponseDTO create(RoleRequestDTO request);

    RoleResponseDTO update(Long id, RoleRequestDTO request);

    RoleResponseDTO getById(Long id);

    Page<RoleResponseDTO> getAll(
            int page,
            int size,
            String search);

    void delete(Long id);

}
