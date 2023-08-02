import React, {useState, useEffect} from "react";
// import { uuid} from 'uuidv4';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./addcontact";
import ContactList from "./contactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./editcontact";

function App() {
  const local_storage_key = "contacts";
  const [Contacts,setContacts]= useState([]);

  //Retrieve Contacts
  const retriveContacts = async() =>{
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) =>{
    const request={
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request );
    setContacts([...Contacts , response.data]);
  }

  const updateContactHandler = async(contact) =>{
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const {id,name,email}= response.data;
     setContacts(Contacts.map((contact)=>{
       return contact.id === id ? {...response.data}  : contact;
      })
    );
  }

  const removeContactHandler = async (id) =>{
    await api.delete(`/contacts/${id}`);
    const newContactList = Contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=>{

    const getAllContact = async()=> {
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
    };
    // const retriveContact = JSON.parse(sessionStorage.getItem(local_storage_key));
    // if (retriveContact) setContacts(retriveContact);
    getAllContact();
  },[]);

  useEffect(()=>{
    sessionStorage.setItem(local_storage_key, JSON.stringify(Contacts));
  },[Contacts]);

 

  return (
    <div className="ui container">
      <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<ContactList/>} 
        // render={(props)=> (<ContactList {...props} contacts={Contacts}  getContactId={removeContactHandler}/>)}
        />
        <Route path="/add" exact element={<AddContact/>}
        // render={(props)=> (<AddContact {...props} AddContactHandler={AddContactHandler}/>)}
        />
      </Routes>
      <Route path="/contact/:id" component={ContactDetail} ></Route>
      
      <Route path="/edit" component={<EditContact/>} ></Route>
      {/* <AddContact AddContactHandler={AddContactHandler}/>
      <ContactList contacts={Contacts}  getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
