import { useCallback, useEffect, useRef, useState } from "react";
import './ContactForm.css';
import useHttp from "../../hooks/use-http";
import { addContact } from "../../lib/api";

import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const ContactForm = props => {

    const errorToastEmptyInput = () => toast.error("Please enter a valid name and mobile number (non-empty values).",
        {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        },

    );

    const errorToastInvalidMobile = () => toast.error("Please enter a valid mobile number (= 10).",
        {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        },

    );

    const nameInputRef = useRef();
    const mobileInputRef = useRef();
    const navigate = useNavigate();

    const { sendRequest: onAddContactReq, status, error: apiError } = useHttp(addContact, true);

    useEffect(() => {
        console.log(apiError);
        if (status === 'completed' && !apiError) {
            navigate('/contacts');
        }

    }, [status, apiError]);

    const onCancel = () => {
        navigate('/');
    }

    const submitFormHandler = (event) => {
        event.preventDefault();

        if (nameInputRef.current.value.trim().length === 0 || mobileInputRef.current.value.trim().length === 0) {
            errorToastEmptyInput();
            return;
        }
        if (+mobileInputRef.current.value.length !== 10) {
            errorToastInvalidMobile();
            return;
        }
        let contactObj = {
            name: nameInputRef.current.value,
            mobileNumber: mobileInputRef.current.value
        }

        onAddContactReq(contactObj);

        nameInputRef.current.value = '';
        mobileInputRef.current.value = '';
    }

    return (
        <>
            <form onSubmit={submitFormHandler}>
                <div className="form-control">
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        ref={nameInputRef}
                    />
                </div>
                <br />
                <div className="form-control">
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="number"
                        id="mobile"
                        ref={mobileInputRef}
                    />
                </div>
                <button type="button" className="cancelButton" onClick={onCancel}>Cancel</button>
                <button type="submit" className="saveButton">Save</button>
            </form>
        </>
    )
};

export default ContactForm;