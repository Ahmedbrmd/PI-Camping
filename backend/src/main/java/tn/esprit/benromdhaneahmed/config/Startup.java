package tn.esprit.benromdhaneahmed.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tn.esprit.benromdhaneahmed.entities.Role;
import tn.esprit.benromdhaneahmed.entities.UserRole;
import tn.esprit.benromdhaneahmed.repositories.RoleRepository;

import java.util.List;


@Component
public class Startup implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;


    @Override
    public void run(String... args) throws Exception {
        Role roleAdmin = new Role(null,UserRole.ADMIN);
        Role roleClient = new Role(null,UserRole.CLIENT);
        List<Role> roles = roleRepository.findAll();
        if (roles.isEmpty()) {
            roleRepository.save(roleAdmin);
            roleRepository.save(roleClient);
        } else {
           if(roles.stream().noneMatch(role -> "CLIENT".equals(role.getRole().toString()))) roleRepository.save(roleClient);
           if(roles.stream().noneMatch(role -> "ADMIN".equals(role.getRole().toString()))) roleRepository.save(roleAdmin);
        }
    }
}
