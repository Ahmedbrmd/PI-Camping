/**
 * Created By Radhwen Kacem
 * Date: 13/07/2024
 * Time : 13:00
 * Project Name : backend
 */
package tn.esprit.benromdhaneahmed.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.DTO.LoginRequest;
import tn.esprit.benromdhaneahmed.entities.DTO.MessageResponse;
import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.security.Entity.RefreshToken;
import tn.esprit.benromdhaneahmed.security.jwt.JwtUtils;
import tn.esprit.benromdhaneahmed.security.payload.JwtResponse;
import tn.esprit.benromdhaneahmed.security.payload.TokenRefreshRequest;
import tn.esprit.benromdhaneahmed.security.payload.TokenRefreshResponse;
import tn.esprit.benromdhaneahmed.security.service.RefreshTokenService;
import tn.esprit.benromdhaneahmed.security.service.UserDetailsImpl;
import tn.esprit.benromdhaneahmed.services.IUserService;

import javax.mail.MessagingException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    IUserService userService;
  //  @Autowired
    //PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,
                refreshToken.getToken()));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User signUpRequest) throws MessagingException {
        return ResponseEntity.ok(userService.save(signUpRequest));
    }
    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {

        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshToken -> {
                    refreshTokenService.deleteByUserId(refreshToken.getUser().getId());
                    return ResponseEntity.ok(new MessageResponse("Log out successful!"));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }
    @GetMapping("/resetpassword/{email}")
    public ResponseEntity<?> resetPassword(@PathVariable String email) throws MessagingException {

        return ResponseEntity.ok(userService.resetPassword(email));
    }
}
