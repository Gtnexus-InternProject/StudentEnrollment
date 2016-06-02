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
import ErrorHandling from '../Utils/ErrorHandling';
// import token from  '../../config';

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
      // token = localStorage.getItem('token' );
      console.log("\n\ntoken" +  localStorage.getItem('token' ) + "\n\n");
        return {
            moduleCode: '',
            moduleName: '',
            day: '',
            semester: '',
            timeSlot: '',
            credits: '',
            description: '',
            token: localStorage.getItem('token' ),
            data: []
        };
    },



    fetchData: function(callback) {

        // var me = this;

        request.get('http://localhost:3000/subjects/all/asa')//
        .set('Accept', 'application/json').accept('application/json') //
        .set('x-access-token', this.state.token).use(nocache). // Prevents caching of *only* this request
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
                ErrorHandling.tokenErrorHandling(err.response);
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
          .set('x-access-token',this.state.token)
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
          .put('http://localhost:3000/subjects/delete/' + data.moduleCode)
          .set('x-access-token',this.state.token)
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
            <h1> Subject List</h1>
            <FullTable properties={ properties } style={this.style} columns={ subjectCol } remove= {this.reamoveSub} submit={this.submitSub} data ={this.state.data}/>



          </div>
        );
    }
});

// module.exports = SubjectTabelAdmin;
// module.exports = hello;
