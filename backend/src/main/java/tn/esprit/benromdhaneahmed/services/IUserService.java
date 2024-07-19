package tn.esprit.benromdhaneahmed.services;

import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.entities.UserRole;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IUserService {
    public User save (User user) throws MessagingException;
    public User delete (Long id);
    public User findUserById(Long id);
    List<User> findAll();
    public Set<User> findByRole(UserRole role);
    public Optional<User> findByUsername(String userName);
    public User resetPassword(String email) throws MessagingException;

    List<User> getUsers();
}
