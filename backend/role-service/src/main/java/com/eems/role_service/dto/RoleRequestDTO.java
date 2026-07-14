package com.eems.role_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleRequestDTO {

    private String roleCode;

    private String roleName;

    private String description;

    private String status;

}
