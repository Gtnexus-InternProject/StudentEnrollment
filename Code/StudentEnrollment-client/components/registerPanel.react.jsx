var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import request from 'superagent'
import {
    Modal, Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Col, Image
}
from 'react-bootstrap';

import {
    Router, Route, Link, browserHistory
}
from 'react-router';
//import Img from './profilePicture.react';

const title = ( < span > Panel title < /span>

);

var userName;
var boolGaurd = true;
var tick = 0;
var previousTime = 0;

module.exports = React.createClass({


    getInitialState() {
            return {
                userName: '',
                password: '',
                email: '',
                lastName: '',
                firstName: '',
                address: '',
                gender: '',
                alStream: '',
                telephone: '',
                zScore: '',
                imgURL: 'http://localhost:5000/img/pro.PNG'
            };
        },

        handleChange() {
            var fff = this.refs.myInput;
            var loc = fff.value.replace("C:\\fakepath\\", "");
            var file = fff.files[0];
            var reader = new FileReader();

var image;
            if (file) {
console.log("1");
                image = new Image();

                image.onload = function () {
console.log("2");
                    alert("The image width is " + this.width + " and image height is " + this.height);
                };

                //image.src = _URL.createObjectURL(file);


            }



            reader.addEventListener("load", function () {  
                console.log("xxxxx");
                console.log("W" + fff.width);
                console.log("H" + fff.height);
                // console.log(reader.result);
                this.setState({
                    imgURL: reader.result
                });
            }.bind(this), false);
            if (file) {  
                reader.readAsDataURL(file); 
            }

        },

        startTimer() {
            var myVar = setInterval(function () {
                tick++;
                //console.log("x" + tick);
                if (tick - previousTime >= 3) {
                    clearTimeout(myVar);
                    boolGaurd = true;
                    request.get('http://localhost:3000/users/student/' + this.state.userName.trim() + '/validate')
                        .set('Accept', 'application/json')
                        .end(function (err, res) {
                            if (err) {} else {
                                if (res.body.message == "invalid") {
                                    alert("User Name already taken");
                                }
                            }
                        });
                }
            }.bind(this), 1000);
        },
        handleChangeUserName: function (event) {
            //console.log("er");
            previousTime = tick;
            this.setState({
                userName: event.target.value
            });
            if (boolGaurd) {
                boolGaurd = false;
                this.startTimer();
            }

        },
        handleChangePassword: function (event) {
            //if(this.state.password.trim().length>1){
            this.setState({
                password: event.target.value
            });
            //}else {

            //
            //}
        },
        handleChangeEmail: function (event) {
            this.setState({
                email: event.target.value
            });
        },
        handleChangeLast: function (event) {
            this.setState({
                lastName: event.target.value
            });
        },
        handleChangeFirst: function (event) {
            this.setState({
                firstName: event.target.value
            });
        },
        handleChangeZScore: function (event) {
            this.setState({
                zScore: event.target.value
            });
        },
        handleChangeAddress: function (event) {
            this.setState({
                address: event.target.value
            });

        },
        handleChangeTelephone: function (event) {
            this.setState({
                telephone: event.target.value
            });

        },
        handleChangeGender(event) {
            this.setState({
                gender: event.target.value
            });
        },
        handleChangeALStream(event) {
            this.setState({
                alStream: event.target.value
            });
        },

        handleSubmit(data) {
            //alert('ggg');
            data.preventDefault();

            var formR = {
                userName: this.state.userName.trim(),
                password: this.state.password.trim(),
                email: this.state.email.trim(),
                firstName: this.state.firstName.trim(),
                lastName: this.state.lastName.trim(),
                gender: this.state.gender.trim() == '1' ? "Male" : "Female",
                alStream: this.state.alStream.trim(),
                adddress: this.state.address.trim(),
                contactNumber: this.state.telephone.trim(),
                zScore: this.state.zScore.trim(),
                imgURL: this.state.imgURL
            };
            //alert(JSON.stringify(formR));/
            request.post('http://localhost:3000/users/student')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(formR)
                //.withCredentials()
                .end(function (err, res) {
                    if (err || !res.ok) {
                        console.log('Oh no! error');
                    } else {
                        browserHistory.push('/login');
                    }
                })


        },

        render() {

            return ( < div >
                    < Col mdOffset = {
                        2
                    }
                    md = {
                        8
                    } >
                    < Panel header = {
                        title
                    }
                    bsStyle = "primary" >
                    < PageHeader > Register < small > < /small> < /PageHeader >

                    < Form onSubmit = {
                        this.handleSubmit
                    } >
                    < Col md = {
                        12
                    } >
                    < FormGroup >
                    < ControlLabel > User Name < /ControlLabel> < FormControl type = "text"
                    ref = "userName"
                    value = {
                        this.state.userName
                    }
                    onChange = {
                        this.handleChangeUserName
                    }
                    /> < /FormGroup > < /Col><Col md={12}> < FormGroup > < ControlLabel > Password < /ControlLabel > < FormControl type = "password"
                    ref = "password"
                    value = {
                        this.state.password
                    }
                    onChange = {
                        this.handleChangePassword
                    }
                    /> < /FormGroup > < /Col>

                    < Col md = {
                        6
                    } >
                    < FormGroup >
                    < ControlLabel > First Name < /ControlLabel> < FormControl type = "text"
                    placeholder = "Enter First Name"
                    ref = "firstName"
                    value = {
                        this.state.firstName
                    }
                    onChange = {
                        this.handleChangeFirst
                    }
                    /> < /FormGroup > < /Col><Col md={6}> < FormGroup > < ControlLabel > Last Name < /ControlLabel > < FormControl type = "text"
                    placeholder = "Enter last Name"
                    ref = "lastName"
                    value = {
                        this.state.lastName
                    }
                    onChange = {
                        this.handleChangeLast
                    }
                    /> < /FormGroup > < /Col> < Col md = {
                    6
                } >
                < FormGroup >
                < ControlLabel > Gender < /ControlLabel> < FormControl componentClass = "select"
            ref = "gender"
            onChange = {
                    this.handleChangeGender
                } >
                < option value = "" > ~Select~ < /option> < option value = "1" > Male < /option > < option value = "2" > Female < /option>

            < /FormControl>

            < /FormGroup> < /Col >

            < Col md = {
                    6
                } >
                < FormGroup >
                < ControlLabel > Email address < /ControlLabel> < FormControl type = "email"
            placeholder = "abc@def.com"
            ref = "email"
            value = {
                this.state.email
            }
            onChange = {
                this.handleChangeEmail
            }
            /> < /FormGroup > < /Col><Col md={6}> < FormGroup > < ControlLabel > AL Stream < /ControlLabel > < FormControl componentClass = "select"
            ref = "alStresm"
            onChange = {
                    this.handleChangeALStream
                } >
                < option value = "" > ~Select~ < /option> < option value = "1" > Maths < /option > < option value = "2" > Biology < /option> < option value = "3" > Commerce < /option > < option value = "4" > Art < /option> < /FormControl > < /FormGroup> < /Col > < Col md = {
                    6
                } > < FormGroup >
                < ControlLabel > Z - Score < /ControlLabel> < FormControl type = "text"
            placeholder = "Enter Z-Score"
            ref = "zScore"
            value = {
                this.state.zScore
            }
            onChange = {
                this.handleChangeZScore
            }
            /> < /FormGroup > < /Col><Col md={12}> < FormGroup > < ControlLabel > Address < /ControlLabel > < FormControl componentClass = "textarea"
            placeholder = "Enter Address"
            ref = "address"
            value = {
                this.state.address
            }
            onChange = {
                this.handleChangeAddress
            }
            /> < /FormGroup > < /Col><Col md={12}> < FormGroup > < ControlLabel > Telephone < /ControlLabel > < FormControl type = "text"
            placeholder = "Enter phone number"
            ref = "telephone"
            value = {
                this.state.telephone
            }
            onChange = {
                this.handleChangeTelephone
            }
            /> < /FormGroup > < /Col> 

            < Image src = {
                this.state.imgURL
            }
            circle / >
                < div class = "upload-button" > Upload Image < /div> < input class = "file-upload"
            onChange = {
                this.handleChange
            }
            ref = "myInput"
            type = "file"
            accept = "image/*" / >

                < Button bsStyle = "danger"
            type = "button" >
                Cancel < /Button> < Button bsStyle = "success"
            type = "submit" >
                Submit

                < /Button>

            < /Form> < /Panel > < /Col>


            < /div>                   
        )
}
})
