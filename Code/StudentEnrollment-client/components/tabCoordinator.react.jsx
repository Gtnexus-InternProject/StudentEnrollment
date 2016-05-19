/**
 * Created by hrajapaksha on 5/17/2016.
 */
/**
 * Created by hrajapaksha on 5/12/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import {Router, Route, Link, browserHistory} from 'react-router';

import {Panel,Tabs,Tab,Col,Row} from 'react-bootstrap';
import CoordinatorOverview from './coordinatorOverview.react'

import CoordinatorSubjectList from './coordinatorSubjectList.react'

module.exports = React.createClass({
        render(){

            return (
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <Tabs defaultActiveKey={1}>
                                <Tab eventKey={1} title="Overview">
                                    <h4>Overview</h4>

                                    <p><CoordinatorOverview userName={this.props.userName}
                                                            token={this.props.token}/></p>

                                </Tab>
                                <Tab eventKey={2} title="Students">
                                    <h4>Students list </h4>
                                    <p><CoordinatorSubjectList userName={this.props.userName}
                                                            token={this.props.token}/></p>
                                </Tab>

                                <Tab eventKey={3} title="Student Request">
                                    <h4>Student Requests </h4>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis
                                        nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute
                                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat
                                        nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                        qui
                                        officia
                                        deserunt mollit anim id est laborum.</p>
                                </Tab>

                            </Tabs>
                        </Panel>
                    </div>
                </div>
            )
        }
    }
);