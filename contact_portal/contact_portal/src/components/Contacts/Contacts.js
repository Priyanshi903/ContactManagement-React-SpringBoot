import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";

import useHttp from "../../hooks/use-http";
import { deleteContact, getAllContacts } from "../../lib/api";
import AddContact from "../AddContact/AddContact";
import Card from "../UI/Card";
import ContactList from "./ContactList";
import "./Contacts.css";

const Contacts = () => {
    const [symbol, setSymbol] = useState('');
    const navigate = new useNavigate();

    const { sendRequest, status, data: contacts } = useHttp(getAllContacts, true);
    const { sendRequest: deleteRequest } = useHttp(deleteContact, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
    // sendRequest();

    const refreshContacts = useCallback(() => {
        sendRequest();
    }, [sendRequest]);

    const onDeleteContactHandler = (id) => {
        deleteRequest(id);
        refreshContacts();
    }

    if (status === 'completed') {

        const filterContactChangehandler = event => {
            setSymbol(event.target.value);
        }

        const filteredContactList =
            contacts.filter(
                contact => (contact.name.toLowerCase().startsWith(symbol) === true)
            )

        console.log(contacts);
        return (
            <Card>
                <input type="text" name="search" placeholder="Search.." className='searchBox'
                    onChange={filterContactChangehandler} />
                <button type="button" className="addContact" onClick={() => navigate('/new-contact')}>Add Contact</button>
                <ContactList
                    contactList={filteredContactList}
                    onDelete={onDeleteContactHandler}
                    contactPageRefresh={refreshContacts}
                />
            </Card>
        )
    }


};

export default Contacts;