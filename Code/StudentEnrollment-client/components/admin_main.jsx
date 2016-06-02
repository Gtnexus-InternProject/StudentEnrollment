import React from 'react';
import ReactDOM from 'react-dom';
import SubjectTabel from './tabel/AdminSubject';
import StudentTabel from './tabel/AdminStudent';
import CoordinatorTabel from './tabel/AdminCoordinator';

import {Panel, Col,ButtonGroup,Button,Nav,Navbar,NavItem,Badge} from 'react-bootstrap';

import SubjectEnrollment from './tabel/subjectEnrollment';
import SubjectApprove from './tabel/CoordinatorSubjectApprove';

import 'purecss/build/pure.css';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzMTE0MjcwLCJleHAiOjE0NjMyMDA2NzB9.X6DXvZ2sIMAogrhow7aaUXJEtFYFsLES5Cl7A0yNg3k';

const title1 = (
    <span>Coordinator List</span>

);

const title2 = (
    <span>Subject List</span>

);

const title3 = (
    <span>Student List</span>

);

module.exports = React.createClass({
            getInitialState() {

                    // console.log("Check Data " + JSON.stringify(this.props.data));
                    return {
                        coordinatorNotification: 0,
                        subjectTabelNotification: 0,
                        studentTabelNotification: 0
                    }

                    },
    getCoordinatorValue(){
        
    },
       getSubjectValue(){
        
    },
       getStudentValue(){
        
    },
                        
    render() {

        return (
            <div>
            <div>
            <Navbar className="inverse-navbar-form navbar-fixed-top">
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">Student Registration System: Admin Dashboard</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav> 
                  <NavItem eventKey={1} href="#CoordinatorTabel" >{title1} <Badge>{this.state.coordinatorNotification}</Badge></NavItem>
                  <NavItem eventKey={2} href="#SubjectTabel">{title2} <Badge>{this.state.subjectTabelNotification}</Badge></NavItem>
                  <NavItem eventKey={2} href="#StudentTabel">{title3} <Badge>{this.state.studentTabelNotification}</Badge></NavItem>
                  
                </Nav>
            </Navbar>
            </div>
          
            <div style={{paddingTop: 70}}>
     
            <Panel header={title1} id="CoordinatorTabel" bsStyle="primary">
                    <CoordinatorTabel/>
                </Panel>

                <Panel header={title2}  id="SubjectTabel" bsStyle="primary">
                    <SubjectTabel/>
                </Panel>
            
                <Panel header={title3}  id="StudentTabel" bsStyle="primary">
                    <StudentTabel/>
                </Panel>
            
            
</div>
            </div>
        );

    }

});
