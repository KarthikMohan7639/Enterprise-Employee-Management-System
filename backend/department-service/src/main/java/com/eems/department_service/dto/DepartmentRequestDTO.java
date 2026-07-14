package com.eems.department_service.dto;

import com.eems.department_service.enums.DepartmentStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DepartmentRequestDTO {

    @NotBlank(message = "Department code is required")
    @Size(max = 20)
    private String departmentCode;

    @NotBlank(message = "Department name is required")
    @Size(max = 100)
    private String departmentName;

    @Size(max = 500)
    private String description;

    @NotNull(message = "Status is required")
    private DepartmentStatus status;

}
