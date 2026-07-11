package com.eems.employee.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.eems.employee.enums.EmployeeStatus;
import com.eems.employee.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponseDTO {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String fullName;

    private String email;

    private String phone;

    private Gender gender;

    private String designation;

    private String department;

    private BigDecimal salary;

    private LocalDate joiningDate;

    private EmployeeStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
