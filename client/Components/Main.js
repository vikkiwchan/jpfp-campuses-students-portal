import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../store/campusesReducer';
import { fetchStudents } from '../store/studentsReducer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import CampusesList from './CampusesList';
import SingleCampus from './SingleCampus';
import StudentsList from './StudentsList';
import SingleStudent from './SingleStudent';
import CreateCampus from './CreateCampus';
import CreateStudent from './CreateStudent';

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
            <Route exact path='/campuses' component={CampusesList} />
            <Route exact path='/campuses/:campusId' component={SingleCampus} />
            <Route exact path='/students' component={StudentsList} />
            <Route path='/students/:studentId' component={SingleStudent} />
            <Route path='/create-campus' component={CreateCampus} />
            <Route path='/create-student' component={CreateStudent} />
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
