package com.barclays.ticketer.rest.controller;

import java.util.Date;

import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.persistence.repository.TicketRepository;
import com.barclays.ticketer.rest.request.TicketForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/ticket")
@CrossOrigin(origins = "*")
public class TicketController {
	@Autowired
	private TicketRepository ticketRepository;

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Ticket> getAllTicket() {
		return ticketRepository.findAll();
	}

	@GetMapping(path = "/{id}")
	public @ResponseBody Ticket getTicket(@PathVariable Integer id) {
		return ticketRepository.findById(id).get();
	}

	@PostMapping(path = "/create")
	public @ResponseBody String createTicket(@RequestBody TicketForm ticketForm) {

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

	@PutMapping(path = "/update/{id}")
	public @ResponseBody String updateTicket(@PathVariable Integer id, @RequestBody TicketForm ticketForm) {
		Date dateUpdated = new Date(System.currentTimeMillis());

		Ticket ticket = ticketRepository.findById(id).get();
		ticket.setTitle(ticketForm.getTitle());
		// ticket.setAuthor(ticketForm.getAuthor());
		ticket.setDescription(ticketForm.getDescription());
		ticket.setDateUpdated(dateUpdated);
		ticketRepository.save(ticket);

		return "Updated successfully";
	}

	@DeleteMapping(path = "/delete/{id}")
	public @ResponseBody String deleteTicket(@PathVariable Integer id) {
		ticketRepository.deleteById(id);

		return "Deleted successfully";
	}
}
