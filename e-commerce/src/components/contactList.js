import React, { useEffect,useRef } from "react";
import {Link} from "react-router-dom";
import ContactCard from "./contactCart";
import { useContactsCrud } from "../ContextApi/ContactCRUDContacts";

const ContactList = (props) => {

    const {contacts,retrieveContacts, searchTerm, searchResult , searchHandler} = useContactsCrud();
    // const inputEl = useRef("");
    // const deleteContactHandler = (id) => {
    //     props.getContactId(id);
    // };

    useEffect(()=>{
        retrieveContacts();
    },[]);

    const  renderContactList = (searchTerm.length < 1 ? contacts : searchResult).map((contact)=>{
        return (
            <ContactCard  contact={contact} 
            // clickHandler={deleteContactHandler}
            key={contact.id}/>

        );
    })

    const onUserSearch = (e) =>{
        searchHandler(e.target.value)
    };
    return(
        <div className="main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right ">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input 
                        // ref={inputEl}
                        type="text"
                        placeholder="Search Contact" 
                        className="prompt"
                        value={searchTerm} 
                        onChange={(e)=>{
                            onUserSearch(e)
                        }}></input>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length >0 ?renderContactList : "no Contacts available"}
            </div>
        </div>
    );
}

export default ContactList;