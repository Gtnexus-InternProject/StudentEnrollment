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

var request = require('superagent');
var nocache = require('superagent-no-cache');

module.exports.SubjectTabelAdmin = React.createClass({
    displayName: 'App',

    getInitialState: function() {
      // var data = [];

        return {data: []};
    },

    fetchData: function(callback) {

        // var me = this;

        request.get('http://localhost:3000/subjects/asa').set('Accept', 'application/json').accept('application/json').set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYyOTY3MzAzLCJleHAiOjE0NjMwNTM3MDN9.doQCPHkb74UxyVVE1xQ44RMgR_7jdRdm1SXtaEy22As').use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {

                var jsonObj = JSON.parse(res.text).subjects;
                // console.log("data: " + JSON.stringify(jsonObj));
                var data = [];
                for (var i = 0; i < jsonObj.length; i++) {
                    // console.log("data: " + jsonObj[i] );
                    var row = {
                        moduleCode: jsonObj[i].moduleCode,
                        moduleName: jsonObj[i].moduleName,
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

    render() {
      // console.log("State Data " + this.state.data);
        return (
            <div className='pure-g'>

                <article className='pure-u-1'>
                    <section className='demonstration'>
                        <FullTable data ={this.state.data}/>
                    </section>

                </article>
            </div>
        );
    }
});

// module.exports = SubjectTabelAdmin;
// module.exports = hello;
