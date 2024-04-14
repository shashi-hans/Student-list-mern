import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { fullURL } from '../util';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      rollno: '',
      showModal: false,
      modalMessage: '',
      modalVariant: 'success',
      errors: {
        name: '',
        email: '',
        rollno: '',
      }
    };
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  onChange = (e) => {
    const { name, value } = e.target;

    // Validate inputs and set error messages
    switch (name) {
      case 'name':
        this.setState(prevState => ({
          errors: { ...prevState.errors, name: /^[a-zA-Z ]+$/.test(value) ? '' : 'Incorrect Name' }
        }));
        break;
      case 'email':
        this.setState(prevState => ({
          errors: { ...prevState.errors, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address' }
        }));
        break;
      default:
        break;
    }

    // Update Student state
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };
    axios.post(fullURL, studentObject)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ showModal: true, modalMessage: "Profile Successfully Created", modalVariant: "success" });
        }
      })
      .catch((error) => {
        this.setState({ showModal: true, modalMessage: "Profile not Created due to Wrong or No data given", modalVariant: "danger" });
      });
    this.setState({ name: '', email: '', rollno: '', errors: { name: '', email: '', rollno: '' } });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChange} name="name" />
            {errors.name && <span className='error-message'>{errors.name}</span>}
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.onChange} name="email" />
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </Form.Group>
          <Form.Group controlId="RollNo">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="number" value={this.state.rollno} onChange={this.onChange} name="rollno" />
            {errors.rollno && <span className='error-message'>{errors.rollno}</span>}
          </Form.Group>
          <Button variant="success" size="lg" block="block" type="submit" className="mt-4">
            Add Student
          </Button>
        </Form>

        <Modal show={this.state.showModal} onHide={this.handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalVariant === 'success' ? 'Success' : 'Error'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
