package com.eems.department_service.dto;

import java.time.LocalDateTime;

import com.eems.department_service.enums.DepartmentStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DepartmentResponseDTO {

    private Long id;

    private String departmentCode;

    private String departmentName;

    private String description;

    private DepartmentStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
