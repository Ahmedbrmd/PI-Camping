/**
 * Created By Radhwen Kacem
 * Date: 28/05/2024
 * Time : 18:08
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
}
