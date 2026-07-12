package com.eems.employee.employee.service.impl;

import java.util.List;


import org.springframework.data.jpa.domain.Specification;
import com.eems.employee.employee.specification.EmployeeSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eems.employee.common.entity.Employee;
import com.eems.employee.common.exception.DuplicateResourceException;
import com.eems.employee.common.exception.ResourceNotFoundException;
import com.eems.employee.common.response.PagedResponse;
import com.eems.employee.employee.dto.EmployeeRequestDTO;
import com.eems.employee.employee.dto.EmployeeResponseDTO;
import com.eems.employee.employee.mapper.EmployeeMapper;
import com.eems.employee.employee.repository.EmployeeRepository;
import com.eems.employee.employee.service.EmployeeService;

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
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeResponseDTO> getEmployees(
            Pageable pageable,
            String search) {

        Specification<Employee> specification =
                EmployeeSpecification.containsKeyword(search);

        Page<Employee> employeePage =
                employeeRepository.findAll(specification, pageable);

        return PagedResponse.<EmployeeResponseDTO>builder()
                .content(employeeMapper.toResponseList(employeePage.getContent()))
                .page(employeePage.getNumber())
                .size(employeePage.getSize())
                .totalElements(employeePage.getTotalElements())
                .totalPages(employeePage.getTotalPages())
                .first(employeePage.isFirst())
                .last(employeePage.isLast())
                .build();
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id : " + id));

        employeeRepository.delete(employee);
    }
}