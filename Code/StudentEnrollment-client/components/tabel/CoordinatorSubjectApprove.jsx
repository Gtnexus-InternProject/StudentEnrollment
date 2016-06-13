import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Form} from 'react-bootstrap';
import './react-bootstrap-table.min.css';

var findIndex = require('lodash/findIndex');
var removeArray = require('lodash/remove');
var sortByArray = require('lodash/sortBy');

var request = require('superagent');
var nocache = require('superagent-no-cache');
import ErrorHandling from '../Utils/ErrorHandling';
// import token from '../../config';

module.exports = React.createClass({

    selectedRows: [],
    fetchData: function(callback) {

        request.get('http://localhost:3000/users/student/state'). //
        set('Accept', 'application/json').accept('application/json'). //
        set('x-access-token', this.state.token). //
        use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {

                var jsonObj = res.body;
                // console.log("data: " + JSON.stringify(jsonObj));
                var data = [];
                var moduleCodeArray = [];
                for (var i = 0; i < jsonObj.length; i++) {
                    // console.log("data: " + jsonObj[i] );

                    for (var k = 0; k < jsonObj[i].subjects.length; k++) {
                        if (jsonObj[i].subjects[k].state == 0) {
                            var row = {

                                userName: jsonObj[i].userName || "",
                                firstName: jsonObj[i].firstName || "",
                                lastName: jsonObj[i].lastName || "",
                                email: jsonObj[i].email || "",
                                adddress: jsonObj[i].adddress || "",
                                contactNumber: jsonObj[i].contactNumber || "",

                                moduleCode: jsonObj[i].subjects[k].moduleCode || "",
                                moduleName: '',
                                id: i + '.' + k
                            };

                            data.push(row);
                            moduleCodeArray.push(jsonObj[i].subjects[k].moduleCode);
                        }

                    }

                }

                // console.log("Empty" + JSON.stringify(data));
                // console.log("Empty" + moduleCodeArray );

                request.get('http://localhost:3000/subjects/' + moduleCodeArray + '/array'). //
                set('Accept', 'application/json'). //
                accept('application/json'). //
                set('x-access-token', this.state.token). //
                use(nocache). // Prevents caching of *only* this request
                end(function(err, res) {
                    if (!err) {

                        if (res == null) {
                            console.log("Empty");
                            return;
                        }

                        var jsonObj = res.body;
                        // console.log("data: " + JSON.stringify(jsonObj));
                        var associateArray = [];
                        for (var i = 0; i < jsonObj.length; i++) {
                            // if (associateArray[jsonObj[i].moduleCode]) {
                            associateArray[jsonObj[i].moduleCode] = jsonObj[i].moduleName;
                            // }
                        }

                        // console.log("data: " + associateArray );
                        data = data.map(function(user, index) {
                            // console.log("user " + user);
                            user.moduleName = associateArray[user.moduleCode] || "";

                            return user;
                        });

                        // console.log("data: " + JSON.stringify(data) );

                        request.get('http://localhost:3000/users/coordinator/' + localStorage.getItem('user') + '/subjects'). //
                        set('Accept', 'application/json'). //
                        accept('application/json'). //
                        set('x-access-token', this.state.token). //
                        use(nocache). // Prevents caching of *only* this request
                        end(function(err, res) {
                            if (!err) {

                                if (res == null) {
                                    console.log("Empty");
                                    return;
                                }
                                // console.log("Modules check: " + JSON.parse(res) );
                                // console.log("Modules check: " + JSON.parse(res.body) );
                                var subjectsCoordinator = res.body.subjects;
                                // console.log("Modules check: " + subjectsCoordinator );
                                var subjectAssociative = [];

                                for (var i = 0; i < subjectsCoordinator.length; i++) {
                                    // if (associateArray[jsonObj[i].moduleCode]) {
                                    subjectAssociative[subjectsCoordinator[i]] = subjectsCoordinator[i];
                                    // }
                                }


                                var remove = removeArray(data, function(o) {
                                    return subjectAssociative[o.moduleCode] ? false : true;
                                });

                                callback(data);

                            } else {
                                console.log(err);
                                ErrorHandling.tokenErrorHandling(err.response);
                            }

                            // console.log(JSON.parse(res.text));
                        });

                    } else {
                        console.log(err);
                        ErrorHandling.tokenErrorHandling(err.response);
                    }

                    // console.log(JSON.parse(res.text));
                }.bind(this));

            } else {
                console.log(err);
                ErrorHandling.tokenErrorHandling(err.response);
            }

            // console.log(JSON.parse(res.text));
        }.bind(this));
    },
    componentWillMount: function() {

        this.fetchData(function(dataSe) {
            this.setState({data: dataSe});
            // console.log(dataSe );
        }.bind(this));
        //var data = this.getData();

    },
    getInitialState() {
        return {token: localStorage.getItem('token'), data: []};
    },
    onRowSelect(row, isSelected) {

        // console.log("selected: " + isSelected)
        if (isSelected) {
            this.selectedRows.push(row);
            // console.log("Added" + JSON.stringify(row));
        } else {
            var remove = removeArray(this.selectedRows, function(o) {
                return o.id == row.id;
            });
            // console.log("Removed" + JSON.stringify(remove));
        }
        // var index = findIndex(this.selectedRows, { 'id' : row.id } );
        // this.selectedRows.push(row);
    },

    onSelectAll(isSelected, data) {
        console.log("is select all: " + isSelected);
        if (isSelected) {
            this.selectedRows.push(data);
            // console.log("Added" + JSON.stringify(data));
        } else {
            this.selectedRows = [];
            // console.log("Removed" + JSON.stringify(data));
        }
    },

    accept(event) {
      // alert("event" + event);
      //       event.preventDefault();
      // alert("event" + JSON.stringify(event));

      // console.log("event" + event);
      // console.log("event" + JSON.stringify(event));
        // console.log("Selected data" + JSON.stringify(this.selectedRows));

        var userNameArray = [],
            moduleCodeArray = [],
            send = [];

        // if (userNameArray != null && moduleCodeArray != null) {
        //     console.log("Selected data 1" + JSON.stringify(userNameArray));
        //     console.log("Selected data 2" + JSON.stringify(moduleCodeArray));
        // }
        this.selectedRows = sortByArray(this.selectedRows, 'userName');
        // console.log("Selected data 3" + JSON.stringify(this.selectedRows));
        for (var i = 0; i < this.selectedRows.length; i++) {
            userNameArray.push(this.selectedRows[i].userName);
            moduleCodeArray.push(this.selectedRows[i].moduleCode);
            // console.log("Selected data" + JSON.stringify(userNameArray) );
            // console.log("Selected data" + JSON.stringify(moduleCodeArray) );
        }
        // send = send.map(function (o) {
        //
        // })
        send = {
            userName: userNameArray,
            moduleCode: moduleCodeArray,
            state: 1
        };

        request.put('http://localhost:3000/users/accept'). //
        set('Accept', 'application/json'). //
        accept('application/json'). //
        send(send). //
        set('x-access-token', this.state.token). //
        use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {
              ErrorHandling.tokenErrorHandling(err.response);
            } else {
                console.log(err);
                for (var i = 0; i < userNameArray.length; i++) {
                  var remove = removeArray(this.state.data, function(o) {
                      return o.userName == userNameArray[i];
                  });
                }

                this.setState({data:this.state.data});


            }

            // console.log(JSON.parse(res.text));
        }.bind(this));
        // send.moduleCode = moduleCodeArray;
        // console.log("Selected data 4" + JSON.stringify(send));

        // userNameArray = [],
        // moduleCodeArray = [],
        // send = [];

    },
    decline(event) {

        var userNameArray = [],
            moduleCodeArray = [],
            send = [];

        // if (userNameArray != null && moduleCodeArray != null) {
        //     console.log("Selected data 1" + JSON.stringify(userNameArray));
        //     console.log("Selected data 2" + JSON.stringify(moduleCodeArray));
        // }
        this.selectedRows = sortByArray(this.selectedRows, 'userName');
        // console.log("Selected data 3" + JSON.stringify(this.selectedRows));
        for (var i = 0; i < this.selectedRows.length; i++) {
            userNameArray.push(this.selectedRows[i].userName);
            moduleCodeArray.push(this.selectedRows[i].moduleCode);
            // console.log("Selected data" + JSON.stringify(userNameArray) );
            // console.log("Selected data" + JSON.stringify(moduleCodeArray) );
        }
        // send = send.map(function (o) {
        //
        // })
        send = {
            userName: userNameArray,
            moduleCode: moduleCodeArray,
            state: 2
        };

        request.put('http://localhost:3000/users/decline'). //
        set('Accept', 'application/json'). //
        accept('application/json'). //
        send(send). //
        set('x-access-token', this.state.token). //
        use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {
              ErrorHandling.tokenErrorHandling(err.response);
            } else {
                console.log(err);
                for (var i = 0; i < userNameArray.length; i++) {
                  var remove = removeArray(this.state.data, function(o) {
                      return o.userName == userNameArray[i];
                  });
                }

                this.setState({data:this.state.data});
            }

            // console.log(JSON.parse(res.text));
        }.bind(this));

    },

    // Render the component
    render: function() {

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll
        };

        // hidden={true}
        return (
            <div>

                <BootstrapTable data={this.state.data} selectRow={selectRowProp} height='400'>
                    <TableHeaderColumn dataField="id" isKey={true} hidden={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="userName">User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="firstName">First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="contactNumber">Contact Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="moduleCode">Module Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="moduleName">Module Name</TableHeaderColumn>
                </BootstrapTable>
                <Button bsStyle="success" onClick={this.accept}  >Accept</Button>
                <Button bsStyle="danger" onClick={this.decline}   >Decline</Button>

            </div>
        );

    }

});
