/**
 * Created by hrajapaksha on 5/19/2016.
 */
var React = require('react');
var request = require('superagent');
var nocache = require('superagent-no-cache');
import {Panel,Accordion, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col,Row} from 'react-bootstrap';

import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table'
import Accordiona from './accodion.react'

module.exports = React.createClass(
    {
        render(){
            return (
                <div>
                    <Col md={3}>
                    </Col>
                    <Col md={9}>
                        <Accordiona userName={this.props.userName} token={this.props.token}/>
                    </Col>
                </div>
            )
        }

    });