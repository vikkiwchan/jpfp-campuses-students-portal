import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../store/campusesReducer';
import { fetchStudents } from '../store/studentsReducer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';

class Main extends Component {
  componentDidMount() {
    this.props.loadCampuses();
    this.props.loadStudents();
  }
  render() {
    return (
      <Router>
        <div id='app'>
          <Nav />
          <Switch>
            <Route exact path='/campuses' component={Campuses} />
            <Route exact path='/students' component={Students} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    loadCampuses: () => dispatch(fetchCampuses()),
    loadStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
