package com.barclays.ticketer.rest.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class RegisterForm {
  @NotBlank
  private String name;

  @NotBlank
  private String email;

  @NotBlank
  private String password;

  @NotNull
  private Boolean isTechnician;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Boolean getIsTechnician() {
    return isTechnician;
  }

  public void setIsTechnician(Boolean isTechnician) {
    this.isTechnician = isTechnician;
  }
}
