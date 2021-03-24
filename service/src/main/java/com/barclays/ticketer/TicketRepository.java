package com.barclays.ticketer;

import com.barclays.ticketer.models.Ticket;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called ticketRepository
// CRUD refers Create, Read, Update, Delete

public interface TicketRepository extends CrudRepository<Ticket, Integer> {

}
