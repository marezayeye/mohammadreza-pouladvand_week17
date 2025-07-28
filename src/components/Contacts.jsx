import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import { v4 } from "uuid";

import styles from "./Contacts.module.css";

import ContactsList from "./ContactsList";
import inputs from "../constants/inputs.js";

function Contacts() {
  const [newContact, setNewContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [alert, SetAlert] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { contacts, addContact, deleteContact, editContact, batchDeleteContacts } = useContext(ContactContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewContact((newContact) => ({ ...newContact, [name]: value }));
  };

  const addHandler = () => {
    if (!newContact.name || !newContact.lastName || !newContact.email || !newContact.phone) {
      SetAlert("Please Enter Valid Data!");
      return;
    }
    addContact(newContact);
    setNewContact({ name: "", lastName: "", email: "", phone: "" });
    SetAlert("");
  };

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) setShowModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await batchDeleteContacts(selectedIds);
    setIsDeleting(false);
    setShowModal(false);
    setSelectedIds([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={newContact[input.name]}
            onChange={changeHandler}
          />
        ))}
        <button onClick={addHandler}>Add Contact</button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      {selectedIds.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          style={{ margin: "1rem 0", background: "#e74c3c", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Delete Selected
        </button>
      )}
      <ContactsList
        contacts={contacts}
        deleteHandler={deleteContact}
        saveEditedContact={editContact}
        selectedIds={selectedIds}
        onCheck={handleCheck}
      />
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <p>Are you sure you want to delete {selectedIds.length} selected contact(s)?</p>
            <button onClick={confirmDelete} style={{ marginRight: "1rem", background: "#e74c3c", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Yes, Delete"}</button>
            <button onClick={() => setShowModal(false)} style={{ padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }} disabled={isDeleting}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Contacts;
