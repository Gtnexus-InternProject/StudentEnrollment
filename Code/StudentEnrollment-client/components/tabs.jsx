/**
 * Created by hrajapaksha on 5/12/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import {Router, Route, Link, browserHistory} from 'react-router';

import {Panel,Tabs,Tab,Col} from 'react-bootstrap';
import PersonalD from './personalDetails.react'
import SubjectTabel from './tabel/subjectEnrollment'

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
                                </Tab>
                                <Tab eventKey={2} title="Subject">
                                    <h4>Subject Profile</h4>
                                    <SubjectTabel />

                                </Tab>

                            </Tabs>
                        </Panel>
                    </div>
                </div>
            )
        }
    }
);
