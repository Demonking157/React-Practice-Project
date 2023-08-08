import { createContext, useState, useContext } from "react";
import api from "../api/contacts";
import { uuid} from 'uuidv4';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {

    const [contacts,setContacts]=useState([]);
    const[searchTerm, setSearchTerm]= useState("");
    const [searchResult,setSeacrhResult]= useState([]);

    //Search Contacts
    const searchHandler = (searchTerm) =>{
      setSearchTerm(searchTerm);
      if(searchTerm !== ""){
        const newContactList = contacts.filter((contact)=>{
          return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSeacrhResult(newContactList);
      }
      else{
        setSeacrhResult(contacts);
      }
    }

      //RetrieveContacts
      const retrieveContacts= async()=>{
        const response = await api.get("/contacts");
        if(response.data) setContacts(response.data);
      }

      //Delete Contacts
      const removeContactHandler = async (id) =>{
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact)=>{
          return contact.id !== id;
        });
    
        setContacts(newContactList);
      }

      //Add Contact
      const addContactHandler = async (contact) =>{
        const request={
          id: uuid(),
          ...contact
        }
    
        const response = await api.post("/contacts", request );
        setContacts([...contacts , response.data]);
      }

      // Update Contacts
      const updateContactHandler = async(contact) =>{
        const response = await api.put(`/contacts/${contact.id}`, contact)
        const {id}= response.data;
         setContacts(contacts.map((contact)=>{
           return contact.id === id ? {...response.data}  : contact;
          })
        );
      }
      
    const value ={
        contacts,
        searchTerm,
        searchResult,
        retrieveContacts,
        removeContactHandler,
        addContactHandler,
        updateContactHandler,
        searchHandler
    }
    return <contactsCrudContext.Provider value={value}>
        {children}
    </contactsCrudContext.Provider>
}


export function useContactsCrud(){
    return useContext(contactsCrudContext);
}