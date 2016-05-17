/**
 * Created by hrajapaksha on 5/12/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import {Router, Route, Link, browserHistory} from 'react-router';

import {Panel,Tabs,Tab,Col} from 'react-bootstrap';
import PersonalD from './personalDetails.react'
import TimeTable from './timeTable.React'

module.exports = React.createClass({
        render(){

            return (
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <Tabs defaultActiveKey={1}>
                                <Tab eventKey={1} title="Profile">
                                    <h4>Student Profile</h4>

                                    <p><PersonalD userName={this.props.userName} token={this.props.token}/> </p>
                                    <h4>Time Table</h4>

                                    <p><TimeTable userName={this.props.userName} token={this.props.token}/> </p>
                                </Tab>
                                <Tab eventKey={2} title="Subject">
                                    <h4>Subject Profile</h4>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                        nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
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