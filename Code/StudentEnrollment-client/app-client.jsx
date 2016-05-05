// var JSX = require('node-jsx').install({
//     harmony: true
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
import Login from './components/login.react';


// var React = require('react');
// var Hello = require('./components/hello.react');
// var ReactDOM = require('react-dom');

ReactDOM.render(
  <Login />,
  document.getElementById('react-app')
);
