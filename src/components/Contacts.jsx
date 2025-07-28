import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";


import styles from "./Contacts.module.css";

import ContactsList from "./ContactsList.jsx";
import inputs from "../constants/inputs.js";
import DeletionModal from "./DeletionModal.jsx";


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
      <DeletionModal
        open={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        count={selectedIds.length}
        isDeleting={isDeleting}
      />
    </div>
  );
}
export default Contacts;
