import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');
import Hello from './hello.react'
import Register from './registerPanel.react'
import Header from './header.react'
import {Col} from 'react-bootstrap'

module.exports = React.createClass({
  // Render the component
  render: function () {

    return (

      <div>
        <Col md={12}>{this.props.children || <Header />}</Col>
        <Col md={2}>

          {this.props.children || <Hello />}
        </Col>
        <Col md={10}>
          {this.props.children || <Register />}
        </Col>
      </div>

    );

  }

});

