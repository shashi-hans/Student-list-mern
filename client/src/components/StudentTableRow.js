import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { fullURL } from '../util';
export default class StudentTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }
    deleteStudent() {
        axios.delete(`${fullURL}/${this.props.obj._id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Student Profile successfully deleted!")
                    window.location.href = '/student-list';
                }
            }).catch((error) => {
                console.log(error)
            })
        // Redirect to Student List page
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollno}</td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent} size="sm" variant="danger" path="/student-list">Delete</Button>
                </td>
            </tr>
        );
    }
}