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

// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzMTE0MjcwLCJleHAiOjE0NjMyMDA2NzB9.X6DXvZ2sIMAogrhow7aaUXJEtFYFsLES5Cl7A0yNg3k';


module.exports = React.createClass({
    displayName: 'App',

    style : {
      width: '30%',
      height: '320px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-160px',
      marginLeft: '-15%',
      backgroundColor: '#fff',
      borderRadius:' 2px',
      zIndex: '100',
      padding: '10px',
      boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
    },

    getInitialState: function() {

        return {
            data: [],
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email:'',
            address: '',
            telephone:'',
            showModal: false

        };

    },




    close() {
        this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
    },

    handleChangeFirstName: function (event) {
        this.setState({ firstName: event.target.value });
    },
    handleChangeLastName: function (event) {
        //if(this.state.password.trim().length>1){
        this.setState({ lastName: event.target.value });
    },
    handleChangeUserName: function (event) {
        this.setState({ userName: event.target.value });
    },
    handleChangePassword: function (event) {
        this.setState({ password: event.target.value });
    },

    handleChangeEmail: function (event) {
        this.setState({ email: event.target.value });
    },

    handleChangeAddress: function (event) {
        this.setState({ address: event.target.value })
    },
    handleChangeTelephone: function (event) {
        this.setState({ telephone: event.target.value })
    },



    handleSubmit(data) {

        data.preventDefault();
        var formAddSub = {
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            userName: this.state.userName.trim(),
            password: this.state.password.trim(),
            email: this.state.email.trim(),
            contactNumber: this.state.telephone.trim(),
            adddress: this.state.address.trim(),

        }


        request.post('http://localhost:3000/users/coordinator')
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

        request.get('http://localhost:3000/users/coordinator') //
        .set('Accept', 'application/json').accept('application/json') //
        .set('x-access-token',token).use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {

              if(res == null ){
                console.log("Empty");
                return;
              }
                  // console.log(res.body);
                var jsonObj = res.body;
                // console.log("data: " + JSON.stringify(jsonObj));
                var data = [];
                for (var i = 0; i < jsonObj.length; i++) {
                    // console.log("data: " + jsonObj[i] );
                    // jsonObj[i].subjects.forEach(function(entry) {
                    //     console.log(entry);
                    // });

                    var row = {
                        userName: jsonObj[i].userName,
                        firstName: jsonObj[i].firstName,
                        lastName: jsonObj[i].lastName,
                        email: jsonObj[i].email,
                        adddress: jsonObj[i].adddress,
                        contactNumber: jsonObj[i].contactNumber,
                        subjects: jsonObj[i].subjects,
                        id: i
                    };

                    data.push(row);
                }

                // console.log("data: " + data);


                callback(data);

            } else {
                console.log(err);
            }

            // console.log(JSON.parse(res.text));
        });
    },



    componentDidMount: function() {

        this.fetchData(function(dataSe) {
            this.setState({data: dataSe});
            // console.log(dataSe);
        }.bind(this));
        // console.log("Check 2");
        //var data = this.getData();

    },

    submitSub : function (data) {

      // data.subjects =

      request
          .put('http://localhost:3000/users/coordinator/' + data.userName)
          .send(data)
          .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzNzI2MzkwLCJleHAiOjE0NjM4MTI3OTB9.DKulbRge-U8HvgfOdMZMSwaYT0i-WEmehmnwocXJ2Mg')
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
          .delete('http://localhost:3000/users/coordinator/' + data.userName)
          .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYzNzI2MzkwLCJleHAiOjE0NjM4MTI3OTB9.DKulbRge-U8HvgfOdMZMSwaYT0i-WEmehmnwocXJ2Mg')
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



      var subjectCol = [

        {
            property: 'userName',
            header: "User Name"
        }, {
            property: 'firstName',
            header: 'First Name'
        }, {
            property: 'lastName',
            header: 'Last Name'
        }, {
            property: 'email',
            header: 'Email'
        }, {
            property: 'adddress',
            header: 'Adddress'
        }, {
            property: 'contactNumber',
            header: 'Contact Number'
        }, {
            property: 'subjects',
            header: 'Subjects'
        }


      ];
      var properties = {

          subjects: {
              type: 'string'
          },
          firstName: {
              type: 'string'
          },
          lastName: {
              type: 'string'
          },
          email: {
              type: 'string'
          },
          contactNumber: {
              type: 'number'
          }
      };

        return (
          <div>
              <div>  <Col mdOffset={10} md={2}> <Button bsStyle="success" bsSize="xsmall" onClick={this.open}>Add coordinater</Button></Col></div>

            <h1> Coordinator List</h1>

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
                          <Modal.Title id="contained-modal-title">Add Coordinator</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div>
                              <Col sm={12}></Col>
                              <Form onSubmit={this.handleSubmit}>
                                  <Col md={6}>
                                      <FormGroup>
                                          <ControlLabel>First Name</ControlLabel>
                                          <FormControl type="text"
                                                       ref="firstName"
                                                       value={this.state.firstName}
                                                       onChange={this.handleChangeFirstName}/>
                                      </FormGroup>

                                  </Col>
                                  <Col md={6}>
                                      <FormGroup>
                                          <ControlLabel>Last Name</ControlLabel>
                                          <FormControl type="text"
                                                       ref="lastName"
                                                       value={this.state.lastName}
                                                       onChange={this.handleChangeLastName}/>
                                      </FormGroup>

                                  </Col>

                                  <Col md={12}>
                                      <FormGroup>
                                          <ControlLabel>Username</ControlLabel>
                                          <FormControl type="text"
                                                       ref="userName"
                                                       value={this.state.userName}
                                                       onChange={this.handleChangeUserName}/>
                                      </FormGroup>
                                  </Col><Col md={12}>
                                  <FormGroup>
                                      <ControlLabel>Password</ControlLabel>
                                      <FormControl type="password"
                                                   ref="password"
                                                   value={this.state.password}
                                                   onChange={this.handleChangePassword}/>
                                  </FormGroup>

                              </Col>  <Col md={6}>
                                  <FormGroup>
                                      <ControlLabel>Email address</ControlLabel>
                                      <FormControl type="email" placeholder="abc@efg.com"
                                                   ref="email"
                                                   value={this.state.email}
                                                   onChange={this.handleChangeEmail}/>
                                  </FormGroup>

                              </Col>
                                  <Col md={6}>
                                      <FormGroup>
                                          <ControlLabel>Telephone</ControlLabel>
                                          <FormControl type="text"
                                                       ref="telephone"
                                                       value={this.state.telephone}
                                                       onChange={this.handleChangeTelephone}/>
                                      </FormGroup>

                                  </Col>

                                  <Col md={12}>
                                      <FormGroup >
                                          <ControlLabel>Address</ControlLabel>
                                          <FormControl componentClass="textarea" placeholder="Address here"
                                                       ref="address"
                                                       value={this.state.address}
                                                       onChange={this.handleChangeAddress} />
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
