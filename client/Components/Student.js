import React from 'react';

const Student = ({ student }) => {
  return (
    <div key={student.id} className='grid-item-student'>
      <img src={student.imageUrl} className='portrait' />
      <h2>{student.fullName}</h2>
      <p>Campus Name</p>
    </div>
  );
};

export default Student;
