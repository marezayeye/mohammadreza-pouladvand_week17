import { useState } from "react";

import ContactItem from "./ContactItem.jsx";
import SearchInput from "./SearchInput.jsx";

import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, saveEditedContact, selectedIds = [], onCheck = () => {} }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredContacts =
    searchQuery.length >= 3
      ? contacts.filter(c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : contacts;
  return (
    <div className={styles.container}>
      <h3>ContactsList</h3>
      <SearchInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {filteredContacts.length ? (
        <ul className={styles.contacts}>
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              saveEditedContact={saveEditedContact}
              checked={selectedIds.includes(contact.id)}
              onCheck={onCheck}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contacts Yet!</p>
      )}
    </div>
  );
}

export default ContactsList;
