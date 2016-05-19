/**
 * Created by hrajapaksha on 5/19/2016.
 */
var React = require('react');
var request = require('superagent');

import {Panel,Accordion, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';

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
            .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImNvb3IiLCJ0eXBlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE0NjM2MzI3NTEsImV4cCI6MTQ2MzcxOTE1MX0.-tLoehViB7_sjntHQ1AIWSBsaxAVuUSdFFN5KA4tj60')
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
                   ryfyg
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
