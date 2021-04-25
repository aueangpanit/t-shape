package com.barclays.ticketer.service;

import java.util.Date;

import com.barclays.ticketer.persistence.domain.Solution;
import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.persistence.repository.SolutionRepository;
import com.barclays.ticketer.persistence.repository.TicketRepository;
import com.barclays.ticketer.persistence.repository.UserRepository;
import com.barclays.ticketer.rest.request.SolutionForm;
import com.barclays.ticketer.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class SolutionService {
  @Autowired
  private SolutionRepository solutionRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TicketRepository ticketRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public String createSolution(SolutionForm solutionForm, String jwt) throws HttpClientErrorException {
    Date dateCreated = new Date(System.currentTimeMillis());

    Ticket ticket = ticketRepository.findById(solutionForm.getTicketId()).get();

    if (ticket.getStatus()) {
      throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,
          "Ticket is open! You can only add solutions when the ticket is closed.");
    }

    Solution solution = new Solution();
    solution.setAuthor(userRepository.findByEmail(jwtUtil.extractUsername(jwt)).get());
    solution.setTicket(ticket);
    solution.setDescription(solutionForm.getDescription());
    solution.setDateCreated(dateCreated);
    solution.setDateUpdated(dateCreated);
    solutionRepository.save(solution);

    return "Created successfully";
  }

  public String updateSolution(Integer id, SolutionForm solutionForm) {
    Date dateUpdated = new Date(System.currentTimeMillis());

    Solution solution = solutionRepository.findById(id).get();
    solution.setDescription(solutionForm.getDescription());
    solution.setDateUpdated(dateUpdated);
    solutionRepository.save(solution);

    return "Updated successfully";
  }

  public String deleteSolution(Integer id) {
    solutionRepository.deleteById(id);

    return "Deleted successfully";
  }
}
