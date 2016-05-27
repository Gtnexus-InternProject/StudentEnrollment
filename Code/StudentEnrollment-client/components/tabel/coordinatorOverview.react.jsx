/**
 * Created by hrajapaksha on 5/17/2016.
 */
'use strict';

var React = require('react');
// var Fork = require('react-ghfork');

var FullTable = require('./full_table.jsx');
// var EditorsTable = require('./editors_table.jsx');
// var NestedTable = require('./nested_table.jsx');

// var readme = require('../README.md');

import '../../node_modules/purecss/build/pure.css';
import 'highlight.js/styles/github.css';
// import 'react-ghfork/gh-fork-ribbon.ie.css';
// import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import './main.css';
import './skylight.css';
// var highlight = require('./src/formatters/highlight');

var request = require('superagent');
var nocache = require('superagent-no-cache');
import {Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';


module.exports = React.createClass({
    displayName: 'App',

    style: {
        width: '30%',
        height: 'auto',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-130px',
        marginLeft: '-15%',
        backgroundColor: '#fff',
        borderRadius: ' 2px',
        zIndex: '100',
        padding: '10px',
        boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
    },

    getInitialState: function () {
        // var data = [];

        return {
            moduleCode: '',
            moduleName: '',
            day: '',
            semester: '',
            timeSlot: '',
            credits: '',
            description: '',
            status: '',
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
    handleChangeModuleCode: function (event) {
        this.setState({moduleCode: event.target.value});
    },
    handleChangeModuleName: function (event) {
        //if(this.state.password.trim().length>1){
        this.setState({moduleName: event.target.value});
    },


    handleChangeCredits: function (event) {
        this.setState({credits: event.target.value});
    },

    handleChangeDescription: function (event) {
        this.setState({description: event.target.value});
    },
    handleSelectSem: function (event) {
        this.setState({semester: event.target.value})
    },
    handleSelectDay: function (event) {
        this.setState({day: event.target.value});
    },
    handleSelectTimeSlt: function (event) {
        this.setState({timeSlot: event.target.value});
    },


    handleSubmit(data) {
        alert('ggg');
        data.preventDefault();
        var formAddSub = {
            moduleCode: this.state.moduleCode.trim(),
            moduleName: this.state.moduleName.trim(),
            credits: this.state.credits.trim(),
            semester: this.state.semester.trim(),
            day: this.state.day.trim(),
            timeSlot: this.state.timeSlot.trim(),
            description: this.state.description.trim(),

        }


        request.post('http://localhost:3000/subjects/subjectAdd')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.props.token)
            .send(formAddSub)
            .withCredentials()
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error');
                } else {
                    console.log('yay got ' + JSON.stringify(formAddSub));
                    //console.log('yay got ' + JSON.stringify(formAddSub));
                }

            });

        alert('ggg coordinator');
        //dataX.preventDefault();

        console.log(formAddSub.moduleCode);
        request.put('http://localhost:3000/users/coordinator/' + this.props.userName + '/subjectAdd')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.props.token)
            .send('{ "moduleCode" : ' + formAddSub.moduleCode + '}')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error to add it coordinator');
                } else {
                    console.log('yay got ');
                }
            })


    },


    fetchData(callback){


        request
            .get('http://localhost:3000/users/coordinator/' + this.props.userName + '/subjects/timeTable')
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
                            description: jsonObj[i].description,
                            status: jsonObj[i].status

                        };

                        data.push(row);
                    }

                    // console.log("data: " + data);
                    console.log(data);

                    callback(data);

                }
                ;


            });
    },


    // componentWillMount: function() {
    //
    //     this.fetchData(function(dataSe) {
    //         this.setState({data: dataSe});
    //         console.log(dataSe);
    //     }.bind(this));
    //     //var data = this.getData();
    //
    // },

    componentDidMount: function () {

        this.fetchData(function (dataSe) {
            this.setState({data: dataSe});
            // console.log(dataSe);
        }.bind(this));
        // console.log("Check 2");
        //var data = this.getData();

    },

    submitSub: function (data) {
        request
            .put('http://localhost:3000/subjects/update/' + data.moduleCode)
            .send(data)
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

    reamoveSub: function (data) {
        request
            .put('http://localhost:3000/subjects/delete/' + data.moduleCode)
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

    render()
    {

        var subjectCol = [

            {
                property: 'moduleCode',
                header: "Module Code"
            }, {
                property: 'moduleName',
                header: 'Module Name'
            }, {
                property: 'status',
                header: 'Status'
            }, {
                property: 'semester',
                header: 'Semester'
            }, {
                property: 'day',
                header: 'Day'
            }, {
                property: 'timeSlot',
                header: 'Time Slot'
            }, {
                property: 'description',
                header: 'Description'
            }

        ];

        var properties = {


            moduleName: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            EditTime: {
                type: 'object',
                "title": "Your age",
                properties: {
                    semester: {
                        enum: [
                            'semester 1', 'semester 2', 'semester 3', 'semester 4'
                        ],
                        enumNames: [
                            'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'
                        ]
                    },


                    day: {
                        enum: [
                            'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
                        ],
                        enumNames: [
                            'sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
                        ]

                    },


                    timeSlot: {
                        enum: [
                            '08.15-10.15', '10.30-12.30', '13.15-15.15', '15.30-17.30'
                        ],
                        enumNames: [
                            '08.15-10.15', '10.30-12.30', '13.15-15.15', '15.30-17.30'
                        ]
                    }

                }

            },

            };

        // <div className='pure-g'>
        //
        //     <article className='pure-u-1'>
        //         <section className='demonstration'></section>
        //
        //
        //
        //     </article>
        // </div>

        return (
            <div>
                <div><Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add
                    Subject</Button></Col></div>
                <h1> Subject List</h1>
                <FullTable properties={ properties } style={this.style} columns={ subjectCol } remove={this.reamoveSub}
                           submit={this.submitSub} data={this.state.data}/>


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
                            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form onSubmit={this.handleSubmit}>
                                    <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>Module Code</ControlLabel>
                                            <FormControl type="text"
                                                         ref="moduleCode"
                                                         value={this.state.moduleCode}
                                                         onChange={this.handleChangeModuleCode}/>
                                        </FormGroup>
                                    </Col><Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Module Name</ControlLabel>
                                        <FormControl type="text"
                                                     ref="moduleName"
                                                     value={this.state.moduleName}
                                                     onChange={this.handleChangeModuleName}/>
                                    </FormGroup>

                                </Col> <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Credits</ControlLabel>
                                        <FormControl type="text"
                                                     ref="credits"
                                                     value={this.state.credits}
                                                     onChange={this.handleChangeCredits}/>
                                    </FormGroup>

                                </Col>
                                    <Col md={6}>
                                        <FormGroup >
                                            <ControlLabel>Semester</ControlLabel>
                                            <FormControl componentClass="select" placeholder="select" ref="semester"
                                                         onChange={this.handleSelectSem}>

                                                <option value="">~Select ~</option>
                                                <option value="Semester 1">Semester 1</option>
                                                <option value="Semester 2">Semester 2</option>
                                                <option value="Semester 3">Semester 3</option>
                                                <option value="Semester 4">Semester 4</option>
                                            </FormControl>
                                        </FormGroup>

                                    </Col>
                                    <Col md={6}>
                                        <FormGroup >
                                            <ControlLabel>Day</ControlLabel>
                                            <FormControl componentClass="select" placeholder="select" ref="day"
                                                         onChange={this.handleSelectDay}>
                                                <option value="">~Select ~</option>
                                                <option value="Sunday">Sunday</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thuesday">Thuesday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                            </FormControl>
                                        </FormGroup>

                                    </Col> <Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Time Slot</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" ref="timeSlot"
                                                     onChange={this.handleSelectTimeSlt}>
                                            <option value="">~Select ~</option>
                                            <option value="08.15-10.15">08.15-10.15</option>
                                            <option value="10.30-12.30">10.30-12.30</option>
                                            <option value="13.15-15.15">13.15-15.15</option>
                                            <option value="15.30-17.30">15.30-17.30</option>
                                        </FormControl>
                                    </FormGroup>

                                </Col>
                                    <Col md={12}>
                                        <FormGroup >
                                            <ControlLabel>Description</ControlLabel>
                                            <FormControl componentClass="textarea" placeholder="Description here"
                                                         ref="description"
                                                         value={this.state.description}
                                                         onChange={this.handleChangeDescription}/>
                                        </FormGroup>

                                    </Col>


                                    <Col sm={6}>
                                        <Button bsStyle="danger" onClick={this.close}>Close</Button>
                                        <Button bsStyle="success" onClick={this.close} type="submit">Submit</Button>
                                    </Col>
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

// module.exports = SubjectTabelAdmin;
// module.exports = hello;
