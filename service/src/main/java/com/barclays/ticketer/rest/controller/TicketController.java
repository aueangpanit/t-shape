package com.barclays.ticketer.rest.controller;

import javax.validation.Valid;

import com.barclays.ticketer.persistence.domain.Solution;
import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.rest.request.TicketForm;
import com.barclays.ticketer.service.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/ticket")
@CrossOrigin(origins = "*")
public class TicketController {
	@Autowired
	TicketService ticketService;

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Ticket> getAllTicket() {
		return ticketService.getAllTicket();
	}

	@GetMapping(path = "/{id}")
	public @ResponseBody Ticket getTicket(@PathVariable Integer id) {
		return ticketService.getTicket(id);
	}

	@GetMapping(path = "/{id}/solutions")
	public @ResponseBody Iterable<Solution> getSolutions(@PathVariable Integer id) {
		return ticketService.getSolutions(id);
	}

	@PostMapping(path = "/create")
	public @ResponseBody String createTicket(@Valid @RequestBody TicketForm ticketForm,
			@RequestHeader String authorization) {
		return ticketService.createTicket(ticketForm, authorization.substring(7));
	}

	@PutMapping(path = "/update/{id}")
	public @ResponseBody String updateTicket(@PathVariable Integer id, @Valid @RequestBody TicketForm ticketForm) {
		return ticketService.updateTicket(id, ticketForm);
	}

	@DeleteMapping(path = "/delete/{id}")
	public @ResponseBody String deleteTicket(@PathVariable Integer id) {
		return ticketService.deleteTicket(id);
	}
}
