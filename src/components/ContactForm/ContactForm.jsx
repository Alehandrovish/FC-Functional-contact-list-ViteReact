import { useState } from "react";
import "./ContactForm.css";

function ContactForm({ personData, formSubmitHandler, onDelete }) {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function onInputChange(event) {
    const { id, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [id]: value };
    });
  }

  function clearInput(event) {
    const inputSibling = event.target.parentNode.firstChild;
    setFormData((prev) => {
      return { ...prev, [inputSibling.id]: "" };
    });
  }

  function clearAllInputs() {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    formSubmitHandler(formData);
  }

  const { id, firstName, lastName, email, phone } = formData;

  function onDeleteContact() {
    onDelete(id);
    clearAllInputs();
  }

  if (formData.id !== personData.id) {
    setFormData(personData);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-block">
        <div className="form-item">
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
      </div>
      <div className="form-buttons">
        <button type="submit">Save</button>
        <button
          type="button"
          className={id ? "" : "hide"}
          onClick={onDeleteContact}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
