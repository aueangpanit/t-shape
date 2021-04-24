package com.barclays.ticketer.service;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.persistence.repository.UserRepository;
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
    return userRepository.findAll();
  }

  public User getCurrentUser(String jwt) {
    User user = userRepository.findByEmail(jwtUtil.extractUsername(jwt)).get();
    user.setPassword(null);
    user.setUserId(null);
    return user;
  }
}
