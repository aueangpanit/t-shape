package com.barclays.ticketer.service;

import java.util.Date;

import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.persistence.repository.TicketRepository;
import com.barclays.ticketer.rest.request.TicketForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
	@Autowired
	private TicketRepository ticketRepository;

	public Iterable<Ticket> getAllTicket() {
		return ticketRepository.findAll();
	}

	public Ticket getTicket(Integer id) {
		return ticketRepository.findById(id).get();
	}

	public String createTicket(TicketForm ticketForm) {
		Date dateCreated = new Date(System.currentTimeMillis());

		Ticket ticket = new Ticket();
		ticket.setTitle(ticketForm.getTitle());
		ticket.setStatus(true);
		// ticket.setAuthor(ticketForm.getAuthor());
		ticket.setDescription(ticketForm.getDescription());
		ticket.setDateCreated(dateCreated);
		ticket.setDateUpdated(dateCreated);
		ticketRepository.save(ticket);

		return "Created successfully";
	}

	public String updateTicket(Integer id, TicketForm ticketForm) {
		Date dateUpdated = new Date(System.currentTimeMillis());

		Ticket ticket = ticketRepository.findById(id).get();
		ticket.setTitle(ticketForm.getTitle());
		// ticket.setAuthor(ticketForm.getAuthor());
		ticket.setDescription(ticketForm.getDescription());
		ticket.setDateUpdated(dateUpdated);
		ticketRepository.save(ticket);

		return "Updated successfully";
	}

	public String deleteTicket(Integer id) {
		ticketRepository.deleteById(id);

		return "Deleted successfully";
	}
}
