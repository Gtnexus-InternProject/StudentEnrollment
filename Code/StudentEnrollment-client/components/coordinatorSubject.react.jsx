/**
 * Created by hrajapaksha on 5/19/2016.
 */

'use strict';

var React = require('react');
var request = require('superagent');
var nocache = require('superagent-no-cache');
var removeArray = require('lodash/remove');
import {Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';

import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table'
import './../node_modules/react-bootstrap-table/css/react-bootstrap-table.min.css'

var addstd = [];
var addstd2 = [];

import ErrorHandling from './Utils/ErrorHandling';


module.exports = React.createClass({


    getInitialState: function () {
        // var data = [];

        return {

            showModal: false,
            data1: [],
            data: [],
            compArry: [],
            count:'',
            moduleCode:''


        };
    },

    componentWillReceiveProps(newProps){
        this.setState({moduleCode: newProps.moduleCode,
        count:newProps.count});
        console.log('+++++++' +JSON.stringify(this.state.moduleCode));
        console.log('+++++++' + newProps.count );

    },


    getAllStudents(callback){
        //alert('eee');
        request
            .get('http://localhost:3000/users/student')
            .set('x-access-token', this.props.token)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    // alert('Oh no! error');
                    console.log('Oh no! error' + err);
                    ErrorHandling.tokenErrorHandling(err.response);
                } else {

                    var jsonObj = res.body;
                    var data = [];
                    console.log("fggfccg " + this.state.compArry);

                    for (var i = 0; i < jsonObj.length; i++) {
                        if (this.state.compArry.indexOf(jsonObj[i].userName) != -1) {
                            console.log('notselecterd')

                        }
                        else {
                            console.log('Selected');
                            var row = {
                                userName: jsonObj[i].userName,
                                firstName: jsonObj[i].firstName,
                                lastName: jsonObj[i].lastName,
                                email: jsonObj[i].email,
                                contactNumber: jsonObj[i].contactNumber,
                            }
                            data.push(row);
                        }
                    };
                    callback(data);
                }
            }.bind(this));
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.getAllStudents(function (dataSe) {
            this.setState({data1: dataSe});
            // console.log(dataSe);
        }.bind(this));
        this.setState({showModal: true});
    },

    handleSubmit(data) {

        data.preventDefault();
    },

    fetchData(callback){
        var jsonObjSub;


        request
            .get('http://localhost:3000/subjects/student/' + this.props.moduleCode.moduleCode + '/per')
            .set('Accept', 'application/json')
            .set('x-access-token', this.props.token)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    ErrorHandling.tokenErrorHandling(err.response);
                }
                else {
                    var jsonObj = res.body;
                    var data = [];
                    var compArry = [];
                    for (var i = 0; i < jsonObj.length; i++) {
                        var row = {
                            userName: jsonObj[i].userName,
                            firstName: jsonObj[i].firstName,
                            lastName: jsonObj[i].lastName,
                            email: jsonObj[i].email,
                            contactNumber: jsonObj[i].contactNumber,

                        }
                        data.push(row);
                        compArry.push(row.userName);
                    }
                    ;
                    console.log(compArry);
                    callback(data, compArry);

                }
            });
    },

    componentDidMount: function () {

        this.fetchData(function (dataSe, datacompArry) {
            this.setState({
                    data: dataSe,
                    compArry: datacompArry
                }
            );


            // console.log(dataSe);
        }.bind(this)); },


    afterDeleteRow  (row) {
        //console.log(JSON.stringify(row));

        request
            .delete('http://localhost:3000/users/student/'+ row +'/subjects')
            .set('x-access-token', this.props.token)
            .set('Accept', 'application/json')
            .send({subjects:this.props.moduleCode.moduleCode})
            .end(function (err, res) {
                if (err || !res.ok) {
                    // alert('Oh no! error');
                    console.log('Oh no! error' + err);
                    ErrorHandling.tokenErrorHandling(err.response);
                } else {
                    // alert('yay got ' + JSON.stringify(res.body));
                    console.log('yay got ' + JSON.stringify(res.body));

                    var test= this.state.data;
                    var test2=this.state.compArry;

                    var remove = removeArray(test, function(o) {
                        return o.userName == row;
                    });
                    var removecomp = removeArray(test2, function(o) {
                        return o == row;
                    })
                    var cnt=this.state.count;
                    cnt--;
                    console.log("count"+ cnt);
                   this.setState({
                        data: test,
                        compArry: test2,
                        count:cnt
                    });
                    this.props.updateCount(this.state.count, this.props.i);
                    console.log("count"+ this.state.count);
                }
            }.bind(this));


    },

    format(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    },

    onRowSelect(row, isSelected){


        console.log(row);
    },


    onRowSelectAddStd(row, isSelected){

        if (isSelected) {
            addstd.push(row.userName);
            addstd2.push(row);

        } else {
            var remove = removeArray(addstd2, function(o) {
                return o.userName == row.userName;
            });
            var removeuserName = removeArray(addstd, function(o) {
                return o == row.userName;
            });

        }



        console.log('Size' + addstd);

    },


    onSelectAll(isSelected, data) {

        if (isSelected) {
            addstd.push(data.userName);
            addstd2.push(data);

        } else {
            addstd=[];
            addstd2=[];
        }


    },

    addStudent(event){
        event.preventDefault();
        // var cnt=this.state.count;
        for (var i = 0; i < addstd.length; i++) {

            request
                .put('http://localhost:3000/users/student/' + addstd[i] + '/subjectsSS')
                .send({subjects: {moduleCode: this.props.moduleCode.moduleCode, state: 1}})
                .set('x-access-token', this.props.token)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err || !res.ok) {
                        // alert('Oh no! error');
                        console.log('Oh no! error' + err);
                        ErrorHandling.tokenErrorHandling(err.response);
                    } else {
                        console.log('ok');
                        var cnt=this.state.count;
                        cnt++;

                        // if(i === addstd.length -1 ){


                          this.setState({
                              count:cnt
                          });
                          this.props.updateCount(this.state.count, this.props.i);

                        // }

                    }
                }.bind(this));
        }

        var tablelData = this.state.data.concat(addstd2);
        var comparry = this.state.compArry.concat(addstd);
        this.setState({
            
            data: tablelData,
            compArry: comparry
        });
        this.props.updateCount(this.state.count, this.props.i);
        console.log('rfvrvrvvrvr  ' + this.state.compArry);
        addstd = [];
        addstd2 = [];

    },


    render()
    {

        var selectRowProp = {
            mode: "radio",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: this.onRowSelect
        };


        var options = {
            afterDeleteRow: this.afterDeleteRow,
            onDeleteRow :this.onDeleteRow,

        };

        //fro the student add table
        var selectRowProp1 = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: this.onRowSelectAddStd,
            onSelectAll: this.onSelectAll
        };


        function onSelectAll(isSelected) {
            console.log("is select all: " + isSelected);
        }

