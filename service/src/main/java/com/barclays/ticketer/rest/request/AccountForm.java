package com.barclays.ticketer.rest.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AccountForm {
  @NotBlank
  private String name;

  @NotNull
  private Boolean isTechnician;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean isIsTechnician() {
    return this.isTechnician;
  }

  public Boolean getIsTechnician() {
    return this.isTechnician;
  }

  public void setIsTechnician(Boolean isTechnician) {
    this.isTechnician = isTechnician;
  }

}
