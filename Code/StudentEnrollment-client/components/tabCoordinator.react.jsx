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

import CoordinatorSubjectList from './coordinatorSubjectList.react'

module.exports = React.createClass({

        getInitialState: function () {
            return {
                moduleCode: '',
                moduleName: '',
                data: []
            };
        },

        fetchData(callback){
            request
                .get('http://localhost:3000/users/coordinator/'+this.props.userName+'/subjects')
                .set('Accept', 'application/json')
                .set('x-access-token',this.props.token)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (res == null) {
                            console.log("Empty");
                            return;
                        }
                        // console.log(res.body);

                       var jsonObjSub = res.body.subjects;
                        console.log(jsonObjSub);
                        callback(jsonObjSub);
                    } ;
                });

        },

        oneEnter(){

            this.fetchData(function (dataSe) {
                this.setState({data: dataSe});
                console.log(this.state.data);
            }.bind(this));

        },

        componentWillMount() {

            this.fetchData(function (dataSe) {
                this.setState({data: dataSe});
                console.log(this.state.data);
            }.bind(this));

        },


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
                                <Tab eventKey={2} title="Students" onEnter={this.onEnter}>
                                    <h4>Students list </h4>
                                    <p><CoordinatorSubjectList userName={this.props.userName}
                                                            token={this.props.token} data={this.state.data}/></p>
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