package com.barclays.ticketer.rest.response;

import com.barclays.ticketer.persistence.domain.User;

public class AuthenticationResponse {
  private final String jwt;
  private User user;

  public AuthenticationResponse(String jwt, User user) {
    this.jwt = jwt;
    this.user = user;
  }

  public String getJwt() {
    return jwt;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
