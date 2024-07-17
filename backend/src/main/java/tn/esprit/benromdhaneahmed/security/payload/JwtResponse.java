/**
 * Created By Radhwen Kacem
 * Date: 25/05/2024
 * Time : 14:17
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String refreshToken;
    public JwtResponse(String accesToken, Long id, String username, String email, List<String> roles, String refreshToken) {
        this.token = accesToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.refreshToken = refreshToken;
    }
}
