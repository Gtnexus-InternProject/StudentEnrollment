import React from 'react';
import ReactDOM from 'react-dom';
import SubjectTabel from './tabel/AdminSubject';
import StudentTabel from './tabel/AdminStudent';
import CoordinatorTabel from './tabel/AdminCoordinator';

import {
    Panel, Col, ButtonGroup, Button, Nav, Navbar, NavItem, Badge
}
from 'react-bootstrap';

import SubjectEnrollment from './tabel/subjectEnrollment';
import SubjectApprove from './tabel/CoordinatorSubjectApprove';

import 'purecss/build/pure.css';


import request from 'superagent';

import {
    Router, Route, Link, browserHistory
}
from 'react-router';
//import Img from './profilePicture.react';
import ErrorHandling from './Utils/ErrorHandling';



// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzMTE0MjcwLCJleHAiOjE0NjMyMDA2NzB9.X6DXvZ2sIMAogrhow7aaUXJEtFYFsLES5Cl7A0yNg3k';

const title1 = ( < span > Coordinator List < /span>

);

const title2 = ( < span > Subject List < /span>

);

const title3 = ( < span > Student List < /span>

);
///:type/:meta?
module.exports = React.createClass({
    componentWillMount() {
            this.setState({
                token: localStorage.getItem('token')
            });
        
        this.getSubjectValue(function (len) {
                this.setState({
                    subjectTabelNotification: len
                });

            }.bind(this));
        this.getCoordinatorValue(function (len) {
                this.setState({
                    coordinatorNotification: len
                });

            }.bind(this));
        this.getStudentValue(function (len) {
                this.setState({
                    studentTabelNotification: len
                });

            }.bind(this));

        
        

        },
        getInitialState() {
            return {
                token: localStorage.getItem('token')

            }

        },
        logout(event) {
            localStorage.removeItem('token');
            localStorage.removeItem('type');
            localStorage.removeItem('user');
        },
        getSubjectValue(callback) {
            request.get('http://localhost:3000/subjects/all/')
                .set('Accept', 'application/json')
                .set('x-access-token', this.state.token)
                .end(function (err, res) {
                    if (err) {
                        ErrorHandling.tokenErrorHandling(err.response);
                    } else {
                        callback(res.body.length);
                    }
                }.bind(this));
        },
    getCoordinatorValue(callback) {
            request.get('http://localhost:3000/users/coordinator/')
                .set('Accept', 'application/json')
                .set('x-access-token', this.state.token)
                .end(function (err, res) {
                    if (err) {
                        ErrorHandling.tokenErrorHandling(err.response);
                    } else {
                        callback(res.body.length);
                    }
                }.bind(this));
        },
    getStudentValue(callback) {
            request.get('http://localhost:3000/users/student/')
                .set('Accept', 'application/json')
                .set('x-access-token', this.state.token)
                .end(function (err, res) {
                    if (err) {
                        ErrorHandling.tokenErrorHandling(err.response);
                    } else {
                        callback(res.body.length);
                    }
                }.bind(this));
        },
    


        render() {

            return ( < div >
                < div >
                < Navbar className = "inverse-navbar-form navbar-fixed-top" >
                < Navbar.Header >
                < Navbar.Brand >
                < a href = "#" > Student Registration System: Admin Dashboard < /a> < /Navbar.Brand > < /Navbar.Header> < Nav > < NavItem eventKey = {
                1
            }
            href = "#CoordinatorTabel" > {
                    title1
                } < Badge > {
                    this.state.coordinatorNotification
                } < /Badge></NavItem >
                < NavItem eventKey = {
                    2
                }
            href = "#SubjectTabel" > {
                    title2
                } < Badge > {
                    this.state.subjectTabelNotification
                } < /Badge></NavItem >
                < NavItem eventKey = {
                    2
                }
            href = "#StudentTabel" > {
                    title3
                } < Badge > {
                    this.state.studentTabelNotification
                } < /Badge></NavItem >
                < Nav pullRight >
                < NavItem onClick = {
                    this.logout
                }
            href = "/login" > Logout < /NavItem> < /Nav >

                < /Nav> < /Navbar > < /div>

            < div style = {
                    {
                        paddingTop: 70
                    }
                } >

                < Panel header = {
                    title1
                }
            id = "CoordinatorTabel"
            bsStyle = "primary" >
                < CoordinatorTabel / >
                < /Panel>

            < Panel header = {
                title2
            }
            id = "SubjectTabel"
            bsStyle = "primary" >
                < SubjectTabel / >
                < /Panel>

            < Panel header = {
                title3
            }
            id = "StudentTabel"
            bsStyle = "primary" >
                < StudentTabel / >
                < /Panel>


            < /div> < /div >
        );

}

});
