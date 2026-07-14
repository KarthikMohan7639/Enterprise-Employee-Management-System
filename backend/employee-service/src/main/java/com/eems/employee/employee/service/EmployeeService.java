package com.eems.employee.employee.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.eems.employee.common.response.PagedResponse;
import com.eems.employee.employee.dto.EmployeeRequestDTO;
import com.eems.employee.employee.dto.EmployeeResponseDTO;

public interface EmployeeService {

    EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO);

    EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO requestDTO);

    EmployeeResponseDTO getEmployeeById(Long id);

    

    List<EmployeeResponseDTO> getAllEmployees();

    void deleteEmployee(Long id);
    
    PagedResponse<EmployeeResponseDTO> getEmployees(
        Pageable pageable,
        String search);
}