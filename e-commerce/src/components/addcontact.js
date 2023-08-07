import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../ContextApi/ContactCRUDContacts";

const AddContact =()=> {
const [email , setEmail] = useState("");
const [name , setName] = useState("");
const {addContactHandler}= useContactsCrud();
const navigate = useNavigate();
const add = (e) =>{
     e.preventDefault();
     if(name === "" || email === ""){
        alert("Please fill all the input!");
        return
    }
    addContactHandler({name,email});
    setName("");
    setEmail("");
    navigate("/");
}

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="jeffery" value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="jeffery" value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}

export default AddContact;