package com.barclays.ticketer.service;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.persistence.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public Iterable<User> getAllUser() {
    return userRepository.findAll();
  }
}
