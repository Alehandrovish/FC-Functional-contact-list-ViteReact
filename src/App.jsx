import { Component } from "react";
import { nanoid } from "nanoid/non-secure";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import "./reset.css";
import "./App.css";

class App extends Component {
  CLEAR_PERSON_DATA = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  state = {
    contacts: [],
    personData: this.CLEAR_PERSON_DATA,
  };

  deleteContact = (id) => {
    this.setState((state) => {
      const contacts = state.contacts.filter((contact) => contact.id !== id);
      this.saveToLocalStorage(contacts);
      return {
        contacts,
        personData: this.CLEAR_PERSON_DATA,
      };
    });
  };

  formSubmitHandler = (contact) => {
    if (this.state.personData.id) {
      this.setState((state) => {
        let newContacts = state.contacts;
        const contactForEditId = state.contacts.findIndex(
          (cont) => cont.id === contact.id
        );
        newContacts[contactForEditId] = contact;
        this.saveToLocalStorage(newContacts);
        return {
          contacts: newContacts,
        };
      });
    } else {
      contact.id = nanoid();
      this.setState((state) => {
        const contacts = [...state.contacts, contact];
        this.saveToLocalStorage(contacts);
        return {
          contacts,
        };
      });
    }
  };

  handleEditMode = (contact) => {
    this.setState(() => {
      const personData = contact;
      return {
        personData,
      };
    });
  };

  handleAddMode = () => {
    this.setState({
      personData: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("Contacts")) || [];
    this.setState({ contacts });
  }
  saveToLocalStorage = (contacts) => {
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  };
  render() {
    return (
      <>
        <article className="content-wrapper">
          <h1>Contact list</h1>
          <section className="content-block">
            <ContactList
              contacts={this.state.contacts}
              onDelete={this.deleteContact}
              onEditMode={this.handleEditMode}
              idOfItem={this.state.personData.id}
              onAddMode={this.handleAddMode}
            />
            <ContactForm
              personData={this.state.personData}
              formSubmitHandler={this.formSubmitHandler}
              onDelete={this.deleteContact}
            />
          </section>
        </article>
      </>
    );
  }
}

export default App;
