import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
import Modal from './components/modal.react'
import Register from './components/registerPanel.react'
import Login from './components/login.react'

// var React = require('react');
// var Hello = require('./components/hello.react');
// var ReactDOM = require('react-dom');

ReactDOM.render(
  //<Login />,
    <Register />,
    //<Modal />,

  document.getElementById('react-app')
);
