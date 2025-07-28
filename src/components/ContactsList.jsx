import ContactItem from "./ContactItem.jsx";

import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, saveEditedContact, selectedIds = [], onCheck = () => {} }) {
  return (
    <div className={styles.container}>
      <h3>ContactsList</h3>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
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
