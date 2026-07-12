package com.eems.employee.employee.specification;
import org.springframework.data.jpa.domain.Specification;

import com.eems.employee.common.entity.Employee;

public class EmployeeSpecification {

    private EmployeeSpecification() {
    }

    public static Specification<Employee> containsKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            String searchText = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("employeeCode")),
                            searchText
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("firstName")),
                            searchText
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("lastName")),
                            searchText
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("email")),
                            searchText
                    )

            );
        };
    }

}
