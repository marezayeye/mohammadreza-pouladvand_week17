import { useState, useEffect } from "react";
import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  saveEditedContact,
  checked = false,
  onCheck = () => {},
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: name,
    lastName: lastName,
    email: email,
    phone: phone,
  });

  useEffect(() => {
    setEditedContact({ name, lastName, email, phone });
  }, [name, lastName, email, phone]);

  const editChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEditedContact((editedContact) => ({ ...editedContact, [name]: value }));
  };

  return !editMode ? (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(id)}
        style={{ marginRight: "1rem" }}
      />
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>📧</span> {email}
      </p>

      <p>
        <span>📞</span> {phone}
      </p>

      <button onClick={() => setEditMode(true)}>✍️</button>
      <button onClick={() => deleteHandler(id)}>🗑️</button>
    </li>
  ) : (
    <li className={styles.item}>
      <p>
        <input
          type="text"
          name="name"
          value={editedContact.name}
          onChange={editChangeHandler}
        />
        <input
          type="text"
          name="lastName"
          value={editedContact.lastName}
          onChange={editChangeHandler}
        />
      </p>
      <p>
        <span>📧</span>
        <input
          type="text"
          name="email"
          value={editedContact.email}
          onChange={editChangeHandler}
        />
      </p>
      <p>
        <span>📞</span>
        <input
          type="number"
          name="phone"
          value={editedContact.phone}
          onChange={editChangeHandler}
        />
      </p>
      <button className={styles.cancelbtn} onClick={() => setEditMode(false)}>
        Cancel
      </button>
      <button
        className={styles.savebtn}
        onClick={() => {
          saveEditedContact({ ...editedContact, id });
          setEditMode(false);
        }}
      >
        Save
      </button>
    </li>
  );
}

export default ContactItem;
