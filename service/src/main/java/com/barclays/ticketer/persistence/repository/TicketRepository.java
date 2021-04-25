package com.barclays.ticketer.persistence.repository;

import java.util.List;

import com.barclays.ticketer.persistence.domain.Ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
  @Query(value = "SELECT t FROM Ticket t WHERE t.assignedUser.userId = ?1")
  public List<Ticket> findAllTicketsWithAssignedUser(Integer userId);
}
