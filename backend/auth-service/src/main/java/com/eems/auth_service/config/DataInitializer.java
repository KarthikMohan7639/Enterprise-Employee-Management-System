package com.eems.auth_service.config;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.eems.auth_service.entity.Role;
import com.eems.auth_service.entity.User;
import com.eems.auth_service.repository.RoleRepository;
import com.eems.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner loadData(
            UserRepository userRepository,
            RoleRepository roleRepository) {

        return args -> {

            if (userRepository.count() > 0) {
                return;
            }

            Role adminRole = Role.builder()
                    .name("ROLE_ADMIN")
                    .build();

            roleRepository.save(adminRole);

            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .enabled(true)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .roles(Set.of(adminRole))
                    .build();

            userRepository.save(admin);

            System.out.println("================================");
            System.out.println("ADMIN USER CREATED");
            System.out.println("Username : admin");
            System.out.println("Password : admin123");
            System.out.println("================================");
        };

    }

}