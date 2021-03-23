import React from 'react';
import { Link } from 'react-router-dom';

const Campus = (props) => {
  const { campus } = props;
  return (
    <div className='card'>
      <img src={campus.imageUrl} />
      <div>
        <Link to={`/campuses/${campus.id}`} key={campus.id}>
          <h2>{campus.name}</h2>
        </Link>
        <p>
          {campus.students
            ? `Students (${campus.students.length})`
            : 'No students'}
        </p>
      </div>
    </div>
  );
};

export default Campus;
