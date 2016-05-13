'use strict';

var React = require('react');
// var Fork = require('react-ghfork');

var FullTable = require('./full_table.jsx');
// var EditorsTable = require('./editors_table.jsx');
// var NestedTable = require('./nested_table.jsx');

// var readme = require('../README.md');

import 'purecss/build/pure.css';
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

import token from  '../../config';

module.exports = React.createClass({
    displayName: 'App',

    style : {
      width: '30%',
      height: '300px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-130px',
      marginLeft: '-15%',
      backgroundColor: '#fff',
      borderRadius:' 2px',
      zIndex: '100',
      padding: '10px',
      boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
    },

    getInitialState: function() {
      // var data = [];

        return {
            moduleCode: '',
            moduleName: '',
            day: '',
            semester: '',
            timeSlot: '',
            credits: '',
            description: '',
            showModal: false,
            data: []
        };
    },


    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },
    handleChangeModuleCode: function (event) {
        this.setState({ moduleCode: event.target.value });
    },
    handleChangeModuleName: function (event) {
        //if(this.state.password.trim().length>1){
        this.setState({ moduleName: event.target.value });
    },


    handleChangeCredits: function (event) {
        this.setState({ credits: event.target.value });
    },

    handleChangeDescription: function (event) {
        this.setState({ description: event.target.value });
    },
    handleSelectSem: function (event) {
        this.setState({ semester: event.target.value })
    },
    handleSelectDay: function (event) {
        this.setState({ day: event.target.value });
    },
    handleSelectTimeSlt: function (event) {
        this.setState({ timeSlot: event.target.value });
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
            .set('x-access-token',token)
            .send(formAddSub)
            .withCredentials()
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error');
                } else {
                    console.log('yay got ' + JSON.stringify(formAddSub));
                }
            })
    },



    fetchData: function(callback) {

        // var me = this;

        request.get('http://localhost:3000/subjects/asa').set('Accept', 'application/json').accept('application/json').set('x-access-token', token).use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {

              if(res == null ){
                console.log("Empty");
                return;
              }

                var jsonObj = JSON.parse(res.text).subjects;
                // console.log("data: " + JSON.stringify(jsonObj));
                var data = [];
                for (var i = 0; i < jsonObj.length; i++) {
                    // console.log("data: " + jsonObj[i] );
                    var row = {
                        moduleCode: jsonObj[i].moduleCode,
                        moduleName: jsonObj[i].moduleName,
                        semester: jsonObj[i].semester,
                        day: jsonObj[i].day,
                        description: jsonObj[i].description,
                        count: jsonObj[i].count,
                        id: i
                    };

                    data.push(row);
                }

                // console.log("data: " + data);
                // console.log(res.body);

                callback(data);

            } else {
                console.log(err);
            }

            // console.log(JSON.parse(res.text));
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

    componentDidMount: function() {

        this.fetchData(function(dataSe) {
            this.setState({data: dataSe});
            // console.log(dataSe);
        }.bind(this));
        // console.log("Check 2");
        //var data = this.getData();

    },

    submitSub : function (data) {
      request
          .put('http://localhost:3000/subjects/update/' + data.moduleCode)
          .send(data)
          .set('x-access-token',token)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err || !res.ok) {
              // alert('Oh no! error');
              console.log('Oh no! error' + err);
            } else {
              // alert('yay got ' + JSON.stringify(res.body));
              console.log('yay got ' + JSON.stringify(res.body));
            }
          });
    },

    reamoveSub : function (data) {
      request
          .put('http://localhost:3000/subjects/delete/' + data.moduleCode)
          .set('x-access-token',token)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err || !res.ok) {
              // alert('Oh no! error');
              console.log('Oh no! error' + err);
            } else {
              // alert('yay got ' + JSON.stringify(res.body));
              console.log('yay got ' + JSON.stringify(res.body));
            }
          });
    },

    render() {
      // console.log("State Data " + this.state.data);

      // var subjectCol = [
      //
      //   {
      //       property: 'moduleCode',
      //       header: "Module Code",
      //       cell: [highlighter('Module Code')]
      //   }, {
      //       property: 'moduleName',
      //       header: 'Module Name',
      //       cell: [highlighter('Module Name')]
      //   }, {
      //       property: 'count',
      //       header: 'Student Count',
      //       cell: [highlighter('Student Count')]
      //   }
      //
      //
      // ];


      var subjectCol = [

        {
            property: 'moduleCode',
            header: "Module Code"
        }, {
            property: 'moduleName',
            header: 'Module Name'
        }, {
            property: 'count',
            header: 'Student Count'
        }, {
            property: 'semester',
            header: 'Semester'
        }, {
            property: 'day',
            header: 'Day'
        }, {
            property: 'description',
            header: 'Description'
        }

      ];

      var properties = {

          moduleName: {
              type: 'string'
          },
          semester: {
              type: 'string'
          },
          day: {
              type: 'string'
          },
          description: {
              type: 'string'
          }
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
              <div>  <Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add Subject</Button></Col></div>
            <h1> Subject List</h1>
            <FullTable properties={ properties } style={this.style} columns={ subjectCol } remove= {this.reamoveSub} submit={this.submitSub} data ={this.state.data}/>


              <div className="modal-container" >
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

                              </Col>  <Col md={6}>
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
                                          <FormControl componentClass="select" placeholder="select" ref="semester" onChange={this.handleSelectSem}>

                                              <option value="">~Select ~</option>
                                              <option value="1">Semester 1</option>
                                              <option value="2">Semester 2</option>
                                              <option value="3">Semester 3</option>
                                              <option value="4">Semester 4</option>
                                          </FormControl>
                                      </FormGroup>

                                  </Col>
                                  <Col md={6}>
                                      <FormGroup >
                                          <ControlLabel>Day</ControlLabel>
                                          <FormControl componentClass="select" placeholder="select" ref="day" onChange={this.handleSelectDay}>
                                              <option value="">~Select ~</option>
                                              <option value="1">Sunday</option>
                                              <option value="2">Monday</option>
                                              <option value="3">Tuesday</option>
                                              <option value="4">Wednesday</option>
                                              <option value="5">Thuesday</option>
                                              <option value="6">Friday</option>
                                              <option value="7">Saturday</option>
                                          </FormControl>
                                      </FormGroup>

                                  </Col>    <Col md={6}>
                                  <FormGroup >
                                      <ControlLabel>Time Slot</ControlLabel>
                                      <FormControl componentClass="select" placeholder="select" ref="timeSlot" onChange={this.handleSelectTimeSlt}>
                                          <option value="">~Select ~</option>
                                          <option value="1">08.15-10.15</option>
                                          <option value="2">10.30-12.30</option>
                                          <option value="3">13.15-15.15</option>
                                          <option value="4">15.30-17.30</option>
                                      </FormControl>
                                  </FormGroup>

                              </Col>
                                  <Col md={12}>
                                      <FormGroup >
                                          <ControlLabel>Description</ControlLabel>
                                          <FormControl componentClass="textarea" placeholder="Description here"
                                                       ref="description"
                                                       value={this.state.description}
                                                       onChange={this.handleChangeDescription} />
                                      </FormGroup>

                                  </Col>


                                  <Col sm={6}>
                                      <Button bsStyle="danger" onClick={this.close}>Close</Button>
                                      <Button bsStyle="success" type="submit">Submit</Button>
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
