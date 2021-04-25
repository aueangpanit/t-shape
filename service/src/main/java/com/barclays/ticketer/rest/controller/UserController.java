package com.barclays.ticketer.rest.controller;

import javax.validation.Valid;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.rest.request.AccountForm;
import com.barclays.ticketer.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping(path = "/all")
  public @ResponseBody Iterable<User> getAllUsers() {
    return userService.getAllUser();
  }

  @GetMapping(path = "/current")
  public @ResponseBody User getCurrentUser(@RequestHeader String authorization) {
    return userService.getCurrentUser(authorization.substring(7));
  }

  @PutMapping(path = "/update")
  public @ResponseBody String updateUser(@RequestHeader String authorization,
      @Valid @RequestBody AccountForm registerForm) {
    return userService.updateUser(registerForm, authorization.substring(7));
  }
}
