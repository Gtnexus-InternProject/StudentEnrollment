import React from 'react';
import ReactDOM from 'react-dom';
import SubjectTabel from './tabel/AdminSubject';
import StudentTabel from './tabel/AdminStudent';
import CoordinatorTabel from './tabel/AdminCoordinator';

import Header from './header.react'

import {Panel, Col} from 'react-bootstrap';



import 'purecss/build/pure.css';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzMTE0MjcwLCJleHAiOjE0NjMyMDA2NzB9.X6DXvZ2sIMAogrhow7aaUXJEtFYFsLES5Cl7A0yNg3k';

const title = (
    <span>Admin view</span>

);

module.exports = React.createClass({

    getInitialState() {

        return ({
            userName: localStorage.getItem('user' ),

            data: {},
            token: localStorage.getItem('token' )

        });
    },

    // Render the component
    render: function() {




            return (
            <div>
                <Col md={12}>
                    {  <Header userName={this.state.userName} /> || this.props.children}
                </Col><Col  md={12}>
                <Panel header={title} bsStyle="primary">
                    <CoordinatorTabel/>
                    <SubjectTabel/>
                    <StudentTabel/>
                </Panel>
            </Col>
            </div>
        );

    }

});
