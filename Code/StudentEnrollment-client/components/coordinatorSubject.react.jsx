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
            email: '',
            contactNumber: '',
            showModal: false,

            data: []
        };
    },


    close() {
        this.setState({showModal: false});
    },

    open() {
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
        return (
            <div>
                <div><Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add
                    Subject</Button></Col></div>
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
            </div>
        );
    }
});

// module.exports = SubjectTabelAdmin;
// module.exports = hello;
