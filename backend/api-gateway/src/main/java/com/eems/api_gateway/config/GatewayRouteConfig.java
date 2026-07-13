package com.eems.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRouteConfig {

    @Bean
    String gatewayLoaded() {

        System.out.println("==================================");
        System.out.println("Enterprise API Gateway Started");
        System.out.println("Port : 8080");
        System.out.println("==================================");

        return "gateway";
    }

}