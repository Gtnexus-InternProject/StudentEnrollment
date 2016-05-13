import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

import Header from './header.react'
import Tab from './tabs'
import Profile from './profileView.react'
import {Col} from 'react-bootstrap'

module.exports = React.createClass({
    getInitialState() {
        return ({
            userName: this.props.params.userName,
            token: this.props.params.token
        });
    },
    //contextTypes: {
    //    token:  React.PropTypes.string
    //},



// Render the component
    render()
    {

        return (
            <div>
                <Col md={12}>
                    {  <Header userName={this.state.userName} /> || this.props.children}
                </Col>
                <Col md={3}>
                    {  <Profile userName={this.state.userName} token={this.state.token}/> || this.props.children}
                </Col>
                <Col md={9}>
                    { <Tab userName={this.state.userName} token={this.state.token}/> || this.props.children}
                </Col>
            </div>

        );
    }
});

