import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import ContactCard from "./contactCart";
import { useContactsCrud } from "../ContextApi/ContactCRUDContacts";

const ContactList = (props) => {

    const {contacts,retrieveContacts} = useContactsCrud();
    // const deleteContactHandler = (id) => {
    //     props.getContactId(id);
    // };

    useEffect(()=>{
        retrieveContacts();
    },[]);

    const  renderContactList = contacts.map((contact)=>{
        return (
            <ContactCard  contact={contact} 
            // clickHandler={deleteContactHandler}
            key={contact.id}/>

        );
    })
    return(
        <div className="main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right ">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;