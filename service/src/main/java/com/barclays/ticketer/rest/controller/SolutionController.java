package com.barclays.ticketer.rest.controller;

import javax.validation.Valid;

import com.barclays.ticketer.rest.request.SolutionForm;
import com.barclays.ticketer.service.SolutionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;

@Controller
@RequestMapping(path = "/solution")
@CrossOrigin(origins = "*")
public class SolutionController {
	@Autowired
	SolutionService solutionService;

	@PostMapping(path = "/create")
	public ResponseEntity<String> createSolution(@Valid @RequestBody SolutionForm solutionForm,
			@RequestHeader String authorization) {

		try {
			return ResponseEntity.ok(solutionService.createSolution(solutionForm, authorization.substring(7)));
		} catch (HttpClientErrorException error) {
			return ResponseEntity.status(error.getStatusCode()).body(error.getStatusText());
		}

	}

	@PutMapping(path = "/update/{id}")
	public @ResponseBody String updateSolution(@PathVariable Integer id, @Valid @RequestBody SolutionForm solutionForm) {
		return solutionService.updateSolution(id, solutionForm);
	}

	@DeleteMapping(path = "/delete/{id}")
	public @ResponseBody String deleteSolution(@PathVariable Integer id) {
		return solutionService.deleteSolution(id);
	}
}
