package com.barclays.ticketer.persistence.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Ticket {
  @Id
  @Column(name = "ticket_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer ticketId;

  @ManyToOne
  private User author;

  @ManyToOne
  private User assignedUser;

  @OneToMany(mappedBy = "ticket")
  private List<Solution> solutions;

  private String title;

  // true = open, false = close
  private boolean status;

  private String description;

  private Date dateCreated;

  private Date dateUpdated;

  public Integer getTicketId() {
    return ticketId;
  }

  public void setTicketId(Integer ticketId) {
    this.ticketId = ticketId;
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

  public User getAssignedUser() {
    if (assignedUser == null) {
      return null;
    }

    User user = new User();

    user.setName(assignedUser.getName());
    user.setEmail(assignedUser.getEmail());

    return user;
  }

  public void setAssignedUser(User assignedUser) {
    this.assignedUser = assignedUser;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public boolean getStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return dateUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.dateUpdated = dateUpdated;
  }
}