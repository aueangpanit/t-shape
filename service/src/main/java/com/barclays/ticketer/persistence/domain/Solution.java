package com.barclays.ticketer.persistence.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Solution {
  @Id
  @Column(name = "solution_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer solutionId;

  @ManyToOne
  private User author;

  @ManyToOne
  private Ticket ticket;

  private Number ticketId;

  private String description;

  private Date dateCreated;

  private Date dateUpdated;

  public Integer getSolutionId() {
    return this.solutionId;
  }

  public void setSolutionId(Integer solutionId) {
    this.solutionId = solutionId;
  }

  public User getAuthor() {
    User user = new User();

    user.setName(author.getName());
    user.setEmail(author.getEmail());

    return user;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public void setTicket(Ticket ticket) {
    this.ticket = ticket;
  }

  public Number getTicketId() {
    return ticketId;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getDateCreated() {
    return this.dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return this.dateUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.dateUpdated = dateUpdated;
  }
}