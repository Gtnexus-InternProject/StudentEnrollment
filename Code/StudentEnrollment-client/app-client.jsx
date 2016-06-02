// var JSX = require('node-jsx').install({
//     harmony: true
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.react';
import Home from './components/home.react';
import Login from './components/login.react';
import Register from './components/registerPanel.react';
import AAAA from './components/coordinatorSubjectList.react';
    import ImageUpload from './components/profilePicture.react'

import Tab from './components/tabs';

import Admin from './components/admin_main';
import Coordinator from './components/homeCoordinator.react';
import {Router, Route, Link, browserHistory} from 'react-router';

class PageNotFound extends React.Component {

    render() {
        return (
            <div>
                <h1>Page Not Found.</h1>

                <p>Go to
                    <Link to="/">
                        Home Page</Link>
                </p>
            </div>
        )
    }
}

var validateLogin = function(nextState, replace) {


        if (!localStorage.getItem('token') || localStorage.getItem('token') == "") {
            // browserHistory.push('/login');
            replace('/login');
            // return null;
        }

};

//<Route path="*" component={PageNotFound}/>
ReactDOM.render((
    <Router history={browserHistory}>

        <Route path="/" component={Login}></Route>
        <Route path="/admin" component={Admin} onEnter={validateLogin}></Route>
        <Route path="/coordinator/:userName/:token" component={Coordinator} onEnter={validateLogin}></Route>
        <Route path="/tab" component={Tab}></Route>
        <Route path="/home" component={Home} onEnter={validateLogin}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="*" component={PageNotFound}/>

    </Router>
), document.getElementById('react-app'));
