/**
 * Created by hrajapaksha on 5/4/2016.
 */
/**
 * Created by hrajapaksha on 4/29/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');

import request from 'superagent'

import {Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Modal, Col} from 'react-bootstrap';
import {Link} from 'react-router/lib/';


const title = (
    <span>Panel title</span>
);

module.exports = React.createClass({


    getInitialState() {
        return {
            moduleCode: '',
            moduleName: '',
            day: '',
            semester: '',
            timeSlot: '',
            credits: '',
            description: '',
            showModal: false

        };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },
    handleChangeModuleCode: function (event) {
        this.setState({ moduleCode: event.target.value });
    },
    handleChangeModuleName: function (event) {
        //if(this.state.password.trim().length>1){
        this.setState({ moduleName: event.target.value });
    },


    handleChangeCredits: function (event) {
        this.setState({ credits: event.target.value });
    },

    handleChangeDescription: function (event) {
        this.setState({ description: event.target.value });
    },
    handleSelectSem: function (event) {
        this.setState({ semester: event.target.value })
    },
    handleSelectDay: function (event) {
        this.setState({ day: event.target.value });
    },
    handleSelectTimeSlt: function (event) {
        this.setState({ timeSlot: event.target.value });
    },



    handleSubmit(data) {
        alert('ggg');
        data.preventDefault();
        var formAddSub = {
            moduleCode: this.state.moduleCode.trim(),
            moduleName: this.state.moduleName.trim(),
            credits: this.state.credits.trim(),
            semester: this.state.semester.trim(),
            day: this.state.day.trim(),
            timeSlot: this.state.timeSlot.trim(),
            description: this.state.description.trim(),

        }


        request.post('http://localhost:3000/subjects/subjectAdd')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(formAddSub)
            .withCredentials()
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error');
                } else {
                    console.log('yay got ' + JSON.stringify(formAddSub));
                }
            })
    },

    render() {

        return (<div>
            <Panel header={title} bsStyle="primary">
                <PageHeader>Register
                    <small></small>
                </PageHeader>

                <Form onSubmit={this.handleSubmit}>

                    <FormGroup>
                        <ControlLabel>User Name</ControlLabel>


                        <FormControl type="text"
                            ref="userName"
                            value={this.state.userName}
                            onChange={this.handleChangeUserName}/>


                    </FormGroup>

                    <FormGroup >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password"
                            ref="password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}/>
                    </FormGroup>

                    <Button bsStyle="primary" type="button" onClick={this.open}>
                        Add Subject

                    </Button>
                    <Button bsStyle="success" type="submit">
                        Submit

                    </Button>

                </Form>
            </Panel>

            <div className="modal-container" style={{ height: 200 }}>
                <Modal
                    show={this.state.showModal}
                    onHide={this.close}
                    //show={this.state.show}
                    //onHide={close}
                    //container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form onSubmit={this.handleSubmit}>
                                <Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Module Code</ControlLabel>
                                        <FormControl type="text"
                                            ref="moduleCode"
                                            value={this.state.moduleCode}
                                            onChange={this.handleChangeModuleCode}/>
                                    </FormGroup>
                                </Col><Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Module Name</ControlLabel>
                                        <FormControl type="text"
                                            ref="moduleName"
                                            value={this.state.moduleName}
                                            onChange={this.handleChangeModuleName}/>
                                    </FormGroup>

                                </Col>  <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Credits</ControlLabel>
                                        <FormControl type="text"
                                            ref="credits"
                                            value={this.state.credits}
                                            onChange={this.handleChangeCredits}/>
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Semester</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" ref="semester" onChange={this.handleSelectSem}>

                                            <option value="">~Select ~</option>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                            <option value="4">Semester 4</option>
                                        </FormControl>
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Day</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" ref="day" onChange={this.handleSelectDay}>
                                            <option value="">~Select ~</option>
                                            <option value="1">Sunday</option>
                                            <option value="2">Monday</option>
                                            <option value="3">Tuesday</option>
                                            <option value="4">Wednesday</option>
                                            <option value="5">Thuesday</option>
                                            <option value="6">Friday</option>
                                            <option value="7">Saturday</option>
                                        </FormControl>
                                    </FormGroup>

                                </Col>    <Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Time Slot</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" ref="timeSlot" onChange={this.handleSelectTimeSlt}>
                                            <option value="">~Select ~</option>
                                            <option value="1">08.15-10.15</option>
                                            <option value="2">10.30-12.30</option>
                                            <option value="3">13.15-15.15</option>
                                            <option value="4">15.30-17.30</option>
                                        </FormControl>
                                    </FormGroup>

                                </Col>
                                <Col md={12}>
                                    <FormGroup >
                                        <ControlLabel>Description</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Description here"
                                            ref="description"
                                            value={this.state.description}
                                            onChange={this.handleChangeDescription} />
                                    </FormGroup>

                                </Col>


                                <Col sm={6}>
                                    <Button bsStyle="danger" onClick={this.close}>Close</Button>
                                    <Button bsStyle="success" type="submit">Submit</Button>
                                </Col>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>


            </div>

        </div>
        )
    }
}
)


