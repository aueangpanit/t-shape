package com.barclays.ticketer.rest.request;

import javax.validation.constraints.NotBlank;

public class TicketForm {
  @NotBlank
  private String title;
  private String description;
  private boolean status;
  private Integer assignedUserId;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean getStatus() {
    return this.status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  public boolean isStatus() {
    return this.status;
  }

  public Integer getAssignedUserId() {
    return this.assignedUserId;
  }

  public void setAssignedUserId(Integer assignedUserId) {
    this.assignedUserId = assignedUserId;
  }
}
