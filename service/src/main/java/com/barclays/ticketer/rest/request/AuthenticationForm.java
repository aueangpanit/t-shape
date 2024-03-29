package com.barclays.ticketer.rest.request;

import javax.validation.constraints.NotBlank;

public class AuthenticationForm {
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  public AuthenticationForm() {

  }

  public AuthenticationForm(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
