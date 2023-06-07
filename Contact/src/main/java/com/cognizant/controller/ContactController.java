package com.cognizant.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.exception.ContactAlreadyExistsException;
import com.cognizant.exception.ContactNotFoundException;
import com.cognizant.model.Contact;
import com.cognizant.service.ContactService;
import com.cognizant.dto.Successful;


@RestController
@RequestMapping("/contacts")
@CrossOrigin()
public class ContactController {

	@Autowired
	private ContactService contactService;
	
	@GetMapping
	public List<Contact> getAllProducts(){
		return contactService.getAllContacts();
	}
	
	@PostMapping
	public Successful addProduct(@RequestBody @Valid Contact contact) throws Exception {
		 contactService.addContact(contact);
		 return new Successful(true,"Data Stored");
	}
	
	@PutMapping
	public Successful updateContact(@RequestBody @Valid Contact contact) throws Exception{
		contactService.updateContact(contact);
		 return new Successful(true,"Data Stored");
	}
	
	@DeleteMapping("/{id}")
	public void deleteContact(@PathVariable long id ) throws ContactNotFoundException {
		contactService.deleteContact(id);
	}
	
	
//	@GetMapping("/new-contact")
//	public boolean checkContact(@RequestBody RequestContactCheck requestContactCheck) {
//		return contactService.checkUser(requestContactCheck.getMobileNo());
//	}
	
	@GetMapping("/{id}")
	public Optional<Contact> getContactById(@PathVariable long id) throws ContactNotFoundException {
		return contactService.getContactById(id);
	}
	
}
