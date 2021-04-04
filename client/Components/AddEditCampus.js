import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from '../store/thunks/thunks';

class AddEditCampus extends Component {
  constructor(props) {
    super(props);
    const { id, name, address, description, imageUrl } = this.props.campus;
    this.state = {
      name: id ? name : '',
      address: id ? address : '',
      description: id ? description : '',
      imageUrl: id ? imageUrl : '',
      error: '',
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
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, address, description, imageUrl } = this.state;
    if (this.props.location.pathname.includes('add')) {
      try {
        await this.props.create({ name, address, description, imageUrl });
      } catch (err) {
        console.log(err.response.data.error);
        this.setState({ error: err.response.data.error.errors });
      }
    } else {
      this.props.update(this.props.match.params.campusId, this.state);
    }
  }

  render() {
    const { pathname } = this.props.location;
    const { handleInputChange, handleSubmit } = this;
    const { name, address, description, imageUrl, error } = this.state;
    return (
      <div>
        <h2>
          {pathname.includes('add') ? 'Add ' : 'Edit '}
          Campus
        </h2>
        <form>
          {error !== '' &&
            error.map((error, idx) => (
              <div key={++idx}>
                <span className='warning'>{error.message}</span>
              </div>
            ))}
          <label htmlFor='name'>
            Name&nbsp;
            {name === '' ? <span className='warning'>Required Field</span> : ''}
          </label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={handleInputChange}
          />
          <label htmlFor='address'>
            Address&nbsp;
            {address === '' ? (
              <span className='warning'>Required Field</span>
            ) : (
              ''
            )}
          </label>
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
        <button
          disabled={name === '' || address === '' ? true : false}
          id='submit-button'
          onClick={handleSubmit}
        >
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
