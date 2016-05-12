import React from 'react';
import ReactDOM from 'react-dom';
import SubjectTabel from './tabel/AdminSubject';
import StudentTabel from './tabel/AdminStudent';
import CoordinatorTabel from './tabel/AdminCoordinator';
import 'purecss/build/pure.css';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

module.exports = React.createClass({
    // Render the component
    render: function() {

        return (
            <div>
              <CoordinatorTabel/>
              <SubjectTabel/>
              <StudentTabel/>
            </div>
        );

    }

});
