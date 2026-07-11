package com.eems.employee.service;

import java.util.List;

import com.eems.employee.dto.EmployeeRequestDTO;
import com.eems.employee.dto.EmployeeResponseDTO;

public interface EmployeeService {

    EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO);

    EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO requestDTO);

    EmployeeResponseDTO getEmployeeById(Long id);

    List<EmployeeResponseDTO> getAllEmployees();

    void deleteEmployee(Long id);

}