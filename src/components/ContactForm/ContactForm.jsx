import { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  state = {
    ...this.props.personData,
  };

  onInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  clearInput = (event) => {
    const inputSibling = event.target.parentNode.firstChild;
    this.setState({
      [inputSibling.id]: "",
    });
  };

  clearAllInputs = () => {
    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.formSubmitHandler(this.state);
  };

  onDeleteContact = () => {
    this.props.onDelete(this.state.id);
    this.clearAllInputs();
  };

  static getDerivedStateFromProps(props, state) {
    const { id, firstName, lastName, email, phone } = props.personData;
    if (state.id !== id) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      };
    }
    return null;
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="input-block">
          <div className="form-item">
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
            <span className="btn-clear" onClick={this.clearInput}>
              X
            </span>
          </div>
          <div className="form-item">
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={this.onInputChange}
            />
            <span className="btn-clear" onClick={this.clearInput}>
              X
            </span>
          </div>
          <div className="form-item">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <span className="btn-clear" onClick={this.clearInput}>
              X
            </span>
          </div>
          <div className="form-item">
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={this.state.phone}
              onChange={this.onInputChange}
            />
            <span className="btn-clear" onClick={this.clearInput}>
              X
            </span>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button
            type="button"
            className={this.props.personData.id ? "" : "hide"}
            onClick={this.onDeleteContact}
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
