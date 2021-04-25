package com.barclays.ticketer.rest.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class SolutionForm {
  @NotBlank
  private String description;

  @NotNull
  private Integer ticketId;

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getTicketId() {
    return this.ticketId;
  }

  public void setTicketId(Integer ticketId) {
    this.ticketId = ticketId;
  }
}
