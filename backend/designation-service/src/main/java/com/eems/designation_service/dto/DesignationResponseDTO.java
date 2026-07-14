package com.eems.designation_service.dto;

import java.time.LocalDateTime;

import com.eems.designation_service.enums.DesignationStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DesignationResponseDTO {

    private Long id;

    private String designationCode;

    private String designationName;

    private String description;

    private Long departmentId;

    private DesignationStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
