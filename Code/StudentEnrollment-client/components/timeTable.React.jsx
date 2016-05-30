/**
 * Created by hrajapaksha on 5/16/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import request from 'superagent'
var nocache = require('superagent-no-cache');
import {Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Col,Table} from 'react-bootstrap';
import {Router, Route, Link, browserHistory} from 'react-router';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
module.exports = React.createClass({

        getInitialState: function () {
            // var data = [];

            return {
                moduleCode: '',
                moduleName: '',
                day: '',
                semester: '',
                timeSlot: '',
                data: []
            };
        },


        fetchData(callback){


            request
                .get('http://localhost:3000/users/student/' + this.props.userName + '/subjects/timeTable1')
                .set('Accept', 'application/json')
                .set('x-access-token', this.props.token)
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
                        var jsonObj = res.body;

                        var data = [];
                        for (var i = 0; i < jsonObj.length; i++) {
                            // console.log("data: " + jsonObj[i] );
                            // jsonObj[i].subjects.forEach(function(entry) {
                            //     console.log(entry);
                            // });

                            var row = {
                                moduleCode: jsonObj[i].moduleCode,
                                moduleName: jsonObj[i].moduleName,
                                semester: jsonObj[i].semester,
                                day: jsonObj[i].day,
                                timeSlot: jsonObj[i].timeSlot,
                            };
                                data.push(row);
                        }

                        // console.log("data: " + data);
                        console.log(data);

                        callback(data);

                    };
                });


        },
        componentWillMount(){

            this.fetchData(function (data) {
                this.setState({data: data});
                // console.log(dataSe);
            }.bind(this));

        },


        render()        {

            return (<div >

                    <BootstrapTable data={this.state.data} striped={true} hover={true} condensed={true}>
                        <TableHeaderColumn dataField="moduleCode" isKey={true}>Module Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="moduleName">Module Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="semester">Semester</TableHeaderColumn>
                        <TableHeaderColumn dataField="day">Day</TableHeaderColumn>
                        <TableHeaderColumn dataField="timeSlot">Time Slot</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
    }
);

