import React from "react";
import {Link} from "react-router-dom";
import user from "../images/user.png";
import { useContactsCrud } from "../ContextApi/ContactCRUDContacts";
const ContactCard = (props) =>{
    const {removeContactHandler} = useContactsCrud();

    const deleteContacts =(id)=>{
        removeContactHandler(id);
    }
    const {id,name,email} = props.contact;

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
                <div className="content">
                    <Link to={{pathname:`/contact/${id}` , state:{contact:props.contact}}}>
                    <div className="header">
                        {name}
                    </div>
                    <div>{email}</div>
                    </Link>
                </div>
            <i className="trash alternate outline icon" 
            style={{color:'red' , marginTop: "7px", marginleft:"10px" } }
            onClick={()=> deleteContacts(id)}>
            </i>
            <Link to={`/contacts/${id}`} state = { {contact: props.contact}} >
            <i className="edit alternate outline icon" 
            style={{color:'blue' , marginTop: "7px"} }>
            </i>
            </Link>
        </div>
    );

}

export default ContactCard;