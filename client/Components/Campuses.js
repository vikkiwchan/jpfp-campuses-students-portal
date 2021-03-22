import React from 'react';
import { connect } from 'react-redux';

const Campuses = ({ campuses }) => {
  return (
    <>
      <h1>All Campuses</h1>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div key={campus.id} className='grid-item-campus'>
            <div className='card'>
              <img src={campus.imageUrl} />
              <div>
                <h2>{campus.name}</h2>
                <p>number of students</p>
                <div className='edit-delete'>
                  <a>edit</a>
                  <button>delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(Campuses);
