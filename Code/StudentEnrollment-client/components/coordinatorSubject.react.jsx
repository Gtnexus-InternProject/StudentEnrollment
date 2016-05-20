/**
 * Created by hrajapaksha on 5/19/2016.
 */

'use strict';

var React = require('react');
var request = require('superagent');
var nocache = require('superagent-no-cache');
import {Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';

import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table'


module.exports = React.createClass({


    getInitialState: function () {
        // var data = [];

        return {
            userName: '',
            firstName: '',
            lastName: '',
            userName1: '',
            firstName1: '',
            lastName1: '',
            email: '',
            contactNumber: '',
            showModal: false,
            data1:[],
            data: []
        };
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
                } else {
                    // alert('yay got ' + JSON.stringify(res.body));
                    console.log('yay got ' + JSON.stringify(res.body));

                    var jsonObj = res.body;
                    var data = [];
                    for (var i = 0; i < jsonObj.length; i++) {
                        var row = {
                            userName1: jsonObj[i].userName,
                            firstName1: jsonObj[i].firstName,
                            lastName1: jsonObj[i].lastName,


                        }
                        data.push(row);
                    }
                    ;


                    // console.log("data: " + data);
                    console.log(data);

                    callback(data);



                }
            });
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
            .get('http://localhost:3000/subjects/student/' + this.props.moduleCode)
            .set('Accept', 'application/json')
            .set('x-access-token', this.props.token)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    var jsonObj = res.body;
                    var data = [];
                    for (var i = 0; i < jsonObj.length; i++) {
                        var row = {
                            userName: jsonObj[i].userName,
                            firstName: jsonObj[i].firstName,
                            lastName: jsonObj[i].lastName,
                            email: jsonObj[i].email,
                            contactNumber: jsonObj[i].contactNumber,

                        }
                        data.push(row);
                    }
                    ;


                    // console.log("data: " + data);
                    console.log(data);

                    callback(data);

                }
            });
    },

    componentDidMount: function () {

        this.fetchData(function (dataSe) {
            this.setState({data: dataSe});
            // console.log(dataSe);
        }.bind(this));
        // console.log("Check 2");
        //var data = this.getData();

    },




    afterDeleteRow (data) {

        request
            .put('http://localhost:3000/subjects/delete/' + data)
            .set('x-access-token', this.props.token)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    // alert('Oh no! error');
                    console.log('Oh no! error' + err);
                } else {
                    // alert('yay got ' + JSON.stringify(res.body));
                    console.log('yay got ' + JSON.stringify(res.body));
                }
            });
    },

    afterSaveCell(row){
        console.log(row.moduleCode)
        request
            .put('http://localhost:3000/subjects/update/' + row.moduleCode)
            .send(row)
            .set('x-access-token', this.props.token)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {

                    console.log('Oh no! error' + err);
                } else {

                    console.log('yay got ' + JSON.stringify(res.body));
                }
            });
    },


    format(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    },

    onRowSelect(row, isSelected){
        console.log(row);
        console.log("selected: " + isSelected)
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

        };
        var cellEdit = {
            mode: "click",
            blurToSave: true,
            afterSaveCell: this.afterSaveCell
        };

        //fro the student add table
        var selectRowProp1 = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: onRowSelect,
            onSelectAll: onSelectAll
        };
        function onRowSelect(row, isSelected){
            console.log(row);
            console.log("selected: " + isSelected)
        }

        function onSelectAll(isSelected){
            console.log("is select all: " + isSelected);
        }

// stuednt add table

        return (
            <div>
                <div><Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add
                    Students</Button></Col></div>
                <h1>Subject List</h1>


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
                        //show={this.state.show}
                        //onHide={close}
                        //container={this}
                        aria-labelledby="contained-modal-title"
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Add Students</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>

                                <BootstrapTable data={this.state.data1}
                                                selectRow={selectRowProp1}
                                                search={true}
                                                pagination={true}
                                    >
                                    <TableHeaderColumn dataField="userName1" isKey={true}>Username</TableHeaderColumn>
                                    <TableHeaderColumn dataField="firstName1">First Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="lastName1">Last Name</TableHeaderColumn>
                                </BootstrapTable>

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

// module.exports = SubjectTabelAdmin;
// module.exports = hello;
