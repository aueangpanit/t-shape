package com.barclays.ticketer.service;

import java.util.ArrayList;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.persistence.repository.UserRepository;
import com.barclays.ticketer.rest.request.AccountForm;
import com.barclays.ticketer.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public Iterable<User> getAllUser() {
    ArrayList<User> users = new ArrayList<>();

    userRepository.findAll().forEach(u -> {
      User user = new User();
      user.setUserId(u.getUserId());
      user.setName(u.getName());
      user.setEmail(u.getEmail());
      user.setIsTechincian(u.getIsTechnician());
      users.add(user);
    });

    return users;
  }

  public User getCurrentUser(String jwt) {
    User user = userRepository.findByEmail(jwtUtil.extractUsername(jwt)).get();
    user.setPassword(null);
    user.setUserId(null);
    return user;
  }

  public String updateUser(AccountForm accountForm, String jwt) {
    User user = userRepository.findByEmail(jwtUtil.extractUsername(jwt)).get();
    user.setName(accountForm.getName());
    user.setIsTechincian(accountForm.getIsTechnician());
    userRepository.save(user);
    return "User updated successfully";
  }
}
