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

import Admin from './components/admin.react';
import Coordinator from './components/homeCoordinator.react';
import {Router, Route, Link, browserHistory} from 'react-router';

class PageNotFound extends React.Component {

    render() {
        return (
            <div>
                <h1>Page Not Found.</h1>

                <p>Go to <Link to="/home"> Home</Link>
                </p>
            </div>
        )
    }
};


var SessionExpired = React.createClass({
  getInitialState(){
    return( {
      type: this.props.params.type
    });
  },

  render() {

    var comp;
    if(this.state.type === "admin"){
      comp = (  <div>
        <h1>Access Denied.</h1>

        <p>Yuo don't have Permission to access this page.
            <Link to="/"> Login </Link>
        </p>
        </div> );
    }else if(this.state.type === "tokenexpire"){
        comp = (  <div>
              <h1>Session Expired.</h1>

              <p>Please
                  <Link to="/"> Login </Link>
              </p>
          </div> );
    }

      return (
        <div> {comp}</div>
      )
  }

});


var validateLogin = function(nextState, replace) {


        if (!localStorage.getItem('token') || localStorage.getItem('token') == "") {
            // browserHistory.push('/login');
            replace('/login');
            return false;

        }

        return true;

};

var validateadmin = function(nextState, replace) {

          console.log("Type: " +  localStorage.getItem('type'));
        // validateLogin(nextState, replace);
        if ( validateLogin(nextState, replace) && localStorage.getItem('type') != "admin" ) {
            // browserHistory.push('/login');
            replace('/invalid/admin');
            // return null;
        }

};

var validateCoordinator = function(nextState, replace) {

          console.log("Type: " +  localStorage.getItem('type'));
        // validateLogin(nextState, replace);
        if ( validateLogin(nextState, replace) && localStorage.getItem('type') != "coordinator" ) {
            // browserHistory.push('/login');
            replace('/invalid/admin');
            // return null;
        }

};

//<Route path="*" component={PageNotFound}/>
ReactDOM.render((
    <Router history={browserHistory}>

        <Route path="/" component={Login}></Route>
        <Route path="/admin" component={Admin} onEnter={validateadmin}></Route>
        <Route path="/coordinator/:userName/:token" component={Coordinator} onEnter={validateCoordinator}></Route>
        <Route path="/tab" component={Tab}></Route>
        <Route path="/home" component={Home} onEnter={validateLogin}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/invalid/:type" component={SessionExpired}></Route>
        <Route path="*" component={PageNotFound}/>

    </Router>
), document.getElementById('react-app'));
