import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import JourneyQCF2F from "../../components/journeys/JourneyQCF2F";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const journey={breadcrumb:[]};
  ReactDOM.render(<Router><JourneyQCF2F journey={journey}/></Router>, div);
});