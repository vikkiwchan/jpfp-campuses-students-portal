import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import { fetchCampuses } from '../store/thunks/thunks';
import { connect } from 'react-redux';

const getPageCount = async (page) => {
  const { count } = (await axios.get(`/api/campuses?page=${page}`)).data;
  return Math.ceil(count / 10);
};

const Footer = ({ fetchCampuses }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(async () => {
    setCount(await getPageCount(page));
    fetchCampuses(page);
  });

  return (
    <div>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        shape='rounded'
        color='primary'
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampuses: (id) => dispatch(fetchCampuses(id)),
  };
};

export default connect(null, mapDispatchToProps)(Footer);