// stuednt add table

        return (
            <div>
                <div><Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add
                    Students</Button></Col></div>
                <h1>Student List </h1>


                <BootstrapTable
                    data={this.state.data}
                    striped={true}
                    condensed={true}
                    pagination={true}
                    selectRow={selectRowProp}
                    deleteRow={true}
                    columnFilter={true}
                    search={true}
                    options={options}>

                    <TableHeaderColumn dataField="userName" isKey={true}>UserName</TableHeaderColumn>
                    <TableHeaderColumn dataField="firstName">First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="contactNumber">Contact Number</TableHeaderColumn>

                </BootstrapTable>

                <div className="modal-container">
                    <Modal
                        show={this.state.showModal}
                        onHide={this.close}
                        aria-labelledby="contained-modal-title"
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Add Students</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form onSubmit={this.addStudent}>
                                    <BootstrapTable data={this.state.data1}
                                                    selectRow={selectRowProp1}
                                                    onSelectAll= {this.onSelectAll}
                                                    search={true}
                                                    pagination={true}

                                        >
                                        <TableHeaderColumn dataField="userName"
                                                           isKey={true}>Username</TableHeaderColumn>
                                        <TableHeaderColumn dataField="firstName">First Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
                                    </BootstrapTable>


                                    <Button bsStyle="warning" type="submit" onClick={this.close}>
                                        Submit</Button>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>


                </div>


            </div>
        );
    }
});
