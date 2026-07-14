package com.eems.department_service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.eems.department_service.dto.DepartmentRequestDTO;
import com.eems.department_service.dto.DepartmentResponseDTO;
import com.eems.department_service.entity.Department;

@Component
public class DepartmentMapper {

    public Department toEntity(DepartmentRequestDTO dto) {

        Department department = new Department();

        department.setDepartmentCode(dto.getDepartmentCode());
        department.setDepartmentName(dto.getDepartmentName());
        department.setDescription(dto.getDescription());
        department.setStatus(dto.getStatus());

        return department;
    }

    public DepartmentResponseDTO toResponse(Department entity) {

        return DepartmentResponseDTO.builder()
                .id(entity.getId())
                .departmentCode(entity.getDepartmentCode())
                .departmentName(entity.getDepartmentName())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public List<DepartmentResponseDTO> toResponseList(
            List<Department> entities) {

        return entities.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEntity(
            DepartmentRequestDTO dto,
            Department entity) {

        entity.setDepartmentCode(dto.getDepartmentCode());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());
    }

}
