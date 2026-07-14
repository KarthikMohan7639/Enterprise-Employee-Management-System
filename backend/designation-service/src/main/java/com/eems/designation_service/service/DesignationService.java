package com.eems.designation_service.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.eems.designation_service.dto.DesignationRequestDTO;
import com.eems.designation_service.dto.DesignationResponseDTO;
import com.eems.designation_service.pagination.PagedResponse;

public interface DesignationService {

    DesignationResponseDTO createDesignation(
            DesignationRequestDTO requestDTO);

    DesignationResponseDTO updateDesignation(
            Long id,
            DesignationRequestDTO requestDTO);

    DesignationResponseDTO getDesignationById(Long id);

    List<DesignationResponseDTO> getAllDesignations();

    PagedResponse<DesignationResponseDTO> getDesignations(
            Pageable pageable,
            String search);

    void deleteDesignation(Long id);
}
