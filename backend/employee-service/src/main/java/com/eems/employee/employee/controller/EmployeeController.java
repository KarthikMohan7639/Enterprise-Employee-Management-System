package com.eems.employee.employee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eems.employee.common.response.ApiResponse;
import com.eems.employee.employee.dto.EmployeeRequestDTO;
import com.eems.employee.employee.dto.EmployeeResponseDTO;
import com.eems.employee.employee.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> createEmployee(
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO responseDTO = employeeService.createEmployee(requestDTO);

        ApiResponse<EmployeeResponseDTO> response = ApiResponse.<EmployeeResponseDTO>builder()
                .success(true)
                .message("Employee created successfully")
                .data(responseDTO)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> getEmployeeById(
            @PathVariable Long id) {

        EmployeeResponseDTO responseDTO = employeeService.getEmployeeById(id);

        ApiResponse<EmployeeResponseDTO> response = ApiResponse.<EmployeeResponseDTO>builder()
                .success(true)
                .message("Employee fetched successfully")
                .data(responseDTO)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getAllEmployees() {

        List<EmployeeResponseDTO> employees = employeeService.getAllEmployees();

        ApiResponse<List<EmployeeResponseDTO>> response =
                ApiResponse.<List<EmployeeResponseDTO>>builder()
                        .success(true)
                        .message("Employees fetched successfully")
                        .data(employees)
                        .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO responseDTO =
                employeeService.updateEmployee(id, requestDTO);

        ApiResponse<EmployeeResponseDTO> response =
                ApiResponse.<EmployeeResponseDTO>builder()
                        .success(true)
                        .message("Employee updated successfully")
                        .data(responseDTO)
                        .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        ApiResponse<Void> response =
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Employee deleted successfully")
                        .build();

        return ResponseEntity.ok(response);
    }

}