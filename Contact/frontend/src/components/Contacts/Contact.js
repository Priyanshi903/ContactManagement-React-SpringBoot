import { useEffect } from 'react';
import useHttp from "../../hooks/use-http";
import { deleteContact } from "../../lib/api";
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import './Contact.css';

const Contact = props => {

    const { refresh } = props;
    const navigate = new useNavigate();

    const { sendRequest: deleteRequest, status, error } = useHttp(deleteContact, true);

    useEffect(() => {
        if (status === 'completed' && !error) {
            refresh();
        }
    }, [refresh, status, error])

    const onDeleteHandler = (e) => {
        e.preventDefault();
        swal({
            title: "Are You sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            button: true,
            dangerMode: true,
        }).then((isOkey) => {
            if (isOkey) {
                deleteRequest(props.id).then((res) => {
                    swal({
                        title: "Deleted!",
                        icon: "success",
                        button: "ok",
                    });
                });
            }
        });
        return false;
    }

    const onEditHandler = () => {
        navigate('/edit-contact', { state: { id: props.id } });
    }

    return (
        < tr>
            <td>{props.name}</td>
            <td className='mobileNo'>+{props.mobileno}</td>
            <td>
                <ul>
                    <li><button className="edit" type="button" onClick={onEditHandler}>Edit</button></li>
                    <li><button id='delete' type="button" onClick={onDeleteHandler}>Delete</button></li>
                </ul>
            </td>
        </tr >

    );
}

export default Contact;