package com.eems.employee.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eems.employee.dto.EmployeeRequestDTO;
import com.eems.employee.dto.EmployeeResponseDTO;
import com.eems.employee.entity.Employee;
import com.eems.employee.exception.ResourceNotFoundException;
import com.eems.employee.mapper.EmployeeMapper;
import com.eems.employee.repository.EmployeeRepository;
import com.eems.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {

        Employee employee = employeeMapper.toEntity(dto);

        Employee savedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(savedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponseDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        return employeeMapper.toResponse(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponseDTO> getAllEmployees() {

        return employeeMapper.toResponseList(
                employeeRepository.findAll()
        );
    }

    @Override
    public EmployeeResponseDTO updateEmployee(Long id,
                                              EmployeeRequestDTO dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        employeeMapper.updateEntity(dto, employee);

        Employee updatedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        employeeRepository.delete(employee);
    }

}