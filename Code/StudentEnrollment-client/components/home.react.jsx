import React from 'react';
import ReactDOM from 'react-dom';
// var React = require('react'),
// ReactDOMServer = require('react-dom/server');

import Header from './header.react'
import {Col} from 'react-bootstrap'
import request from 'superagent'
import { browserHistory} from 'react-router';
import ErrorHandling from './Utils/ErrorHandling';


import Tab from './tabs'
import Profile from './profileView.react'

module.exports = React.createClass({
    getInitialState() {

        return ({
            userName: localStorage.getItem('user' ),

            data: {},
            token: localStorage.getItem('token' )

        });
    },

    fetchData(callback){

      request
          .get('http://localhost:3000/users/student/' + this.state.userName+ '/per')
          .set('Accept', 'application/json')
          .set('x-access-token', this.state.token)
          .end(function (err, res) {
              if (err) {
                  // console.log('error' + JSON.stringify(err) );
                  ErrorHandling.tokenErrorHandling(err.response);
              }
              else if(!res) {

              }
              else {
                  //alert('aaaa')
                  var data = {
                    firstName: res.body.firstName || " ",
                    lastName: res.body.lastName || " ",
                    email: res.body.email || " ",
                    userName: res.body.userName || " ",
                    dob : res.body.dob || " ",
                    //password: ,
                    adddress: res.body.adddress || " ",
                    gender: res.body.gender || " ",
                    alStream: res.body.alStream || " ",
                    contactNumber: res.body.contactNumber || " ",
                    zScore: res.body.zScore || " ",
                      profileImage:res.body.profileImage
                  };
                  // console.log("Respond " + JSON.stringify(res.body));
                  // console.log("Check Data " + JSON.stringify( data ));
                  callback(data);
                  // this.setState({
                  //     firstName: res.body.firstName,
                  //     lastName: res.body.lastName,
                  //     email: res.body.email,
                  //     userName: res.body.userName,
                  //     //password: ,
                  //     adddress: res.body.adddress,
                  //     gender: res.body.gender,
                  //     alStream: res.body.alStream,
                  //     contactNumber: res.body.contactNumber,
                  //     zScore: res.body.zScore
                  // });
              }
          }.bind(this));

    },

    componentWillMount(){



      this.fetchData(function(data) {
          this.setState({data: data});
          // console.log(dataSe);
      }.bind(this));

    },

    updateData(data){
      this.setState({data: data});
    },

// Render the component
    render()
    {




        return (
            <div>
                 <div>
                <Col md={12}>
                    {  <Header userName={this.state.userName} /> || this.props.children}
                </Col>
                </div>
            <div style={{paddingTop: 70}}>
                <Col md={3}>
                    {  <Profile data={this.state.data} updateData={this.updateData} userName={this.state.userName} token={this.state.token }/> || this.props.children}
                </Col>
                <Col md={9}>
                    { <Tab data={this.state.data} updateData={this.updateData} userName={this.state.userName} token={this.state.token }/> || this.props.children}
                </Col>
            </div>
                 </div>

        );
    }
});
