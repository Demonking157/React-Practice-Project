import React, {useState, useEffect} from "react";
// import { uuid} from 'uuidv4';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./Header";
import AddContact from "./addcontact";
import ContactList from "./contactList";

function App() {
  const local_storage_key = "contacts";
  const [Contacts,setContacts]= useState([])
  const AddContactHandler = (contact) =>{
    setContacts([...Contacts , {id : "1", ...contact}]);
  }

  const removeContactHandler =(id) =>{
    const newContactList = Contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=>{
    const retriveContact = JSON.parse(sessionStorage.getItem(local_storage_key));
    if (retriveContact) setContacts(retriveContact);
  },[]);

  useEffect(()=>{
    sessionStorage.setItem(local_storage_key, JSON.stringify(Contacts));
  },[Contacts]);

 

  return (
    <div className="ui container">
      <Router>
      <Header />
      <Routes>
        <Route path="/" exact render={(props)=> (<ContactList {...props} contacts={Contacts}  getContactId={removeContactHandler}/>)}/>
        <Route path="/add" exact render={(props)=> (<AddContact {...props} AddContactHandler={AddContactHandler}/>)}/>
      </Routes>
      
      {/* <AddContact AddContactHandler={AddContactHandler}/>
      <ContactList contacts={Contacts}  getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
