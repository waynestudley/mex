import React from 'react';
import ReactDOM from 'react-dom';

import PostcodeChecker from "../../components/broadband/PostcodeChecker";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const journey = {api:""}
  ReactDOM.render(<PostcodeChecker journey={journey}/>, div);
});