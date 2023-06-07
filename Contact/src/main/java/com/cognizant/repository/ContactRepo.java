package com.cognizant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.model.Contact;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
	
	public Contact findByMobileNumber(String mobileNo);

}
