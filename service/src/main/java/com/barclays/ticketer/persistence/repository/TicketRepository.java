package com.barclays.ticketer.persistence.repository;

import com.barclays.ticketer.persistence.domain.Ticket;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
