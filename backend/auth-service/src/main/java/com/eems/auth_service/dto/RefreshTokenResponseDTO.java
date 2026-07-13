package com.eems.auth_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshTokenResponseDTO {

    private String accessToken;

    private String refreshToken;

}
