package tn.esprit.benromdhaneahmed.entities.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    protected Long id;
    private String lastName;
    private String firstName;
    private String username;
    private String email;
    private LocalDate lastLoginDate;
    private LocalDate lastLoginDateDisplay;
    private LocalDate joinDate;
    private String profileImageUrl;
    private  boolean active;
    private boolean notLocked;
    private String password;
}