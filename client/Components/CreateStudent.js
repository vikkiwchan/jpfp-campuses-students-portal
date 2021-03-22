import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store/studentsReducer';

class CreateStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createStudent({ ...this.state }, this.props.history);
  }

  render() {
    console.log(this.props);
    const { handleInputChange, handleSubmit } = this;
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div id='add-student'>
        <h2>Add Student</h2>
        <form>
          <label htmlFor='firstName'>First Name</label>
          <input
            name='firstName'
            type='text'
            value={firstName}
            onChange={handleInputChange}
          />
          <label htmlFor='lasttName'>Last Name</label>
          <input
            name='lastName'
            type='text'
            value={lastName}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={handleInputChange}
          />
          <label htmlFor='gpa'>GPA</label>
          <input
            name='gpa'
            type='text'
            value={gpa}
            onChange={handleInputChange}
          />
          <label htmlFor='imageUrl'>Image URL</label>
          <input
            name='imageUrl'
            type='text'
            value={imageUrl}
            onChange={handleInputChange}
          />
        </form>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateStudent);
