import { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.css";

class ContactList extends Component {
  render() {
    return (
      <section className="contacts-block">
        <section className="contacts-list">
          {this.props.contacts.map((contact) => {
            return (
              <ContactItem
                key={contact.id}
                contact={contact}
                onDelete={this.props.onDelete}
                onEnterEditMode={this.props.onEditMode}
                idOfItem={this.props.idOfItem}
              />
            );
          })}
        </section>
        <button onClick={this.props.onAddMode}>New</button>
      </section>
    );
  }
}

export default ContactList;
