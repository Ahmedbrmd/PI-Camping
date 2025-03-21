/**
 * Created By Radhwen Kacem
 * Date: 28/05/2024
 * Time : 18:07
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenRefreshRequest {
    @NotBlank
    private String refreshToken;
}
