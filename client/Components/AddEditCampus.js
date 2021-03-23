import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../store/campusesReducer';
import { updateCampus } from '../store/campusesReducer';

class AddEditCampus extends Component {
  constructor(props) {
    super(props);
    const { id, name, address, description, imageUrl } = this.props.campus;
    this.state = {
      name: id ? name : '',
      address: id ? address : '',
      description: id ? description : '',
      imageUrl: id ? imageUrl : '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.campus.id && this.props.campus.id) {
      const { name, address, description, imageUrl } = this.props.campus;
      this.setState({
        name: name,
        address: address,
        description: description,
        imageUrl: imageUrl,
      });
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.location.pathname.includes('add')) {
      this.props.create(this.state);
    } else {
      this.props.update(this.props.match.params.campusId, this.state);
    }
  }

  render() {
    const pathname = this.props.location.pathname;
    const { handleInputChange, handleSubmit } = this;
    const { name, address, description, imageUrl } = this.state;
    return (
      <div>
        <h2>
          {pathname.includes('add') ? 'Add ' : 'Edit '}
          Campus
        </h2>
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
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const campus =
    state.campuses.find(
      (campus) => campus.id === otherProps.match.params.campusId * 1
    ) || {};
  return { campus };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (campus) => dispatch(createCampus(campus, history)),
    update: (id, campus) => dispatch(updateCampus(id, campus, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCampus);
