/**
 * Created by hrajapaksha on 5/19/2016.
 */
var React = require('react');
var request = require('superagent');

import {Row,Panel,Accordion, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';
import StdTable from './coordinatorSubject.react'

import ErrorHandling from './Utils/ErrorHandling';


module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            count:[]
        };
    },

    componentWillReceiveProps(newProps){
        this.setState({
            data: newProps.data,
            count:newProps.count})

    },
    updateCount(count, i){
        this.state.count[i] = count;
        this.setState({

            count:this.state.count});
    },

    render(){
        var panes = [];

        if(this.state.data) {
            for (var i = 0; i < this.state.data.length; i++) {

                var header=<Row> <Col md={9}>{this.state.data[i].moduleName}</Col>  <Col md={3}>Student Count : {this.state.count[i]}</Col></Row>
                    panes[i] = (
                    <Panel eventKey={i + 1} header={header}>
                        <StdTable updateCount={this.updateCount} moduleCode={this.state.data[i]}
                                  count={this.state.count[i]}
                                  token={this.props.token}
                                  userName={this.props.userName} i={i} />
                    </Panel>
                );
            }
        }
          return (
            <Accordion>
                {panes}
            </Accordion>
        );
    }
});
