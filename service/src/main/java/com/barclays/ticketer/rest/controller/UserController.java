package com.barclays.ticketer.rest.controller;

import com.barclays.ticketer.persistence.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
  @Autowired
  private UserRepository userRepository;

}
