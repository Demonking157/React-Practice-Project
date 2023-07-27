import React, {useState, useEffect} from "react";
import { uuid} from 'uuidv4';
import './App.css';
import Header from "./Header";
import AddContact from "./addcontact";
import ContactList from "./contactList";

function App() {
  const local_storage_key = "contacts";
  const [Contacts,setContacts]= useState([])
  const AddContactHandler = (contact) =>{
    setContacts([...Contacts , {id : uuid(), ...contact}]);
  }

  const removeContactHandler =(id) =>{
    const newContactList = Contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=>{
    const retriveContact = JSON.parse(localStorage.getItem(local_storage_key));
    if (retriveContact) setContacts(retriveContact);
  },[]);

  useEffect(()=>{
    localStorage.setItem(local_storage_key, JSON.stringify(Contacts));
  },[Contacts]);

 

  return (
    <div className="ui container">
      <Header />
      <AddContact AddContactHandler={AddContactHandler}/>
      <ContactList contacts={Contacts}  getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
