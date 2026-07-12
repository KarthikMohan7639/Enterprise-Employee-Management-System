package com.eems.employee.config;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.eems.employee.common.entity.Employee;
import com.eems.employee.employee.enums.EmployeeStatus;
import com.eems.employee.employee.enums.Gender;
import com.eems.employee.employee.repository.EmployeeRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner loadData(EmployeeRepository employeeRepository) {

        return args -> {

            if (employeeRepository.count() > 0) {
                return;
            }

            for (int i = 1; i <= 20; i++) {

                Employee employee = new Employee();

                employee.setEmployeeCode("EMP" + String.format("%03d", i));
                employee.setFirstName("Employee");
                employee.setLastName(String.valueOf(i));
                employee.setEmail("employee" + i + "@eems.com");
                employee.setPhone("9876543" + String.format("%03d", i));
                employee.setDepartment(
                        i % 2 == 0 ? "Engineering" : "HR");
                employee.setDesignation(
                        i % 2 == 0 ? "Software Engineer" : "HR Executive");
                employee.setSalary(
                    BigDecimal.valueOf(35000 + (i * 1000))
                );
                employee.setGender(
                    i % 2 == 0
                        ? Gender.MALE
                        : Gender.FEMALE
                );
                employee.setStatus(EmployeeStatus.ACTIVE);                                

                employee.setJoiningDate(LocalDate.now().minusDays(i));

                employeeRepository.save(employee);

            }

            System.out.println("====================================");
            System.out.println("20 Demo Employees Inserted");
            System.out.println("====================================");

        };

    }

}
