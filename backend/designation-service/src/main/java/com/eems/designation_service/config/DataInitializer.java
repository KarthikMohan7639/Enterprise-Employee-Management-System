package com.eems.designation_service.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.eems.designation_service.entity.Designation;
import com.eems.designation_service.enums.DesignationStatus;
import com.eems.designation_service.repository.DesignationRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner loadDesignationData(
            DesignationRepository repository) {

        return args -> {

            if (repository.count() > 0) {
                return;
            }

            repository.save(create(
                    "DES001",
                    "Software Engineer",
                    1L));

            repository.save(create(
                    "DES002",
                    "Senior Software Engineer",
                    1L));

            repository.save(create(
                    "DES003",
                    "Tech Lead",
                    1L));

            repository.save(create(
                    "DES004",
                    "HR Executive",
                    2L));

            repository.save(create(
                    "DES005",
                    "HR Manager",
                    2L));

            repository.save(create(
                    "DES006",
                    "Accountant",
                    3L));

            repository.save(create(
                    "DES007",
                    "Finance Manager",
                    3L));
        };
    }

    private Designation create(
            String code,
            String name,
            Long departmentId) {

        Designation designation = new Designation();

        designation.setDesignationCode(code);
        designation.setDesignationName(name);
        designation.setDepartmentId(departmentId);
        designation.setStatus(DesignationStatus.ACTIVE);

        return designation;
    }
}
