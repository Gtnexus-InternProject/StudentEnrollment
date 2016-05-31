/**
 * Created by hrajapaksha on 5/12/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import request from 'superagent'
import {Image,Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Col,ButtonGroup,Modal} from 'react-bootstrap';

module.exports = React.createClass({

    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            gender: '',
            alStream: '',
            telephone: '',
            zScore: '',
            imgURL: 'http://localhost:5000/img/pro.PNG'

        }

    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    componentWillMount(){

        var userName = this.props.userName;
        request
            .get('http://localhost:3000/users/student/' + userName+ '/per')
            .set('Accept', 'application/json')
            .set('x-access-token', this.props.token)
            .end(function (err, res) {
                if (err) {
                    console.log('error' + err);
                }
                else {

                    this.setState({
                        firstName: res.body.firstName,
                        lastName: res.body.lastName,
                        email: res.body.email,
                        userName: res.body.userName,
                        //password: ,
                        address: res.body.adddress,
                        gender: res.body.gender,
                        alStream: res.body.alStream,
                        telephone: res.body.contactNumber,
                        zScore: res.body.zScore,
                        imgURL:res.body.profileImage
                    });
                }
            }.bind(this));

    },


    handleChangeUserName: function (event) {
        this.setState({userName: event.target.value});
    },

    handleChangeEmail: function (event) {
        this.setState({email: event.target.value});
    },
    handleChangeLast: function (event) {
        this.setState({lastName: event.target.value});
    },
    handleChangeFirst: function (event) {
        this.setState({firstName: event.target.value});
    },
    handleChangeZScore: function (event) {
        this.setState({zScore: event.target.value});
    },
    handleChangeAddress: function (event) {
        this.setState({address: event.target.value});

    },
    handleChangeTelephone: function (event) {
        this.setState({telephone: event.target.value});

    },
    handleChangeGender(event){
        this.setState({gender: event.target.value});
    },
    handleChangeALStream(event){
        this.setState({alStream: event.target.value});
    },

    handleSubmit(data) {
        //alert('ggg');
        data.preventDefault();

        var formR = {
            userName: this.state.userName.trim(),
            email: this.state.email.trim(),
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            //gender: this.state.gender.trim() == '1' ? "Male" :"Female",
            gender: this.state.gender.trim(),
            alStream: this.state.alStream.trim(),
            adddress: this.state.address.trim(),
            //zScore: this.state.zScore.trim(),
            contactNumber: this.state.telephone.trim()

        };
        //alert(JSON.stringify(formR));
        request.put('http://localhost:3000/users/student/'+this.props.userName)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', this.props.token)
            .send(formR)
            .withCredentials()
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error');
                } else {
                    console.log('yay got ' + JSON.stringify(formR));

                }
            })


    },


    render(){
        return (
            <div>
                <Panel bsStyle="danger">
                    <Col md={12}>
                        <Image src={this.state.imgURL} circle/>
                    </Col><Col md={12}>
                    <h3 ><strong>{this.state.firstName} {this.state.lastName}</strong></h3>
                </Col> <Col md={12}>
                    <h4 >{this.state.email}</h4></Col>
                    <ButtonGroup vertical block>
                        <Button bsStyle="info" onClick={this.open}>Edit Profile</Button>

                    </ButtonGroup>
                </Panel>

                <div className="modal-container">
                    <Modal
                        show={this.state.showModal}
                        onHide={this.close}
                        //show={this.state.show}
                        //onHide={close}
                        //container={this}
                        aria-labelledby="contained-modal-title"
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form onSubmit={this.handleSubmit}>

                                    <Col md={12}>
                                        <FormGroup>
                                            <ControlLabel>User Name</ControlLabel>
                                            <FormControl type="text"
                                                         ref="userName"
                                                         value={this.state.userName}
                                                         onChange={this.handleChangeUserName}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup >
                                            <ControlLabel>First Name</ControlLabel>
                                            <FormControl type="text"
                                                         placeholder="Enter First Name"
                                                         ref="firstName"
                                                         value={this.state.firstName}
                                                         onChange={this.handleChangeFirst}/>
                                        </FormGroup>
                                    </Col><Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl type="text"
                                                     placeholder="Enter last Name"
                                                     ref="lastName"
                                                     value={this.state.lastName}
                                                     onChange={this.handleChangeLast}/>
                                    </FormGroup>
                                </Col>
                                    <Col md={6}>
                                        <FormGroup >
                                            <ControlLabel>Gender</ControlLabel>
                                            <FormControl componentClass="select" ref="gender"
                                                         onChange={this.handleChangeGender}>
                                                <option value={this.state.gender}/>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>

                                            </FormControl>

                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup>
                                            <ControlLabel>Email address</ControlLabel>
                                            <FormControl type="email" placeholder="abc@def.com"
                                                         ref="email"
                                                         value={this.state.email}
                                                         onChange={this.handleChangeEmail}/>
                                        </FormGroup>
                                    </Col><Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>AL Stream</ControlLabel>
                                        <FormControl componentClass="select" ref="alStresm"
                                                     onChange={this.handleChangeALStream}>
                                            <option value="">~Select ~</option>
                                            <option value="Maths">Maths</option>
                                            <option value="Biology">Biology</option>
                                            <option value="Commerce">Commerce</option>
                                            <option value="Art">Art</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col><Col md={6}>
                                    <FormGroup >
                                        <ControlLabel>Z-Score</ControlLabel>
                                        <FormControl type="text" placeholder="Enter Z-Score"
                                                     ref="zScore"
                                                     value={this.state.zScore}
                                                     onChange={this.handleChangeZScore}/>
                                    </FormGroup>
                                </Col><Col md={12}>
                                    <FormGroup >
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Enter Address"
                                                     ref="address"
                                                     value={this.state.address}
                                                     onChange={this.handleChangeAddress}/>
                                    </FormGroup>
                                </Col><Col md={12}>
                                    <FormGroup >
                                        <ControlLabel>Telephone</ControlLabel>
                                        <FormControl type="text" placeholder="Enter phone number"
                                                     ref="telephone"
                                                     value={this.state.telephone}
                                                     onChange={this.handleChangeTelephone}/>
                                    </FormGroup>
                                </Col>


                                    <Col sm={6}>
                                        <Button bsStyle="danger" onClick={this.close}>Close</Button>
                                        <Button bsStyle="success" onClick={this.close} type="submit">Submit</Button>
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


});
