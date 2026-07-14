package com.eems.department_service.search;

import org.springframework.data.jpa.domain.Specification;

import com.eems.department_service.entity.Department;

public class DepartmentSpecification {

    private DepartmentSpecification() {
    }

    public static Specification<Department> containsKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            String search = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("departmentCode")),
                            search
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("departmentName")),
                            search
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")),
                            search
                    )

            );

        };

    }

}