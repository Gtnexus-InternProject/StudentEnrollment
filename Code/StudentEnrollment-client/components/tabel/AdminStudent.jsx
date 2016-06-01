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
import ErrorHandling from '../Utils/ErrorHandling';
// import token from  '../../config';

module.exports = React.createClass({
    displayName: 'App',

    style : {
      width: '30%',
      height: '330px',
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

        return {data: [],
        token: localStorage.getItem('token' )};
    },

    fetchData: function(callback) {

        // var me = this;

        request.get('http://localhost:3000/users/student')//
        .set('Accept', 'application/json').accept('application/json')//
        .set('x-access-token',this.state.token).use(nocache). // Prevents caching of *only* this request
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

                        firstName: jsonObj[i].firstName,
                        lastName: jsonObj[i].lastName,
                        email: jsonObj[i].email,
                        adddress: jsonObj[i].adddress,
                        contactNumber: jsonObj[i].contactNumber,
                        userName: jsonObj[i].userName,
                        Department: jsonObj[i].Department,
                        subjects: jsonObj[i].subjects,
                        id: i
                    };

                    data.push(row);
                }

                // console.log("data: " + data);


                callback(data);

            } else {
                console.log(err);
                ErrorHandling.tokenErrorHandling(err.response);
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
      request
          .put('http://localhost:3000/users/student/' + data.userName)
          .send(data)
          .set('x-access-token', this.state.token)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err || !res.ok) {
              // alert('Oh no! error');
              console.log('Oh no! error' + err);
              ErrorHandling.tokenErrorHandling(err.response);
            } else {
              // alert('yay got ' + JSON.stringify(res.body));
              console.log('yay got ' + JSON.stringify(res.body));
            }
          });
    },

    reamoveSub : function (data) {
      request
          .delete('http://localhost:3000/users/student/' + data.userName)
          .set('x-access-token', this.state.token)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err || !res.ok) {
              // alert('Oh no! error');
              console.log('Oh no! error' + err);
              ErrorHandling.tokenErrorHandling(err.response);
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
            property: 'Department',
            header: 'Department'
        }

      ];

      var properties = {


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
          },
          Department: {
              type: 'string'
          }

      };



        return (
          <div>
            <h1> Student List</h1>
            <FullTable properties={ properties } style={this.style} columns={ subjectCol } remove= {this.reamoveSub} submit={this.submitSub} data ={this.state.data}/>
          </div>

        );
    }
});
