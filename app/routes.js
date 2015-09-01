import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MeetupList from './view/meetup/MeetupList';
import MeetupDetail from './view/meetup/MeetupDetail';
import About from './view/About';
import Nav from './view/Nav';

export default (
  <Route component={Nav} path="/">
    <IndexRoute component={MeetupList} />
    <Route component={MeetupDetail} path="/meetup/:id" />
    <Route component={MeetupList} path="/geo/:coords" />
    <Route component={About} path="/about" />
  </Route>
);
