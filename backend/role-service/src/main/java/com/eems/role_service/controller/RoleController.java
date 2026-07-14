package com.eems.role_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.eems.role_service.dto.RoleRequestDTO;
import com.eems.role_service.dto.RoleResponseDTO;
import com.eems.role_service.service.RoleService;

@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    @Autowired
    private RoleService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoleResponseDTO create(
            @RequestBody RoleRequestDTO request) {

        return service.create(request);

    }

    @PutMapping("/{id}")
    public RoleResponseDTO update(
            @PathVariable Long id,
            @RequestBody RoleRequestDTO request) {

        return service.update(id, request);

    }

    @GetMapping("/{id}")
    public RoleResponseDTO getById(
            @PathVariable Long id) {

        return service.getById(id);

    }

    @GetMapping("/page")
    public Page<RoleResponseDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search) {

        return service.getAll(page, size, search);

    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        service.delete(id);

    }

}
