import React, {useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import { useContactsCrud } from "../ContextApi/ContactCRUDContacts";

const EditContact=()=> {
    const location = useLocation("");
    const {id,name,email}=location.state.contact;
    const [newName,setNewName] = useState(name);
    const [newEmail,setNewEmail] = useState(email);
    const navigate = useNavigate();
    const {updateContactHandler} = useContactsCrud();

//     constructor(props){
//         super(props)
//         const {id,name,email} = props.location.state.contact;
//         this.state={
//             id,
//             name,
//             email,
//         };
//     }
// state={
//     name: "",
//     email: "",
// }

const update = (e) =>{
     e.preventDefault();
     if(newName === "" || newEmail === ""){
        alert("Please fill all the input!");
        return
    }
    updateContactHandler({id,name:newName , email:newEmail});
    setNewEmail("");
    setNewName("");
    navigate("/");
}
    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="jeffery" value={newName} onChange={(e)=>{
                        setNewName( e.target.value)
                    }}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="jeffery" value={newEmail} onChange={(e)=>{
                        setNewEmail( e.target.value)
                    }}/>
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}


export default EditContact;