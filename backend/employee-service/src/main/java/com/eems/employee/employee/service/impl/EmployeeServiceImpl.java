package com.eems.employee.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eems.employee.dto.EmployeeRequestDTO;
import com.eems.employee.dto.EmployeeResponseDTO;
import com.eems.employee.entity.Employee;
import com.eems.employee.exception.DuplicateResourceException;
import com.eems.employee.exception.ResourceNotFoundException;
import com.eems.employee.mapper.EmployeeMapper;
import com.eems.employee.repository.EmployeeRepository;
import com.eems.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO) {

    log.info("Creating employee with code: {}", requestDTO.getEmployeeCode());

    if (employeeRepository.existsByEmployeeCode(requestDTO.getEmployeeCode())) {
        throw new DuplicateResourceException(
                "Employee code already exists."
        );
    }

    if (employeeRepository.existsByEmail(requestDTO.getEmail())) {
        throw new DuplicateResourceException(
                "Email already exists."
        );
    }

    if (employeeRepository.existsByPhone(requestDTO.getPhone())) {
        throw new DuplicateResourceException(
                "Phone number already exists."
        );
    }

    Employee employee = employeeMapper.toEntity(requestDTO);

    Employee savedEmployee = employeeRepository.save(employee);

    log.info("Employee created successfully with ID: {}", savedEmployee.getId());

    return employeeMapper.toResponse(savedEmployee);
}
    @Override
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO requestDTO) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        employeeMapper.updateEntity(requestDTO, employee);

        Employee updatedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(updatedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponseDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        return employeeMapper.toResponse(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponseDTO> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        return employeeMapper.toResponseList(employees);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        employeeRepository.delete(employee);
    }
}