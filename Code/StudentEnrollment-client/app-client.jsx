// var JSX = require('node-jsx').install({
//     harmony: true
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
import Home from './components/home.react';
import Login from './components/login.react';
import Register from './components/registerPanel.react';

import Tab from './components/tabs';
import {Router, Route, Link, browserHistory} from 'react-router';


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
            <Route path="ab" component={PageNotFound}/>
        </Route>
        <Route path="/tab" component={Tab}></Route>
        <Route path="/home/:userName/:token" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="*" component={PageNotFound}/>
    </Router>
), document.getElementById('react-app'));