package com.eems.department_service.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eems.department_service.dto.DepartmentRequestDTO;
import com.eems.department_service.dto.DepartmentResponseDTO;
import com.eems.department_service.entity.Department;
import com.eems.department_service.exception.DuplicateResourceException;
import com.eems.department_service.exception.ResourceNotFoundException;
import com.eems.department_service.mapper.DepartmentMapper;
import com.eems.department_service.pagination.PagedResponse;
import com.eems.department_service.repository.DepartmentRepository;
import com.eems.department_service.search.DepartmentSpecification;
import com.eems.department_service.service.DepartmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository repository;
    private final DepartmentMapper mapper;

    @Override
    public DepartmentResponseDTO createDepartment(
            DepartmentRequestDTO requestDTO) {

        if (repository.existsByDepartmentCode(requestDTO.getDepartmentCode())) {
            throw new DuplicateResourceException("Department code already exists.");
        }

        if (repository.existsByDepartmentName(requestDTO.getDepartmentName())) {
            throw new DuplicateResourceException("Department name already exists.");
        }

        Department saved = repository.save(
                mapper.toEntity(requestDTO));

        return mapper.toResponse(saved);
    }

    @Override
    public DepartmentResponseDTO updateDepartment(
            Long id,
            DepartmentRequestDTO requestDTO) {

        Department department = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException(
                        "Department not found : " + id));

        mapper.updateEntity(requestDTO, department);

        return mapper.toResponse(
                repository.save(department));
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponseDTO getDepartmentById(Long id) {

        Department department = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException(
                        "Department not found : " + id));

        return mapper.toResponse(department);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponseDTO> getAllDepartments() {

        return mapper.toResponseList(repository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<DepartmentResponseDTO> getDepartments(
            Pageable pageable,
            String search) {

        Specification<Department> specification
                = DepartmentSpecification.containsKeyword(search);

        Page<Department> page
                = repository.findAll(specification, pageable);

        return PagedResponse.<DepartmentResponseDTO>builder()
                .content(mapper.toResponseList(page.getContent()))
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }

    @Override
    public void deleteDepartment(Long id) {

        Department department = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException(
                        "Department not found : " + id));

        repository.delete(department);
    }
}
