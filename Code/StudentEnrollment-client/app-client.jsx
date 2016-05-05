// var JSX = require('node-jsx').install({
//     harmony: true
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
import Login from './components/login.react';
import Register from './components/registerPanel.react';
import {Router, Route, Link, browserHistory} from 'react-router';

// var React = require('react');
// var Hello = require('./components/hello.react');
// var ReactDOM = require('react-dom');
//
//ReactDOM.render(
//  <Login />,
//  document.getElementById('react-app')
//);


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
        <Route path="/" component={Login}>
        </Route>
        <Route path="/hello" component={Hello}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="*" component={PageNotFound}/>
    </Router>
), document.getElementById('react-app'));