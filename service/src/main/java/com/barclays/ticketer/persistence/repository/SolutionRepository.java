package com.barclays.ticketer.persistence.repository;

import java.util.List;

import com.barclays.ticketer.persistence.domain.Solution;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolutionRepository extends JpaRepository<Solution, Integer> {

  @Query(value = "SELECT s FROM Solution s WHERE s.ticket.ticketId = ?1")
  public List<Solution> findAllByTicketId(Integer ticketId);
}
