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

  // Load contacts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) {
      dispatch({ type: "SET_CONTACTS", payload: JSON.parse(stored) });
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Add a new contact
  const addContact = (contact) => {
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  // Delete a contact
  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  // Edit a contact
  const editContact = (contact) => {
    dispatch({ type: "EDIT_CONTACT", payload: contact });
  };

  // Batch delete contacts
  const batchDeleteContacts = (ids) => {
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
