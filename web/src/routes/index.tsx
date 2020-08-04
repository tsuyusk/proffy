import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/teachers-list" component={TeacherList} />
        <Route path="/teacher-subscription" component={TeacherForm} />
      </Switch>
    </Router>
  );
};

export default Routes;
