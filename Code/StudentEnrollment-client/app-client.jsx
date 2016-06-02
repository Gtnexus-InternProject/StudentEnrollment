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
                    <Link to="/home">
                        Home</Link>
                </p>
            </div>
        )
    }
};

var SessionExpired = React.createClass({
    getInitialState() {
        return ({type: this.props.params.type});
    },

    logout(event) {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('user');

    },

    render() {

        var comp;
        if (this.state.type === "admin") {
            comp = (
                <div>
                    <h1>Access Denied.</h1>

                    <p>Yuo don't have Permission to access this page.
                        <Link onClick={this.logout} to="/">
                            Login
                        </Link>
                    </p>
                </div>
            );
        } else if (this.state.type === "tokenexpire") {
            comp = (
                <div>
                    <h1>Session Expired.</h1>

                    <p>Please
                        <Link onClick={this.logout} to="/">
                            Login
                        </Link>
                    </p>
                </div>
            );
        }

        return (
            <div>
                {comp}</div>
        )
    }

});

var validateLogin = function(nextState, replace) {

    // console.log(JSON.stringify(nextState));
    if (!localStorage.getItem('token') || localStorage.getItem('token') == "") {
        // browserHistory.push('/login');
        if (nextState.routes[0].path === "/login") {
          return false;
        } else {
            replace('/login');
            return false;
        }

    }else{
      if (nextState.routes[0].path === "/login" || nextState.routes[0].path === "/") {
        if(localStorage.getItem('type') === "admin"){
          replace('/admin');
          return true;
        }else if(localStorage.getItem('type') === "coordinator"){
          replace('/coordinator');
          return true;
        }else if(localStorage.getItem('type') === "student"){
          replace('/home');
          return true;
        }
      }
      return true;
    }


};

var validateadmin = function(nextState, replace) {

    // console.log("Type: " +  localStorage.getItem('type'));
    // validateLogin(nextState, replace);
    if (validateLogin(nextState, replace) && localStorage.getItem('type') != "admin") {
        // browserHistory.push('/login');
        replace('/invalid/admin');
        // return null;
    }

};

var validateCoordinator = function(nextState, replace) {

    // console.log("Type: " +  localStorage.getItem('type'));
    // validateLogin(nextState, replace);
    if (validateLogin(nextState, replace) && localStorage.getItem('type') != "coordinator") {
        // browserHistory.push('/login');
        replace('/invalid/admin');
        // return null;
    }

};

var validateStudent = function(nextState, replace) {

    // console.log("Type: " +  localStorage.getItem('type'));
    // validateLogin(nextState, replace);
    if (validateLogin(nextState, replace) && localStorage.getItem('type') != "student") {
        // browserHistory.push('/login');
        replace('/invalid/admin');
        // return null;
    }

};

//<Route path="*" component={PageNotFound}/>
ReactDOM.render((
    <Router history={browserHistory}>

        <Route path="/" component={Login}  onEnter={validateLogin}></Route>
        <Route path="/admin" component={Admin} onEnter={validateadmin}></Route>
        <Route path="/coordinator" component={Coordinator} onEnter={validateCoordinator}></Route>
        <Route path="/home" component={Home} onEnter={validateStudent}></Route>
        <Route path="/login" component={Login}  onEnter={validateLogin} ></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/invalid/:type" component={SessionExpired}></Route>
        <Route path="*" component={PageNotFound}/>

    </Router>
), document.getElementById('react-app'));
