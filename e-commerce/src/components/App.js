import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./Header";
import AddContact from "./addcontact";
import ContactList from "./contactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./editcontact";
import { ContactsCrudContextProvider } from "../ContextApi/ContactCRUDContacts";

function App() {
  
  // useEffect(()=>{

  //   const getAllContact = async()=> {
  //     const allContacts = await retriveContacts();
  //     if(allContacts) setContacts(allContacts);
  //   };
  //   // const retriveContact = JSON.parse(sessionStorage.getItem(local_storage_key));
  //   // if (retriveContact) setContacts(retriveContact);
  //   getAllContact();
  // },[]);

  return (
    <div className="ui container">
      <Router>
      <Header />
      <ContactsCrudContextProvider>
      <Routes>
        <Route path="/" exact element={<ContactList/>}  />
        <Route path="/add" exact element={<AddContact/>}/>
      
      <Route path="/contact/:id" component={ContactDetail} ></Route>
      
      <Route path="/edit" component={<EditContact/>} ></Route>

      </Routes>
      </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
