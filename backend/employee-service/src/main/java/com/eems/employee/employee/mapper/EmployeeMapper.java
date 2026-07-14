package com.eems.employee.employee.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.eems.employee.common.entity.Employee;
import com.eems.employee.employee.dto.EmployeeRequestDTO;
import com.eems.employee.employee.dto.EmployeeResponseDTO;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequestDTO dto) {

        if (dto == null) {
            return null;
        }

        Employee employee = new Employee();

        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setGender(dto.getGender());
        employee.setDepartmentId(dto.getDepartmentId());
        employee.setDesignationId(dto.getDesignationId());
        employee.setSalary(dto.getSalary());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setStatus(dto.getStatus());

        return employee;
    }

    public EmployeeResponseDTO toResponse(Employee employee) {

    if (employee == null) {
        return null;
    }

    return EmployeeResponseDTO.builder()
            .id(employee.getId())
            .employeeCode(employee.getEmployeeCode())
            .firstName(employee.getFirstName())
            .lastName(employee.getLastName())
            .fullName(employee.getFirstName() + " " + employee.getLastName())
            .email(employee.getEmail())
            .phone(employee.getPhone())
            .gender(employee.getGender())
            .designationId(employee.getDesignationId())
            .departmentId(employee.getDepartmentId())
            .salary(employee.getSalary())
            .joiningDate(employee.getJoiningDate())
            .status(employee.getStatus())
            .createdAt(employee.getCreatedAt())
            .updatedAt(employee.getUpdatedAt())
            .build();
}

    public List<EmployeeResponseDTO> toResponseList(List<Employee> employees) {

        return employees.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEntity(EmployeeRequestDTO dto, Employee employee) {

        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setGender(dto.getGender());
        employee.setDesignationId(dto.getDesignationId());
        employee.setDepartmentId(dto.getDepartmentId());
        employee.setSalary(dto.getSalary());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setStatus(dto.getStatus());
    }
}