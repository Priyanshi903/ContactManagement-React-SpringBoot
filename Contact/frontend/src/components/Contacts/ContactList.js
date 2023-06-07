import classes from "./ContactList.module.css";
import Contact from "./Contact";

const ContactList = (props) => {
    return (
        <>
            <table className={`${classes.tablee}`}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {props.contactList.map(
                    (contact, index) => {
                        return (
                            <tbody key={contact.id}>
                                < Contact id={contact.id}
                                    key={contact.uniqueId}
                                    name={contact.name}
                                    mobileno={contact.mobileNumber}
                                    onDeleteContact={props.onDelete}
                                    refresh={props.contactPageRefresh}
                                />
                            </tbody>
                        )
                    }
                )
                }

            </table>
        </>
    )
};

export default ContactList;