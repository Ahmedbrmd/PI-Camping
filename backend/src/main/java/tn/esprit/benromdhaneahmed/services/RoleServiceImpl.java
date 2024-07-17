package tn.esprit.benromdhaneahmed.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.Role;
import tn.esprit.benromdhaneahmed.repositories.RoleRepository;

import java.util.List;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).orElseThrow(null);
    }

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void delete(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(null);
        if(role != null) roleRepository.delete(role);

    }
}
