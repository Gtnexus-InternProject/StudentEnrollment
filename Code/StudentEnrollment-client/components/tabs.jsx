/**
 * Created by hrajapaksha on 5/12/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import {Router, Route, Link, browserHistory} from 'react-router';

import {Panel, Tabs, Tab, Col} from 'react-bootstrap';
import PersonalD from './personalDetails.react'
import TimeTable from './timeTable.React';
import SubjectTabel from './tabel/subjectEnrollment'

module.exports = React.createClass({
    render() {

        // console.log("Check Data " + JSON.stringify(this.props.data));
        return (
            <div className="row">
                <div className="col-lg-12">
                    <Panel>
                        <Tabs id="student-tab" defaultActiveKey={1}>
                            <Tab  eventKey={1} title="Profile">
                                <h4>Student Profile</h4>

                                <div>
                                  <PersonalD data={this.props.data} updateData={this.props.updateData} userName={this.props.userName} token={this.props.token}/>
                                </div>
                                <h4>Time Table</h4>

                                <div><TimeTable userName={this.props.userName} token={this.props.token}/>
                                </div>
                            </Tab>
                            <Tab  eventKey={2} title="Subject">
                                <h4>Subject Profile</h4>
                                <SubjectTabel userName={this.props.userName} token={this.props.token}/>

                            </Tab>

                        </Tabs>
                    </Panel>
                </div>
            </div>
        )
    }
});
