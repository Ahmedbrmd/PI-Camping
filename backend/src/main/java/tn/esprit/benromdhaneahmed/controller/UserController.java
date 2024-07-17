/**
 * Created By Radhwen Kacem
 * Date: 13/07/2024
 * Time : 15:51
 * Project Name : backend
 */
package tn.esprit.benromdhaneahmed.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.User;
import tn.esprit.benromdhaneahmed.services.IUserService;

import javax.mail.MessagingException;

@RestController
@RequestMapping("user/")
public class UserController {
    @Autowired
    IUserService userService;

    @PutMapping("/update_user")
    public ResponseEntity<?> updateUser( @RequestBody final User user) throws MessagingException {
        if(user.getId() != null) {
            return ResponseEntity.ok(userService.save(user));
        }else return ResponseEntity.ofNullable("user not found");
        }


    @PutMapping("remove/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") final Long id) {
        return  ResponseEntity.ok(userService.delete(id));
    }
    @GetMapping("get_one/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

}
