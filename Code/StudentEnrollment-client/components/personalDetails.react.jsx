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
            adddress: '',
            zScore: '',
            alStream: '',
            contactNumber: '',
            dateOfBirth: ''
        }

    },

    componentWillReceiveProps: function(newProps) {
      console.log("Check Data (componentDidMount) " + JSON.stringify(this.props.data));
      // this.state.firstName = this.props.data.firstName,
      // this.state.lastName = this.props.data.lastName,
      // this.state.email = this.props.data.email,
      // this.state.userName = this.props.data.userName,
      // //password: ,
      // this.state.adddress = this.props.data.adddress,
      // this.state.gender = this.props.data.gender,
      // this.state.alStream = this.props.data.alStream,
      // this.state.contactNumber = this.props.data.contactNumber,
      // this.state.zScore = this.props.data.zScore
        if (newProps.data != this.state.data) {
            this.setState({

                firstName: newProps.data.firstName,
                lastName: newProps.data.lastName,
                email: newProps.data.email,
                adddress: newProps.data.adddress,
                zScore: newProps.data.zScore,
                alStream: newProps.data.alStream,
                contactNumber: newProps.data.contactNumber,
                gender: newProps.data.gender,
                dateOfBirth: newProps.data.dateOfBirth
            });

        }

    },


    componentWillMount(){

        // var userName = this.props.userName;
        // console.log(userName)
        // request
        //     .get('http://localhost:3000/users/student/' + userName + '/per')
        //     .set('Accept', 'application/json')
        //     .set('x-access-token', this.props.token)
        //     .end(function (err, res) {
        //         if (err) {
        //             console.log('error' + err)
        //         }
        //         else {
        //             this.setState({
        //                 userName: res.body.userName,
        //                 firstName: res.body.firstName,
        //                 lastName: res.body.lastName,
        //                 email: res.body.email,
        //                 adddress: res.body.adddress,
        //                 zScore: res.body.zScore,
        //                 alStream: res.body.alStream,
        //                 contactNumber: res.body.contactNumber,
        //                 gender: res.body.gender,
        //                 dateOfBirth: res.body.dateOfBirth
        //             });
        //
        //
        //         }
        //     }.bind(this));

    },
    render()
    {



        // console.log("Check Data (render) " + JSON.stringify(this.props.data));
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
                            </strong>: {this.state.adddress}</h5>

                        </FormGroup></Col>
                    <Col md={6}>
                        <FormGroup>
                            <h5><strong>Contact Number </strong>: {this.state.contactNumber}</h5>
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
