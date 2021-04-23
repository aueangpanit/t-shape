package com.barclays.ticketer.rest.controller;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping(path = "/all")
	public @ResponseBody Iterable<User> getAllTicket() {
		return userService.getAllUser();
	}
}
