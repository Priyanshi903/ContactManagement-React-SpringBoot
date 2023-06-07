import { useCallback } from "react";
import { useNavigate } from "react-router";
import useHttp from "../../hooks/use-http";
import { addContact } from "../../lib/api";
import ContactForm from "./ContactForm";

const AddContact = (props) => {


    const navigate = new useNavigate();
    // const addedCommentHandler = useCallback(() => {
    //     sendRequest(quoteId)
    //   }, [sendRequest, quoteId]);

    // const contactPageRefresh = useCallback(() => {
    //     console.log('refresh called');
    //     navigate('/contacts');
    // },[]);



    return (
        <ContactForm />
    )
}

export default AddContact;