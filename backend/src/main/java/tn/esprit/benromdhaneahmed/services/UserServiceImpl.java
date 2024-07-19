package tn.esprit.benromdhaneahmed.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import tn.esprit.benromdhaneahmed.entities.Role;
import tn.esprit.benromdhaneahmed.entities.User;

import tn.esprit.benromdhaneahmed.entities.UserRole;
import tn.esprit.benromdhaneahmed.repositories.RoleRepository;
import tn.esprit.benromdhaneahmed.repositories.UserRepository;

import javax.mail.MessagingException;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Value("!123")
    private String passwordSuffix;

    private final PasswordEncoder passwordEncoder;
    @Autowired
    UserServiceImpl(@Lazy  PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Autowired
    EmailService emailService;



    @Override
    public User save(User user) throws MessagingException {
        if(user.getId() == null){
            Set<Role> roles = new HashSet<>();
            if(!user.getRoles().isEmpty()) {
                user.getRoles().forEach(role->{
                    if(role.getRole().toString().equals("ADMIN")) {
                        Optional<Role> role1 = roleRepository.findByRole(role.getRole());
                        roles.add(role1.get());
                    }
                    if(role.getRole().toString().equals("CLIENT")) {
                        Optional<Role> role1 = roleRepository.findByRole(role.getRole());
                        roles.add(role1.get());
                    }
                });
            }
            user.setRoles(roles);
            String password = generatePassword(user.getFirstName(),user.getLastName());
            emailService.sendNewUsernameAndPasswordEmail(user.getFirstName(),user.getUsername(),password, user.getEmail());
            user.setPassword(passwordEncoder.encode(password));
            return userRepository.save(user);
        } else {
            User user1 = this.findUserById(user.getId());
            user1.setId(user.getId());
            user1.setFirstName(user.getFirstName());
            user1.setLastName(user.getLastName());
            user1.setUsername(user.getUsername());
            user1.setEmail(user.getEmail());
            user1.setActive(user.isActive());
            user1.setJoinDate(user.getJoinDate());
            user1.setLastLoginDate(user.getLastLoginDate());
            user1.setProfileImageUrl(user.getProfileImageUrl());
            user1.setLastLoginDateDisplay(user.getLastLoginDateDisplay());
            return userRepository.save(user);
        }

    }

    @Override
    public User delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);
        if (user != null) {
            userRepository.delete(user);
            return user;
        }
        return null;
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(null);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Set<User> findByRole(UserRole role) {
        return userRepository.findByRolesRole(role);
    }

    @Override
    public Optional<User> findByUsername(String userName) {
        return Optional.of(userRepository.findByUsername(userName));
    }

    @Override
    public User resetPassword(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user != null) {

            String newPassword = generatePassword(user.getFirstName(),user.getLastName());
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            emailService.sendNewPasswordEmail(user.getFirstName(),newPassword,user.getEmail());
        }
        return user;
    }

    private String generatePassword(String firstName, String lastName) {
        String basePassword = firstName.substring(0, 1).toUpperCase() + lastName.toLowerCase();
        SecureRandom random = new SecureRandom();
        int number = random.nextInt(1000);
        return basePassword + number + passwordSuffix;
    }

    @Override
    public List<User> getUsers() {

        return userRepository.findAll();
    }

}
