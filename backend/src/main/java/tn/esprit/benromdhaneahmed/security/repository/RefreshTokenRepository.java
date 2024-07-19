/**
 * Created By Radhwen Kacem
 * Date: 28/05/2024
 * Time : 18:13
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.security.Entity.RefreshToken;

import java.util.Optional;


@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(User user);
}
