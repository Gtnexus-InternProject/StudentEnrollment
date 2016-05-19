/**
 * Created by hrajapaksha on 5/19/2016.
 */
var React = require('react');
var request = require('superagent');

import {Panel,Accordion, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';
import StdTable from './coordinatorSubject.react'
var jsonObjSub;

module.exports = React.createClass({
    getInitialState: function () {
        // var data = [];

        return {
            moduleCode: '',
            moduleName: '',

            showModal: false,

            data: []
        };
    },



    fetchData(callback){


        request
            .get('http://localhost:3000/users/coordinator/coor/subjects')
            .set('Accept', 'application/json')
            .set('x-access-token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImNvb3IiLCJ0eXBlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE0NjM2NTE5MjgsImV4cCI6MTQ2MzczODMyOH0.fhVMx0MfAm0z3k_0ENmvolZ56yRrqhffCD2sI1DnCOo')
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
                    jsonObjSub = res.body.subjects;
                    console.log(jsonObjSub);
                    callback(jsonObjSub);
                } ;


            });

    },
    componentDidMount() {

        this.fetchData(function (dataSe) {
            this.setState({data: dataSe});
             console.log(this.state.data);
        }.bind(this));
        // console.log("Check 2");
        //var data = this.getData();

    },


    render(){
        var panes = [];


       for(var i=0;i<this.state.data.length;i++){
           panes.push(
               <Panel eventKey={i + 1} header={this.state.data[i]}>
                   <StdTable moduleCode={this.state.data[i]} token={this.props.token} userName={this.props.userName}/>
               </Panel>

           );
       }
          return (
            <Accordion>
                {panes}
            </Accordion>
        );
    }
});
