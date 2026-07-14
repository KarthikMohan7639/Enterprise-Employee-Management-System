package com.eems.department_service.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.eems.department_service.dto.DepartmentRequestDTO;
import com.eems.department_service.dto.DepartmentResponseDTO;
import com.eems.department_service.pagination.PagedResponse;

public interface DepartmentService {

    DepartmentResponseDTO createDepartment(
            DepartmentRequestDTO requestDTO);

    DepartmentResponseDTO updateDepartment(
            Long id,
            DepartmentRequestDTO requestDTO);

    DepartmentResponseDTO getDepartmentById(Long id);

    List<DepartmentResponseDTO> getAllDepartments();

    PagedResponse<DepartmentResponseDTO> getDepartments(
            Pageable pageable,
            String search);

    void deleteDepartment(Long id);

}
