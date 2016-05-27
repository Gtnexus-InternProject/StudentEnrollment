import React from 'react';
import ReactDOM from 'react-dom';
import SubjectTabel from './tabel/AdminSubject';
import StudentTabel from './tabel/AdminStudent';
import CoordinatorTabel from './tabel/AdminCoordinator';

import {Panel, Col} from 'react-bootstrap';

import SubjectEnrollment from './tabel/subjectEnrollment';
import SubjectApprove from './tabel/CoordinatorSubjectApprove';

import 'purecss/build/pure.css';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzMTE0MjcwLCJleHAiOjE0NjMyMDA2NzB9.X6DXvZ2sIMAogrhow7aaUXJEtFYFsLES5Cl7A0yNg3k';

const title = (
    <span>Admin view</span>

);

module.exports = React.createClass({
    // Render the component
    render: function() {

        return (
            <div>

                <Panel header={title} bsStyle="primary">

                    <SubjectApprove/>
                    <SubjectEnrollment/>

                    <CoordinatorTabel/>
                    <SubjectTabel/>
                    <StudentTabel/>
                </Panel>
            </div>
        );

    }

});
