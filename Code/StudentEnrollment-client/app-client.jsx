import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
//import Login from './components/login.react';
import Register from './components/test';
import Modal from './components/modal.react'
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
        <Route path="/" component={Register}>
        </Route>
        <Route path="/modal" component={Modal}/>
        <Route path="/hello" component={Hello}/>
        <Route path="/register" component={Register}/>

        <Route path="*" component={PageNotFound}/>
    </Router>
), document.getElementById('react-app'));
