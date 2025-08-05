import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ContactContext } from "../context/ContactContext";

import inputs from "../constants/inputs.js";
import ContactsList from "./ContactsList.jsx";
import DeletionModal from "./DeletionModal.jsx";

import styles from "./Contacts.module.css";

function Contacts() {
  const [alert, SetAlert] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    contacts,
    addContact,
    deleteContact,
    editContact,
    batchDeleteContacts,
  } = useContext(ContactContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const contactSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

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
      <Formik
        initialValues={{ name: "", lastName: "", email: "", phone: "" }}
        validationSchema={contactSchema}
        onSubmit={(values, { resetForm }) => {
          addContact(values);
          resetForm();
          SetAlert("");
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.formContainer}>
            {inputs.map((input, index) => (
              <div key={index} className={styles.inputdiv}>
                <Field
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className={styles.inputfield}
                />
                <ErrorMessage
                  name={input.name}
                  component="div"
                  className={styles.errordiv}
                />
              </div>
            ))}
            <button type="submit">Add Contact</button>
          </Form>
        )}
      </Formik>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      {selectedIds.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          style={{
            margin: "1rem 0",
            background: "#e74c3c",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
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
