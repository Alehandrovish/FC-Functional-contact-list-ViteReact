import { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import "./reset.css";
import "./App.css";

function App() {
  const CLEAR_PERSON_DATA = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const [arrContacts, setArrContacts] = useState([]);
  const [personData, setPersonData] = useState(CLEAR_PERSON_DATA);

  function deleteContact(id) {
    const newContacts = arrContacts.filter((contact) => contact.id !== id);
    saveToLocalStorage(newContacts);
    setArrContacts(newContacts);
    setPersonData(CLEAR_PERSON_DATA);
  }

  function formSubmitHandler(contact) {
    let newContacts = [...arrContacts];
    if (personData.id) {
      const contactForEditId = arrContacts.findIndex(
        (cont) => cont.id === contact.id
      );
      newContacts[contactForEditId] = contact;
    } else {
      contact.id = nanoid();
      newContacts = newContacts.concat(contact);
    }
    saveToLocalStorage(newContacts);
    setArrContacts(newContacts);
  }

  function handleEditMode(contact) {
    setPersonData(contact);
  }

  function handleAddMode() {
    setPersonData(CLEAR_PERSON_DATA);
  }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("Contacts")) || [];
    setArrContacts(contacts);
  }, []);

  function saveToLocalStorage(contacts) {
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }
  return (
    <>
      <article className="content-wrapper">
        <h1>Contact list</h1>
        <section className="content-block">
          <ContactList
            contacts={arrContacts}
            onDelete={deleteContact}
            onEditMode={handleEditMode}
            idOfItem={personData.id}
            onAddMode={handleAddMode}
          />
          <ContactForm
            personData={personData}
            formSubmitHandler={formSubmitHandler}
            onDelete={deleteContact}
          />
        </section>
      </article>
    </>
  );
}

export default App;
