package com.eems.designation_service.dto;

import com.eems.designation_service.enums.DesignationStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DesignationRequestDTO {

    @NotBlank(message = "Designation code is required")
    @Size(max = 20)
    private String designationCode;

    @NotBlank(message = "Designation name is required")
    @Size(max = 100)
    private String designationName;

    @Size(max = 500)
    private String description;

    @NotNull(message = "Department is required")
    private Long departmentId;

    @NotNull(message = "Status is required")
    private DesignationStatus status;
}
