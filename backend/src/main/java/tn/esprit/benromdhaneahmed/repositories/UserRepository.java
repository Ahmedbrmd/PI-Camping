package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.entities.UserRole;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Set<User> findByRolesRole(UserRole roles_role);
    User findByUsername(String userName);
    User findByEmail(String email);
}
