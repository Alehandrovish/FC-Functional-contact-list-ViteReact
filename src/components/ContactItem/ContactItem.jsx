import { Component } from "react";
import "./ContactItem.css";

class ContactItem extends Component {
  onContactDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };

  onEdit = () => {
    this.props.onEnterEditMode(this.props.contact);
  };

  render() {
    const { id, firstName, lastName } = this.props.contact;
    return (
      <div
        className={`content-item ${id === this.props.idOfItem ? " focus" : ""}`}
        onDoubleClick={this.onEdit}
      >
        <p>
          {firstName} {lastName}
        </p>
        <span className="btn-delete" onClick={this.onContactDelete}>
          X
        </span>
      </div>
    );
  }
}

export default ContactItem;
