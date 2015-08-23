import React from 'react';
import { Route } from 'react-router';
import MeetupList from './view/meetup/MeetupList';
import GeoButton from './view/GeoButton';
import About from './view/About';

export default (
  <Route name="app" component={MeetupList} path="/">
      <Route component={GeoButton} path="home" />
      <Route component={About} path="about" />
  </Route>
);
