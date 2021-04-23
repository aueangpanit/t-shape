package com.barclays.ticketer.service;

import java.util.ArrayList;

import com.barclays.ticketer.persistence.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    com.barclays.ticketer.persistence.domain.User user = userRepository.findByEmail(email).get();
    return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
  }
}
