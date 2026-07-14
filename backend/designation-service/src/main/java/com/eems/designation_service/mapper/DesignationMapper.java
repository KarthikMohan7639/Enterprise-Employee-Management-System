package com.eems.designation_service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.eems.designation_service.dto.DesignationRequestDTO;
import com.eems.designation_service.dto.DesignationResponseDTO;
import com.eems.designation_service.entity.Designation;

@Component
public class DesignationMapper {

    public Designation toEntity(DesignationRequestDTO dto) {

        Designation designation = new Designation();

        designation.setDesignationCode(dto.getDesignationCode());
        designation.setDesignationName(dto.getDesignationName());
        designation.setDescription(dto.getDescription());
        designation.setDepartmentId(dto.getDepartmentId());
        designation.setStatus(dto.getStatus());

        return designation;
    }

    public DesignationResponseDTO toResponse(Designation entity) {

        return DesignationResponseDTO.builder()
                .id(entity.getId())
                .designationCode(entity.getDesignationCode())
                .designationName(entity.getDesignationName())
                .description(entity.getDescription())
                .departmentId(entity.getDepartmentId())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public List<DesignationResponseDTO> toResponseList(List<Designation> entities) {

        return entities.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEntity(
            DesignationRequestDTO dto,
            Designation entity) {

        entity.setDesignationCode(dto.getDesignationCode());
        entity.setDesignationName(dto.getDesignationName());
        entity.setDescription(dto.getDescription());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setStatus(dto.getStatus());
    }
}
