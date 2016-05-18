import React from 'react';
import ReactDOM from 'react-dom';
import {Image,Panel,Col,Form, Label,FormGroup,FormControl,ControlLabel} from 'react-bootstrap';
import request from 'superagent'

// var React = require('react'),
// ReactDOMServer = require('react-dom/server');
const title = (
    <span>Personal Details</span>
);

module.exports = React.createClass({

    getInitialState() {
        return {

            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            address: '',
            zScore: '',
            alStream: '',
            telephone: '',
            dateOfBirth: ''
        }

    },


    componentWillMount(){

        var userName = this.props.userName;
        console.log(userName)
        request
            .get('http://localhost:3000/users/student/' + userName)
            .set('Accept', 'application/json')
            .set('x-access-token', this.props.token)
            .end(function (err, res) {
                if (err) {
                    console.log('error' + err)
                }
                else {
                    this.setState({
                        userName: res.body.userName,
                        firstName: res.body.firstName,
                        lastName: res.body.lastName,
                        email: res.body.email,
                        address: res.body.adddress,
                        zScore: res.body.zScore,
                        alStream: res.body.alStream,
                        telephone: res.body.contactNumber,
                        gender: res.body.gender,
                        dateOfBirth: res.body.dateOfBirth
                    });


                }
            }.bind(this));

    },
    render()
    {

        return (<div>

            <Panel >
                <Form >
                    <Col md={6}>

                        <FormGroup>
                            <h5><strong>First Name</strong>: {this.state.firstName}</h5>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Last Name </strong>: {this.state.lastName}</h5>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>UserName </strong>: {this.state.userName}</h5>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Date of Birth
                            </strong>: {this.state.dateOfBirth}</h5>

                        </FormGroup></Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Gender </strong>: {this.state.gender}</h5>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Address
                            </strong>: {this.state.address}</h5>

                        </FormGroup></Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Contact Number </strong>: {this.state.telephone}</h5>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>AL Stream </strong>: {this.state.alStream}</h5>

                        </FormGroup></Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Z Score </strong>: {this.state.zScore}</h5>
                        </FormGroup>
                    </Col>


                </Form>
            </Panel>
        </div> );

    }
});