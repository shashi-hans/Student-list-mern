import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { fullURL } from '../util';

export default class EditStudent extends Component {
  constructor(props) {
    super(props)
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }
  componentDidMount() {
    axios.get(`${fullURL}/${this.props.match.params.id}`)
      .then(res => {        
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }
  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }
  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };
    axios.put(`${fullURL}/${this.props.match.params.id}`, studentObject)
      .then((res) => {
        if (res.status === 200) {
          console.log('Student successfully updated')
          window.location.href = '/student-list';// Redirect to Student List page
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label >Name</Form.Label>
          <Form.Control className="Form-box" type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control className="Form-box" type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control className="Form-box" type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}