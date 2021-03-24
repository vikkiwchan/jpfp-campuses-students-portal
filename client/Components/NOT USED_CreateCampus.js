import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../store/campusesReducer';

class CreateCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
      imageUrl: '',
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
    this.props.createCampus({ ...this.state }, this.props.history);
  }

  render() {
    // console.log('Create campus', this.props);
    const { handleInputChange, handleSubmit } = this;
    const { name, address, description, imageUrl } = this.state;
    return (
      <div>
        <h2>Add Campus</h2>
        <form>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={handleInputChange}
          />
          <label htmlFor='address'>Address</label>
          <input
            name='address'
            type='text'
            value={address}
            onChange={handleInputChange}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            rows='5'
            value={description}
            onChange={handleInputChange}
          />
          <label htmlFor='imageUrl'>Image Url</label>
          <input
            name='imageUrl'
            type='text'
            value={imageUrl}
            onChange={handleInputChange}
          />
        </form>
        <button id='submit-button' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateCampus);
