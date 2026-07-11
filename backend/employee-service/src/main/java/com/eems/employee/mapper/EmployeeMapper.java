package com.eems.employee.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.eems.employee.dto.EmployeeRequestDTO;
import com.eems.employee.dto.EmployeeResponseDTO;
import com.eems.employee.entity.Employee;

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
        employee.setDesignation(dto.getDesignation());
        employee.setDepartment(dto.getDepartment());
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
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .gender(employee.getGender())
                .designation(employee.getDesignation())
                .department(employee.getDepartment())
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
        employee.setDesignation(dto.getDesignation());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setStatus(dto.getStatus());
    }
}