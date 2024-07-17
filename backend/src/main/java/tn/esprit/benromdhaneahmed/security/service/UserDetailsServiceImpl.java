/**
 * Created By Radhwen Kacem
 * Date: 25/05/2024
 * Time : 12:57
 * Project Name : NourCenterBack
 */
package tn.esprit.benromdhaneahmed.security.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.services.IUserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    IUserService userService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return UserDetailsImpl.build(user);
    }
}
