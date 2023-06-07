package com.cognizant.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.exception.ContactAlreadyExistsException;
import com.cognizant.exception.ContactNotFoundException;
import com.cognizant.model.Contact;
import com.cognizant.repository.ContactRepo;

@Service
public class ContactService {
	
	@Autowired
	private ContactRepo contactRepo;

	public List<Contact> getAllContacts() {
		
		return contactRepo.findAll();
	}

	public void addContact(Contact contact) throws ContactAlreadyExistsException {
		Contact exist_contact=contactRepo.findByMobileNumber(contact.getMobileNumber());
	
		if(exist_contact!=null) {
			String name=exist_contact.getName();
			String mobileNo=exist_contact.getMobileNumber();
			throw new ContactAlreadyExistsException("Contact("+name+") with mentioned mobile number "+mobileNo+" already exists");
		}
		contactRepo.saveAndFlush(contact);
	}
	
	public void deleteContact(long id) throws ContactNotFoundException {
		Contact exist_contact=contactRepo.findById(id).orElse(null);
		if(exist_contact==null) {
			throw new ContactNotFoundException("Contact Not Found!");
		}
		contactRepo.deleteById(id);
	}
	
	public void updateContact(Contact contact) throws ContactAlreadyExistsException {
		Contact exist_contact=contactRepo.findByMobileNumber(contact.getMobileNumber());
		
		if(exist_contact!=null) {
			String name=exist_contact.getName();
			String mobileNo=exist_contact.getMobileNumber();
			throw new ContactAlreadyExistsException("Contact("+name+") with mentioned mobile number "+mobileNo+" already exists");
		}
		contactRepo.saveAndFlush(contact);
	}

	public boolean checkUser(String mobileNo) {
		Contact contact=contactRepo.findByMobileNumber(mobileNo);
		if(contact!=null) {
			return true;
		}
		else
			return false;
	}
	
	public Optional<Contact> getContactById(long id) throws ContactNotFoundException {
		System.out.print(contactRepo.findById(id));
		if(contactRepo.findById(id).isEmpty()) {
			throw new ContactNotFoundException("Contact not Found!");
		}
		return contactRepo.findById(id);
	}
	

}
