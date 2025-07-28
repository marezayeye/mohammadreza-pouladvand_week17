import { createContext, useReducer, useEffect } from "react";

export const ContactContext = createContext();

const initialState = [];

function contactReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return action.payload;
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    case "EDIT_CONTACT":
      return state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [contacts, dispatch] = useReducer(contactReducer, initialState);

  // loading contacts on component first load
  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_CONTACTS", payload: data });
      });
  }, []);

  // adding a new contact
  const addContact = async (contact) => {
    const res = await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    const data = await res.json();
    dispatch({ type: "ADD_CONTACT", payload: data });
  };

  // deleting a contact
  const deleteContact = async (id) => {
    await fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" });
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  // editing a contact
  const editContact = async (contact) => {
    const res = await fetch(`http://localhost:3000/contacts/${contact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    const data = await res.json();
    dispatch({ type: "EDIT_CONTACT", payload: data });
  };

  // Batch delete contacts
  const batchDeleteContacts = async (ids) => {
    await Promise.all(ids.map(id => fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" })));
    dispatch({ type: "SET_CONTACTS", payload: contacts.filter(c => !ids.includes(c.id)) });
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, deleteContact, editContact, batchDeleteContacts }}
    >
      {children}
    </ContactContext.Provider>
  );
}
