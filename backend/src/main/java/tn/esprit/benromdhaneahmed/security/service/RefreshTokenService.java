/**
 * Created By Radhwen Kacem
 * Date: 28/05/2024
 * Time : 17:55
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.benromdhaneahmed.repositories.UserRepository;
import tn.esprit.benromdhaneahmed.security.Entity.RefreshToken;
import tn.esprit.benromdhaneahmed.security.repository.RefreshTokenRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${jwt.expiration.token.refresh.ms}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException( "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }
    public Optional<RefreshToken> findByToken(String token ) {
        return refreshTokenRepository.findByToken(token);
    }
    @Transactional
    public void deleteByUserId(Long userId) {
        refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
}
