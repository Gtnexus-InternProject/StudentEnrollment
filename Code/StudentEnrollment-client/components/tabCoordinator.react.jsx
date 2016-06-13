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

var request = require('superagent');

import SubjectApprove from './tabel/CoordinatorSubjectApprove';


import CoordinatorSubjectList from './coordinatorSubjectList.react'
var count =[];
module.exports = React.createClass({

        getInitialState: function () {
            return {
                moduleCode: '',
                moduleName: '',
                data: [],
                count: []
            };
        },

        fetchData(callback){


            request
                .get('http://localhost:3000/users/coordinator/' + this.props.userName + '/subjects/timeTable1')
                //get('http://localhost:3000/subjects/moduleDetails/')
                .set('Accept', 'application/json')
                .set('x-access-token', this.props.token)
                .end(function (err, res) {
                    if (!err) {
                        if (res == null) {
                            console.log("Empty");
                            return;
                        }
                         console.log("timetable"+ res.body);
                        var jsonObj = res.body.subject;
                        //console.log(jsonObj);
                        var csv1 = [];
                        for (var i = 0; i < jsonObj.length; i++) {
                            csv1.push(jsonObj[i].moduleCode);
                        }
                        console.log(csv1);


                        request
                            .get('http://localhost:3000/subjects/moduleDetails/' + csv1)
                            .set('Accept', 'application/json')
                            .set('x-access-token', this.props.token)

                            .end(function (err, res) {
                                if (err) {
                                    console.log(err);
                                    ErrorHandling.tokenErrorHandling(err.response);
                                }
                                else {
                                    if (res == null) {
                                        console.log("Empty");
                                        return;
                                    }
                                     console.log( "jopbject "+ res.body);
                                    var jsonObj1 = res.body;
                                    console.log(jsonObj1);


                                    var data = [];

                                    for (var i = 0; i < jsonObj1.modules.length; i++) {
                                        if (jsonObj1.modules[i].status == 1) {
                                            var row = {
                                                count: jsonObj1.modules[i].count,
                                                moduleCode: jsonObj1.modules[i].moduleCode,
                                                moduleName: jsonObj1.modules[i].moduleName,
                                                semester: jsonObj1.modules[i].semester,
                                                day: jsonObj1.modules[i].day,
                                                timeSlot: jsonObj1.modules[i].timeSlot,
                                                description: jsonObj1.modules[i].description,

                                            };
                                            data.push(row);
                                            count.push(jsonObj1.modules[i].count)
                                        }

                                    }

                                    console.log(data);

                                    callback(data);


                                }
                            }
                        )


                    } else {
                        console.log(err);
                        ErrorHandling.tokenErrorHandling(err.response);
                    }
                    ;
                }.bind(this));
        },

        componentWillMount() {

            this.fetchData(function (dataSe) {
                this.setState({data: dataSe,
                count:count});
                console.log(this.state.data);
            }.bind(this));

        },



        render(){

            return (
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <Tabs id="coordinator" defaultActiveKey={1}>
                                <Tab eventKey={1} title="Overview">
                                    <h4>Overview</h4>

                                    <CoordinatorOverview userName={this.props.userName}
                                                            token={this.props.token} data={this.state.data} count={this.state.count} />

                                </Tab>
                                <Tab eventKey={2} title="Students" onEnter={this.onEnter}>
                                    <h4>Students list </h4>
                                    <CoordinatorSubjectList userName={this.props.userName}
                                                            token={this.props.token} data={this.state.data} count={this.state.count} />
                                </Tab>

                                <Tab eventKey={3} title="Student Request">
                                    <h4>Student Requests </h4>

                                      <SubjectApprove userName={this.props.userName}
                                                              token={this.props.token}/>
                                </Tab>

                            </Tabs>
                        </Panel>
                    </div>
                </div>
            )
        }
    }
);
