package com.eems.role_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.eems.role_service.dto.RoleRequestDTO;
import com.eems.role_service.dto.RoleResponseDTO;
import com.eems.role_service.entity.Role;
import com.eems.role_service.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository repository;

    @Override
    public RoleResponseDTO create(RoleRequestDTO request) {

        if (repository.existsByRoleCode(request.getRoleCode())) {
            throw new RuntimeException("Role Code already exists.");
        }

        Role role = new Role();

        role.setRoleCode(request.getRoleCode());
        role.setRoleName(request.getRoleName());
        role.setDescription(request.getDescription());
        role.setStatus(request.getStatus());

        role = repository.save(role);

        return map(role);
    }

    @Override
    public RoleResponseDTO update(Long id, RoleRequestDTO request) {

        Role role = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found."));

        role.setRoleCode(request.getRoleCode());
        role.setRoleName(request.getRoleName());
        role.setDescription(request.getDescription());
        role.setStatus(request.getStatus());

        role = repository.save(role);

        return map(role);
    }

    @Override
    public RoleResponseDTO getById(Long id) {

        return map(
                repository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Role not found."))
        );

    }

    @Override
    public Page<RoleResponseDTO> getAll(
            int page,
            int size,
            String search) {

        return repository
                .findByRoleNameContainingIgnoreCase(
                        search,
                        PageRequest.of(page, size))
                .map(this::map);

    }

    @Override
    public void delete(Long id) {

        repository.deleteById(id);

    }

    private RoleResponseDTO map(Role role) {

        return RoleResponseDTO.builder()
                .id(role.getId())
                .roleCode(role.getRoleCode())
                .roleName(role.getRoleName())
                .description(role.getDescription())
                .status(role.getStatus())
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();

    }

}
