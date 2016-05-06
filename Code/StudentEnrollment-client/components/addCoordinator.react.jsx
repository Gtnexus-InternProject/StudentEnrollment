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
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email:'',          
            address: '',
            telephone:'',
            showModal: false

        };
    },

    close() {
        this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
    },

    handleChangeFirstName: function (event) {
        this.setState({ firstName: event.target.value });
    },
    handleChangeLastName: function (event) {
        //if(this.state.password.trim().length>1){
        this.setState({ lastName: event.target.value });
    },
    handleChangeUserName: function (event) {
        this.setState({ userName: event.target.value });
    },
    handleChangePassword: function (event) {
        this.setState({ password: event.target.value });
    },

    handleChangeEmail: function (event) {
        this.setState({ email: event.target.value });
    },

    handleChangeAddress: function (event) {
        this.setState({ address: event.target.value })
    },
 handleChangeTelephone: function (event) {
        this.setState({ telephone: event.target.value })
    },



    handleSubmit(data) {
        alert('ggg');
        data.preventDefault();
        var formAddSub = {
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            userName: this.state.userName.trim(),
            password: this.state.password.trim(),
            email: this.state.email.trim(),
            telephone: this.state.telephone.trim(),
            address: this.state.address.trim(),

        }
alert(JSON.stringify(formAddSub));

        request.post('http://localhost:3000/users/coordinator')
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
                            ref="userNamesd"
                            value={this.state.userName}
                            onChange={this.handleChangeUserName}/>


                    </FormGroup>

                    <FormGroup >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password"
                            ref="passwordwe"
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
                        <Modal.Title id="contained-modal-title">Add Coordinator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                         <Col sm={12}></Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl type="text"
                                            ref="firstName"
                                            value={this.state.firstName}
                                            onChange={this.handleChangeFirstName}/>
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl type="text"
                                            ref="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleChangeLastName}/>
                                    </FormGroup>

                                </Col>

                                <Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl type="text"
                                            ref="userName"
                                            value={this.state.userName}
                                            onChange={this.handleChangeUserName}/>
                                    </FormGroup>
                                </Col><Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Module Name</ControlLabel>
                                        <FormControl type="password"
                                            ref="password"
                                            value={this.state.password}
                                            onChange={this.handleChangePassword}/>
                                    </FormGroup>

                                </Col>  <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Email address</ControlLabel>
                                        <FormControl type="email" placeholder="abc@efg.com"
                                            ref="email"
                                            value={this.state.email}
                                            onChange={this.handleChangeEmail}/>
                                    </FormGroup>

                                </Col>
                                  <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Telephone</ControlLabel>
                                        <FormControl type="text"
                                            ref="telephone"
                                            value={this.state.telephone}
                                            onChange={this.handleChangeTelephone}/>
                                    </FormGroup>

                                </Col>

                                <Col md={12}>
                                    <FormGroup >
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Address here"
                                            ref="address"
                                            value={this.state.address}
                                            onChange={this.handleChangeAddress} />
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

