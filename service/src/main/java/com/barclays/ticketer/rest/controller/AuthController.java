package com.barclays.ticketer.rest.controller;

import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.persistence.repository.UserRepository;
import com.barclays.ticketer.rest.request.AuthenticationForm;
import com.barclays.ticketer.rest.request.RegisterForm;
import com.barclays.ticketer.rest.response.AuthenticationResponse;
import com.barclays.ticketer.service.MyUserDetailsService;
import com.barclays.ticketer.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private MyUserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  @PostMapping(path = "/authenticate")
  public ResponseEntity<AuthenticationResponse> createAuthenticationToken(
      @RequestBody AuthenticationForm authenticationForm) throws Exception {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(authenticationForm.getEmail(), authenticationForm.getPassword()));
    } catch (BadCredentialsException e) {
      throw new Exception("Incorrect email or password", e);
    }

    final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationForm.getEmail());
    final String jwt = jwtUtil.generateToken(userDetails);

    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  @PostMapping(path = "/register")
  public ResponseEntity<?> register(@RequestBody RegisterForm registerForm) throws Exception {
    if (userRepository.findByEmail(registerForm.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().body("User already exists");
    }

    User user = new User();
    user.setName(registerForm.getName());
    user.setEmail(registerForm.getEmail());
    user.setPassword(passwordEncoder.encode(registerForm.getPassword()));

    userRepository.save(user);

    final UserDetails userDetails = userDetailsService.loadUserByUsername(registerForm.getEmail());
    final String jwt = jwtUtil.generateToken(userDetails);

    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

}
