// var JSX = require('node-jsx').install({
//     harmony: true
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';

import Admin from './components/admin.react';
import {Router, Route, Link, browserHistory} from 'react-router';

// var React = require('react');
// var Hello = require('./components/hello.react');
// var ReactDOM = require('react-dom');

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Hello}>

        </Route>
        <Route path="/admin" component={Admin} ></Route>

        <Route path="*" component={PageNotFound} />
    </Router>

), document.getElementById('react-app'));
