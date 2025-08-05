import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  saveEditedContact,
  checked = false,
  onCheck = () => {},
}) {
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {

  }, [name, lastName, email, phone]);

  const contactSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

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
    <li className={styles.itemEdit}>
      <Formik
        initialValues={{ name, lastName, email, phone }}
        validationSchema={contactSchema}
        onSubmit={(values) => {
          saveEditedContact({ ...values, id });
          setEditMode(false);
        }}
      >
        {() => (
          <Form>
            <div className={styles.itemEdit}>
              <div className={styles.nameContainer}>
                <Field
                  type="text"
                  name="name"
                  placeholder="First Name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.email}>
                <span>📧</span>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.phoneNumber}>
                <span>📞</span>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className={styles.input}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <button
                  className={styles.cancelbtn}
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button className={styles.savebtn} type="submit">
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </li>
  );
}

export default ContactItem;
