import React from 'react';

const Campus = ({ campus }) => {
  return (
    <div key={campus.id} className='grid-item-campus'>
      <div className='card'>
        <img src={campus.imageUrl} />
        <div>
          <h2>{campus.name}</h2>
          <p>number of students</p>
          <div className='edit-delete'>
            <button>edit</button>
            <button>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campus;
