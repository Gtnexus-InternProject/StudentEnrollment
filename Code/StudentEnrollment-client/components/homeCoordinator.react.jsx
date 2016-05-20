/**
 * Created by hrajapaksha on 5/17/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

import Header from './header.react'
import TabCoord from './tabCoordinator.react'
//import Profile from './profileView.react'
import {Col} from 'react-bootstrap'
import {Router, Route, Link, browserHistory} from 'react-router';

module.exports = React.createClass({
    getInitialState() {
        if(!this.props.params.token || this.props.params.token == null){
            browserHistory.push('/login');
        }
        return ({
            userName: this.props.params.userName,
            token: this.props.params.token
        });
    },

    render()
    {

        return (
            <div>
                <Col md={12}>
                    {  <Header userName={this.state.userName} /> || this.props.children}
                </Col>
                <Col md={12}>
                    { <TabCoord userName={this.state.userName} token={this.state.token}/> || this.props.children}
                </Col>

            </div>

        );
    }
});

