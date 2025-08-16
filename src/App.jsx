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

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("Contacts")) || [];
    setArrContacts(contacts);
  }, []);

  function deleteContact(id) {
    const newContacts = arrContacts.filter((contact) => contact.id !== id);
    setArrContacts(newContacts);
    saveToLocalStorage(newContacts);
    setPersonData(CLEAR_PERSON_DATA);
  }

  function addNewContact(contact) {
    const contactWithID = { ...contact, id: nanoid() };
    const newContacts = [...arrContacts, contactWithID];
    setArrContacts(newContacts);
    saveToLocalStorage(newContacts);
    setPersonData(CLEAR_PERSON_DATA);
  }

  function editExistingContact(contact) {
    const newContacts = arrContacts.map((item) =>
      item.id === contact.id ? contact : item
    );
    setArrContacts(newContacts);
    saveToLocalStorage(newContacts);
  }
  function saveNewArrContacts(contact) {
    if (contact.id) {
      editExistingContact(contact);
    } else {
      addNewContact(contact);
    }
  }

  function handleEditMode(contact) {
    setPersonData(contact);
  }

  function handleAddMode() {
    setPersonData(CLEAR_PERSON_DATA);
  }

  function saveToLocalStorage(contacts) {
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }
  return (
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
          saveNewArrContacts={saveNewArrContacts}
          onDelete={deleteContact}
        />
      </section>
    </article>
  );
}

export default App;
