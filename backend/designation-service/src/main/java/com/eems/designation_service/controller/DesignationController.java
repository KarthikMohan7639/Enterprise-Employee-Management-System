package com.eems.designation_service.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eems.designation_service.dto.DesignationRequestDTO;
import com.eems.designation_service.dto.DesignationResponseDTO;
import com.eems.designation_service.pagination.PagedResponse;
import com.eems.designation_service.service.DesignationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/designations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DesignationController {

    private final DesignationService designationService;

    @PostMapping
    public ResponseEntity<DesignationResponseDTO> createDesignation(
            @Valid @RequestBody DesignationRequestDTO requestDTO) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(designationService.createDesignation(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DesignationResponseDTO> updateDesignation(
            @PathVariable Long id,
            @Valid @RequestBody DesignationRequestDTO requestDTO) {

        return ResponseEntity.ok(
                designationService.updateDesignation(id, requestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignationResponseDTO> getDesignationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                designationService.getDesignationById(id));
    }

    @GetMapping
    public ResponseEntity<List<DesignationResponseDTO>> getAllDesignations() {

        return ResponseEntity.ok(
                designationService.getAllDesignations());
    }

    @GetMapping("/page")
    public ResponseEntity<PagedResponse<DesignationResponseDTO>> getDesignations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending());

        return ResponseEntity.ok(
                designationService.getDesignations(pageable, search));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesignation(
            @PathVariable Long id) {

        designationService.deleteDesignation(id);

        return ResponseEntity.noContent().build();
    }
}
