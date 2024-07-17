package tn.esprit.benromdhaneahmed.services;

import tn.esprit.benromdhaneahmed.entities.Role;

import java.util.List;

public interface IRoleService {
    List<Role> findAll();
    public Role findById(Long id);
    public Role save(Role role);
    public void delete(Long id);
}
