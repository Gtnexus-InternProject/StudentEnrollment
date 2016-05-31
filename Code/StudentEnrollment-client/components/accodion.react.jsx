/**
 * Created by hrajapaksha on 5/19/2016.
 */
var React = require('react');
var request = require('superagent');

import {Panel,Accordion, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';
import StdTable from './coordinatorSubject.react'


module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillReceiveProps(newProps){
        this.setState({data: newProps.data})
    },


    render(){
        var panes = [];

        if(this.state.data) {
            for (var i = 0; i < this.state.data.length; i++) {
                panes.push(
                    <Panel eventKey={i + 1} header={this.state.data[i]}>
                        <StdTable moduleCode={this.state.data[i]} token={this.props.token} userName={this.props.userName}/>
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
