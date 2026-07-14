package com.eems.designation_service.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.eems.designation_service.entity.Designation;

@Repository
public interface DesignationRepository extends
        JpaRepository<Designation, Long>,
        JpaSpecificationExecutor<Designation> {

    Optional<Designation> findByDesignationCode(String designationCode);

    Optional<Designation> findByDesignationName(String designationName);

    boolean existsByDesignationCode(String designationCode);

    boolean existsByDesignationName(String designationName);

    Page<Designation> findAll(Pageable pageable);

}
