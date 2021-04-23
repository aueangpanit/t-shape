package com.barclays.ticketer.rest.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Optional;

import com.barclays.ticketer.persistence.domain.Ticket;
import com.barclays.ticketer.persistence.repository.TicketRepository;
import com.barclays.ticketer.rest.request.TicketForm;
import com.barclays.ticketer.service.TicketService;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class TicketServiceUnitTest {
  @Autowired
  private TicketService ticketService;

  @MockBean
  private TicketRepository ticketRepository;

  Ticket ticket1 = new Ticket();
  Ticket ticket2 = new Ticket();
  ArrayList<Ticket> tickets = new ArrayList<>();

  @BeforeEach
  public void setUp() {
    ticket1.setTitle("ticket 1");
    ticket1.setStatus(false);
    ticket1.setDescription("description");

    tickets.add(ticket1);
    tickets.add(ticket2);

    Mockito.when(ticketRepository.findAll()).thenReturn(tickets);
    Mockito.when(ticketRepository.findById(1)).thenReturn(Optional.of(ticket1));
  }

  @Test
  void testGetAllTicket() {
    Assertions.assertThat(ticketService.getAllTicket()).isEqualTo(tickets);

    Mockito.verify(ticketRepository, Mockito.times(1)).findAll();
  }

  @Test
  void getTicket() {
    Assertions.assertThat(ticketService.getTicket(1)).isEqualTo(ticket1);

    Mockito.verify(ticketRepository, Mockito.times(1)).findById(1);
  }

  @Test
  void createTicket() {
    TicketForm ticketForm = new TicketForm();
    ticketForm.setTitle(ticket1.getTitle());
    ticketForm.setDescription(ticket1.getDescription());

    Assertions.assertThat(ticketService.createTicket(ticketForm, "")).isEqualTo("Created successfully");

    ArgumentCaptor<Ticket> argument = ArgumentCaptor.forClass(Ticket.class);
    Mockito.verify(ticketRepository, Mockito.times(1)).save(argument.capture());
    assertEquals(ticket1.getTitle(), argument.getValue().getTitle());
    assertEquals(ticket1.getDescription(), argument.getValue().getDescription());
  }

  @Test
  void updateTicket() {
    TicketForm ticketForm = new TicketForm();
    ticketForm.setTitle(ticket1.getTitle());
    ticketForm.setDescription(ticket1.getDescription());

    Assertions.assertThat(ticketService.updateTicket(1, ticketForm)).isEqualTo("Updated successfully");

    ArgumentCaptor<Ticket> argument = ArgumentCaptor.forClass(Ticket.class);
    Mockito.verify(ticketRepository, Mockito.times(1)).save(argument.capture());
    assertEquals(ticket1.getTitle(), argument.getValue().getTitle());
    assertEquals(ticket1.getDescription(), argument.getValue().getDescription());
  }

  @Test
  void deleteTicket() {
    Assertions.assertThat(ticketService.deleteTicket(1)).isEqualTo("Deleted successfully");

    Mockito.verify(ticketRepository, Mockito.times(1)).deleteById(1);
  }
}