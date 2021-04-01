import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from '../store/thunks/thunks';

class AddEditStudent extends Component {
  constructor(props) {
    super(props);
    const {
      id,
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
    } = this.props.student;
    this.state = {
      firstName: id ? firstName : '',
      lastName: id ? lastName : '',
      email: id ? email : '',
      imageUrl: id ? imageUrl : '',
      gpa: id ? gpa : 0,
      error: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.student.id && this.props.student.id) {
      const { firstName, lastName, email, imageUrl, gpa } = this.props.student;
      this.setState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageUrl: imageUrl,
        gpa: gpa,
      });
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    //const {firstName, lastName, email, imageUrl, gpa} = this.state;
    if (this.props.location.pathname.includes('add')) {
      this.props.add(this.state, this.props.history);
    } else {
      this.props.edit(this.props.match.params.studentId, this.state);
    }
  }

  render() {
    const { handleInputChange, handleSubmit } = this;
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <h2>
          {this.props.match.path.includes('add') ? 'Add ' : 'Edit '}Student
        </h2>
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
        <button onClick={handleSubmit}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    student:
      state.students.find(
        (student) => student.id === otherProps.match.params.studentId * 1
      ) || {},
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    add: (student) => dispatch(createStudent(student, history)),
    edit: (id, student) => dispatch(updateStudent(id, student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStudent);
