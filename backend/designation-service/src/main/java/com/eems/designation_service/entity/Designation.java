package com.eems.designation_service.entity;

import java.time.LocalDateTime;

import com.eems.designation_service.enums.DesignationStatus;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "designations")
@Getter
@Setter
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String designationCode;

    @Column(nullable = false)
    private String designationName;

    private String description;

    @Column(nullable = false)
    private Long departmentId;

    @Enumerated(EnumType.STRING)
    private DesignationStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
