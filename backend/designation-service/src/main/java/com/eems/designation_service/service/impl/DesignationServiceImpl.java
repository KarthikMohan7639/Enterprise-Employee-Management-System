package com.eems.designation_service.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eems.designation_service.dto.DesignationRequestDTO;
import com.eems.designation_service.dto.DesignationResponseDTO;
import com.eems.designation_service.entity.Designation;
import com.eems.designation_service.exception.DuplicateResourceException;
import com.eems.designation_service.exception.ResourceNotFoundException;
import com.eems.designation_service.mapper.DesignationMapper;
import com.eems.designation_service.pagination.PagedResponse;
import com.eems.designation_service.repository.DesignationRepository;
import com.eems.designation_service.search.DesignationSpecification;
import com.eems.designation_service.service.DesignationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignationServiceImpl implements DesignationService {

    private final DesignationRepository repository;
    private final DesignationMapper mapper;

    @Override
    public DesignationResponseDTO createDesignation(
            DesignationRequestDTO requestDTO) {

        if (repository.existsByDesignationCode(requestDTO.getDesignationCode())) {
            throw new DuplicateResourceException("Designation code already exists.");
        }

        if (repository.existsByDesignationName(requestDTO.getDesignationName())) {
            throw new DuplicateResourceException("Designation name already exists.");
        }

        Designation saved = repository.save(mapper.toEntity(requestDTO));

        return mapper.toResponse(saved);
    }

    @Override
    public DesignationResponseDTO updateDesignation(
            Long id,
            DesignationRequestDTO requestDTO) {

        Designation designation = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Designation not found : " + id));

        mapper.updateEntity(requestDTO, designation);

        return mapper.toResponse(repository.save(designation));
    }

    @Override
    @Transactional(readOnly = true)
    public DesignationResponseDTO getDesignationById(Long id) {

        Designation designation = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Designation not found : " + id));

        return mapper.toResponse(designation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DesignationResponseDTO> getAllDesignations() {

        return mapper.toResponseList(repository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<DesignationResponseDTO> getDesignations(
            Pageable pageable,
            String search) {

        Specification<Designation> specification
                = DesignationSpecification.containsKeyword(search);

        Page<Designation> page
                = repository.findAll(specification, pageable);

        return PagedResponse.<DesignationResponseDTO>builder()
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
    public void deleteDesignation(Long id) {

        Designation designation = repository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Designation not found : " + id));

        repository.delete(designation);
    }
}
