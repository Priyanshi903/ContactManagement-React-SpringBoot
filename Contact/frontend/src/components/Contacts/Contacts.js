import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";

import useHttp from "../../hooks/use-http";
import { deleteContact, getAllContacts } from "../../lib/api";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import ContactList from "./ContactList";
import "./Contacts.css";
import ErrorPage from '../UI/ErrorPage'

const Contacts = () => {
    const [symbol, setSymbol] = useState('');
    const navigate = new useNavigate();

    const { sendRequest, status, data: contacts, error } = useHttp(getAllContacts, true);
    const { sendRequest: deleteRequest } = useHttp(deleteContact, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const refreshContacts = useCallback(() => {
        sendRequest();
    }, [sendRequest]);

    const onDeleteContactHandler = (id) => {
        deleteRequest(id);
        refreshContacts();
    }

    if (status === 'completed' && error) {
        return <ErrorPage />
    }

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'completed') {

        const filterContactChangehandler = event => {
            setSymbol(event.target.value);
        }

        const filteredContactList =
            contacts.filter(
                contact => (contact.name.toLowerCase().startsWith(symbol) === true)
            )

        let content = (
            <p style={{ textAlign: 'center', color: 'purple', fontSize: '25px' }}>No contact found. Maybe add one?</p>
        );

        if (filteredContactList.length > 0) {
            content = (
                <ContactList
                    contactList={filteredContactList}
                    onDelete={onDeleteContactHandler}
                    contactPageRefresh={refreshContacts}
                />
            )
        }

        return (
            <Card>
                <ul className="arrange">
                    <li>
                        <input type="text"
                            name="search"
                            placeholder="Search.."
                            className='searchBox'
                            onChange={filterContactChangehandler} />
                    </li>
                    <li>
                        <button type="button"
                            className="addContact"
                            onClick={() => navigate('/new-contact')}>
                            Add Contact
                        </button>
                    </li>
                </ul>


                {content}
            </Card>
        )
    }


};

export default Contacts;