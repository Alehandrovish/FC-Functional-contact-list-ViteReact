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

  const [arrContacts, setArrContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("Contacts")) || [];
  });
  const [personData, setPersonData] = useState(CLEAR_PERSON_DATA);

  // useEffect(() => {
  //   const contacts = JSON.parse(localStorage.getItem("Contacts")) || [];
  //   setArrContacts(contacts);
  // }, []);

  useEffect(() => {
    saveToLocalStorage(arrContacts);
    console.log(JSON.stringify(localStorage.getItem("Contacts")));
  }, [arrContacts]);

  function deleteContact(id) {
    const newContacts = arrContacts.filter((contact) => contact.id !== id);
    setArrContacts(newContacts);
    setPersonData(CLEAR_PERSON_DATA);
  }

  function saveNewArrContacts(contact) {
    let newContacts = [];
    if (contact.id) {
      newContacts = arrContacts.map((item) =>
        item.id === contact.id ? contact : item
      );
    } else {
      contact.id = nanoid();
      newContacts = [...arrContacts, contact];
    }
    setArrContacts(newContacts);
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
            saveNewArrContacts={saveNewArrContacts}
            onDelete={deleteContact}
          />
        </section>
      </article>
    </>
  );
}

export default App;
