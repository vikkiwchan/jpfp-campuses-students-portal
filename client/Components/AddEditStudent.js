import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from '../store/thunks/thunks';
import Button from '@material-ui/core/Button';

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
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    const {
      location: { pathname },
      match: {
        params: { studentId },
      },
      history,
      add,
      edit,
    } = this.props;
    if (pathname.includes('add')) {
      try {
        await add({ firstName, lastName, email, imageUrl, gpa }, history);
      } catch (err) {
        console.log(err.response.data.error);
        this.setState({ error: err.response.data.error.errors });
      }
    } else {
      edit(studentId, { firstName, lastName, email, imageUrl, gpa });
    }
  }

  render() {
    const { path } = this.props.match;
    const { handleInputChange, handleSubmit } = this;
    const { firstName, lastName, email, imageUrl, gpa, error } = this.state;
    return (
      <div className='component-container'>
        <h1>{path.includes('add') ? 'Add ' : 'Edit '}Student</h1>
        <form>
          {error !== '' &&
            error.map((error, idx) => (
              <div key={++idx}>
                <span className='warning'>{error.message}</span>
              </div>
            ))}
          <label htmlFor='firstName'>
            First Name&nbsp;
            {firstName === '' ? (
              <span className='warning'>Required Field</span>
            ) : (
              ''
            )}
          </label>
          <input
            name='firstName'
            type='text'
            value={firstName}
            onChange={handleInputChange}
          />
          <label htmlFor='lastName'>
            Last Name&nbsp;
            {lastName === '' ? (
              <span className='warning'>Required Field</span>
            ) : (
              ''
            )}
          </label>
          <input
            name='lastName'
            type='text'
            value={lastName}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>
            Email&nbsp;
            {email === '' ? (
              <span className='warning'>Required Field</span>
            ) : (
              ''
            )}
          </label>
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
        <button
          id='save-button'
          disabled={
            firstName === '' || lastName === '' || email === '' ? true : false
          }
          onClick={handleSubmit}
        >
          save
        </button>
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
