import { useEffect, useRef, useState } from "react";
import '../AddContact/ContactForm.css';
import useHttp from "../../hooks/use-http";
import { getContactById, updateContact } from "../../lib/api";

import { useLocation, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import LoadingSpinner from "../UI/LoadingSpinner";

toast.configure();
const EditContactForm = props => {

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

    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = state;

    const { sendRequest: getContactReq, status, error: apiError, data: contact }
        = useHttp(getContactById, true);
    const { sendRequest: onUpdateReq, status: updateStatus, error: apiErrorUpdate }
        = useHttp(updateContact, true);

    const [data, setData] = useState({ name: "", mobileNumber: "" });

    useEffect(() => {
        getContactReq(id);
        if (status === 'completed') {
            setData({ name: contact.name, mobileNumber: contact.mobileNumber })
        }
        else if (updateStatus === 'completed' && !apiErrorUpdate) {
            navigate('/');
        }
        else if (apiErrorUpdate) {
            swal({
                title: "Already Exists!",
                text: apiErrorUpdate,
                icon: "error",
                button: true,
                dangerMode: true,
            }).then((isOkey) => {
                if (isOkey) {
                    return;
                }
            });

        }
        else if (!apiErrorUpdate) {

        }

    }, [getContactReq, status, apiError, updateStatus, apiErrorUpdate]);

    const onCancel = () => {
        navigate('/');
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        console.log(data);
        if (data.name.trim().length === 0 || data.mobileNumber.trim().length === 0) {
            errorToastEmptyInput();
            return;
        }
        if (+data.mobileNumber.length !== 10) {
            errorToastInvalidMobile();
            return;
        }

        let contactObj = {
            id: id,
            name: data.name || contact.name,
            mobileNumber: data.mobileNumber || contact.mobileNumber
        };
        console.log(contactObj);
        swal({
            title: "Are You sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            button: true,
            dangerMode: true,
        }).then((isOkey) => {
            if (isOkey) {
                onUpdateReq(contactObj).then((res) => {
                    swal({
                        title: "Updated!",
                        icon: "success",
                        button: "ok",
                    });
                });
            }
        });

    }

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }


    if (status === 'completed') {

        return (
            <>
                <form onSubmit={submitFormHandler}>
                    <div className="form-control">
                        <label htmlFor="name">Name:</label>
                        <input type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <label htmlFor="mobile">Mobile:</label>
                        <input type="number"
                            id="mobile"
                            value={data.mobileNumber}
                            onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
                        />
                    </div>
                    <button type="button" className="cancelButton" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="saveButton">Save</button>
                </form>
            </>
        )
    }
};

export default EditContactForm;