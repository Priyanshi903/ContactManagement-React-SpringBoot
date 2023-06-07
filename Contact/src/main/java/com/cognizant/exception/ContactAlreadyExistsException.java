package com.cognizant.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//@ResponseStatus(code = HttpStatus.NOT_MODIFIED)
public class ContactAlreadyExistsException extends Exception {
	
	public ContactAlreadyExistsException(String message) {
		super(message);
	}

}
