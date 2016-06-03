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
import ErrorHandling from './Utils/ErrorHandling';

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
                        ErrorHandling.tokenErrorHandling(err.response);
                    }
                    else {
                        if (res == null) {
                            console.log("Empty");
                            return;
                        }
                        console.log("kskhdbcfjshfb "+JSON.stringify(res.body) );
                        console.log(' res.body.subject '+ JSON.stringify(res.body.subject))
                        console.log(' res.body.flname '+  JSON.stringify(res.body.flname))
                        // console.log(res.body);
                        var jsonObj = res.body.subject;
                        var coordi=res.body.flname;

                        var data = [];

                        var semesters = ["Semester 1", "Semester 2","Semester 3","Semester 4","Semester 5","Semester 6",  "Semester 7", "Semester 8",]
                        var days =[ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday",]
                        var timeSlots = [  "08.15-10.15", "10.30-12.30","13.15-15.15","15.30-17.30"]

                        for (var i = 0; i < jsonObj.length; i++) {
                            console.log(i)
                             var coor=coordi[i].firstName + " " + coordi[i].lastName;

                            var row = {
                                moduleCode: jsonObj[i].moduleCode,
                                moduleName: jsonObj[i].moduleName,
                                coordinator:coor,
                                semester: semesters[jsonObj[i].semester] ,
                                day:days[jsonObj[i].day] ,
                                timeSlot: timeSlots[jsonObj[i].timeSlot],
                            };
                                data.push(row);
                        }

                        // console.log("data: " + data);
                        console.log(data);

                        callback(data);

                    };
                }.bind(this));


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
                        <TableHeaderColumn dataField="coordinator">Coordinator</TableHeaderColumn>
                        <TableHeaderColumn dataField="semester">Semester</TableHeaderColumn>
                        <TableHeaderColumn dataField="day">Day</TableHeaderColumn>
                        <TableHeaderColumn dataField="timeSlot">Time Slot</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
    }
);
