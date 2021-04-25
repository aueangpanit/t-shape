package com.barclays.ticketer.service;

import java.util.Date;
import java.util.List;

import com.barclays.ticketer.persistence.domain.Solution;
import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.persistence.domain.User;
import com.barclays.ticketer.persistence.repository.SolutionRepository;
import com.barclays.ticketer.persistence.repository.TicketRepository;
import com.barclays.ticketer.persistence.repository.UserRepository;
import com.barclays.ticketer.rest.request.TicketForm;
import com.barclays.ticketer.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class TicketService {
	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SolutionRepository solutionRepository;

	@Autowired
	private JwtUtil jwtUtil;

	public Iterable<Ticket> getAllTicket() {
		return ticketRepository.findAll();
	}

	public Ticket getTicket(Integer id) {
		return ticketRepository.findById(id).get();
	}

	public String createTicket(TicketForm ticketForm, String jwt) {
		Date dateCreated = new Date(System.currentTimeMillis());

		Ticket ticket = new Ticket();
		ticket.setTitle(ticketForm.getTitle());
		ticket.setStatus(true);
		ticket.setAuthor(userRepository.findByEmail(jwtUtil.extractUsername(jwt)).get());
		ticket.setDescription(ticketForm.getDescription());
		ticket.setDateCreated(dateCreated);
		ticket.setDateUpdated(dateCreated);
		ticketRepository.save(ticket);

		return "Created successfully";
	}

	public String updateTicket(Integer id, TicketForm ticketForm) {
		Date dateUpdated = new Date(System.currentTimeMillis());
		Ticket ticket = ticketRepository.findById(id).get();
		ticket.setAssignedUser(null);

		if (ticketForm.getAssignedUserId() != null) {
			User user = userRepository.findById(ticketForm.getAssignedUserId()).get();
			if (user == null) {
				throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "User not found.");
			}
			ticket.setAssignedUser(user);
		}

		ticket.setTitle(ticketForm.getTitle());
		ticket.setDescription(ticketForm.getDescription());
		ticket.setStatus(ticketForm.getStatus());
		ticket.setDateUpdated(dateUpdated);
		ticketRepository.save(ticket);

		return "Updated successfully";
	}

	public String deleteTicket(Integer id) {
		ticketRepository.deleteById(id);

		return "Deleted successfully";
	}

	public List<Solution> getSolutions(Integer id) {
		return solutionRepository.findAllByTicketId(id);
	}

	public String unassignUser(Integer ticketId) {
		Ticket ticket = ticketRepository.findById(ticketId).get();
		ticket.setAssignedUser(null);
		ticketRepository.save(ticket);

		return "Unassigned Successfully";
	}

	public List<Ticket> getAllTicketsWithAssignedUser(Integer userId) {
		return ticketRepository.findAllTicketsWithAssignedUser(userId);
	}
}
