package com.eems.designation_service.search;

import org.springframework.data.jpa.domain.Specification;

import com.eems.designation_service.entity.Designation;

public class DesignationSpecification {

    private DesignationSpecification() {
    }

    public static Specification<Designation> containsKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return cb.conjunction();
            }

            String search = "%" + keyword.toLowerCase() + "%";

            return cb.or(
                    cb.like(
                            cb.lower(root.get("designationCode")),
                            search
                    ),
                    cb.like(
                            cb.lower(root.get("designationName")),
                            search
                    ),
                    cb.like(
                            cb.lower(root.get("description")),
                            search
                    )
            );

        };

    }
}
