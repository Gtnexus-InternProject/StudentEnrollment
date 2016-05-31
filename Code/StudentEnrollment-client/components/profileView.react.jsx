/**
 * Created by hrajapaksha on 5/12/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import request from 'superagent'
import {
    Image,
    Panel,
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Checkbox,
    Radio,
    Button,
    PageHeader,
    Col,
    ButtonGroup,
    Modal
}
from 'react-bootstrap';

module.exports = React.createClass({

            getInitialState() {

                    // console.log("Check Data " + JSON.stringify(this.props.data));
                    return {
                        firstName: '',
                        lastName: '',
                        email: '',

                        adddress: '',
                        gender: '',
                        alStream: '',
                        contactNumber: '',
                        zScore: '',
                         imgURL: 'http://localhost:5000/img/pro.PNG',
                hiddenURL: ''

                    }

                },
                handleChange() {
                    var fff = this.refs.myInput;
                    var file = fff.files[0];
                    var reader = new FileReader();

                    reader.addEventListener("load", function () {  
                        this.setState({
                            hiddenURL: reader.result
                        });
                        var imgWidth = this.refs.hiddenImg.width;
                        var imgHeight = this.refs.hiddenImg.height;
                        if (imgHeight <= 256 && imgWidth <= 256) {
                            this.setState({
                                imgURL: reader.result
                            });
                        } else {
                            alert('Image is too big, please resize!!');
                        }
                    }.bind(this), false);
                    if (file) {  
                        reader.readAsDataURL(file); 
                    }

                },
                componentWillReceiveProps: function (newProps) {
                    console.log("Check Data (componentDidMount) " + JSON.stringify(this.props.data));
                    // this.state.firstName = this.props.data.firstName,
                    // this.state.lastName = this.props.data.lastName,
                    // this.state.email = this.props.data.email,
                    // this.state.userName = this.props.data.userName,
                    // //password: ,
                    // this.state.adddress = this.props.data.adddress,
                    // this.state.gender = this.props.data.gender,
                    // this.state.alStream = this.props.data.alStream,
                    // this.state.contactNumber = this.props.data.contactNumber,
                    // this.state.zScore = this.props.data.zScore
                    if (newProps.data != this.state.data) {
                        this.setState({
                            userName: newProps.data.userName,
                            firstName: newProps.data.firstName,
                            lastName: newProps.data.lastName,
                            email: newProps.data.email,
                            adddress: newProps.data.adddress,
                            zScore: newProps.data.zScore,
                            alStream: newProps.data.alStream,
                            contactNumber: newProps.data.contactNumber,
                            gender: newProps.data.gender,
                            dateOfBirth: newProps.data.dateOfBirth,
                            imgURL:newProps.data.imgURL
                        });

                    }

                },

                componentDidMount: function () {
                    // this.state.firstName = this.props.data.firstName,
                    // this.state.lastName = this.props.data.lastName,
                    // this.state.email = this.props.data.email,
                    // this.state.userName = this.props.data.userName,
                    // //password: ,
                    // this.state.adddress = this.props.data.adddress,
                    // this.state.gender = this.props.data.gender,
                    // this.state.alStream = this.props.data.alStream,
                    // this.state.contactNumber = this.props.data.contactNumber,
                    // this.state.zScore = this.props.data.zScore
                    // this.setState({
                    //     userName: this.props.data.userName,
                    //     firstName: this.props.data.firstName,
                    //     lastName: this.props.data.lastName,
                    //     email: this.props.data.email,
                    //     adddress: this.props.data.adddress,
                    //     zScore: this.props.data.zScore,
                    //     alStream: this.props.data.alStream,
                    //     contactNumber: this.props.data.contactNumber,
                    //     gender: this.props.data.gender,
                    //     dateOfBirth: this.props.data.dateOfBirth
                    // });
                },

                close() {
                    this.setState({
                        showModal: false
                    });
                },

                open() {
                    this.setState({
                        showModal: true
                    });
                },
                closeEditPic() {
                    this.setState({
                        showModal2: false
                    });
                },

                showModalEditPic() {
                    this.setState({
                        showModal2: true
                    });
                },


                handleChangeUserName: function (event) {
                    this.setState({
                        userName: event.target.value
                    });
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
                        adddress: event.target.value
                    });

                },
                handleChangeTelephone: function (event) {
                    this.setState({
                        contactNumber: event.target.value
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
                        userName: this.state.userName.trim() || "",
                        email: this.state.email.trim() || "",
                        firstName: this.state.firstName.trim() || "",
                        lastName: this.state.lastName.trim() || "",
                        //gender: this.state.gender.trim() == '1' ? "Male" :"Female",
                        gender: this.state.gender.trim() || "",
                        alStream: this.state.alStream.trim() || "",
                        adddress: this.state.adddress.trim() || "",
                        //zScore: this.state.zScore.trim(),
                        contactNumber: this.state.contactNumber.trim() || "",
                        imgURL: this.state.imgURL

                    };
                    //alert(JSON.stringify(formR));
                    request.put('http://localhost:3000/users/student/' + this.props.userName) //
                        .set('Accept', 'application/json').set('Content-Type', 'application/json') //
                        .set('x-access-token', this.props.token).send(formR) //
                        .end(function (err, res) {
                            if (err || !res.ok) {
                                console.log('Oh no! error');
                            } else {
                                console.log('yay got ' + JSON.stringify(formR));
                                this.props.updateData(formR);
                            }
                        }.bind(this));

                },

                render() {
                    // console.log("Check Data (Render) " + JSON.stringify(this.props.data));
                    // this.state.firstName = this.props.data.firstName,
                    // this.state.lastName = this.props.data.lastName,
                    // this.state.email = this.props.data.email,
                    // this.state.userName = this.props.data.userName,
                    // //password: ,
                    // this.state.adddress = this.props.data.adddress,
                    // this.state.gender = this.props.data.gender,
                    // this.state.alStream = this.props.data.alStream,
                    // this.state.contactNumber = this.props.data.contactNumber,
                    // this.state.zScore = this.props.data.zScore
                    return ( < div >
                            < Panel bsStyle = "danger" >
                            < Col md = {
                                12
                            } >
                            < Image src ={
                    this.state.imgURL
                }
                            responsive / >
                            < /Col> < Col md = {
                            12
                        } >
                        < h3 >
                        < strong > {
                            this.state.firstName
                        } {
                            this.state.lastName
                        } < /strong> < /h3 > 
                            < /Col> < Col md = {
                    12
                } >
                < h4 > {
                    this.state.email
                } < /h4> < /Col ><ButtonGroup vertical block>
                        <Button bsStyle="info" onClick={this.showModalEditPic}>Edit Picture</Button>
                            <Button bsStyle="info" onClick={this.open}>Edit Profile</Button>
                    </ButtonGroup> < /Panel >

            < div className = "modal-container" >
                < Modal show = {
                    this.state.showModal
                }
            onHide = {
                this.close
            }
            aria-labelledby = "contained-modal-title" >
                < Modal.Header closeButton >
                < Modal.Title id = "contained-modal-title" > Edit User < /Modal.Title> < /Modal.Header > < Modal.Body >
                < div >
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
            disabled / >
                < /FormGroup> < /Col > < Col md = {
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
            /> < /FormGroup > < /Col> < Col md = {
            6
        } >
        < FormGroup >
        < ControlLabel > Last Name < /ControlLabel> < FormControl type = "text"
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
    < option value = {
        this.state.gender || "Male"
    }
/> < option value = "Male" > Male < /option > < option value = "Female" > Female < /option>

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
/> < /FormGroup > < /Col> < Col md = {
6
} >
< FormGroup >
    < ControlLabel > AL Stream < /ControlLabel> < FormControl componentClass = "select"
ref = "alStresm"
onChange = {
        this.handleChangeALStream
    } >
    < option value = "" > ~Select~ < /option> < option value = "Maths" > Maths < /option > < option value = "Biology" > Biology < /option> < option value = "Commerce" > Commerce < /option > < option value = "Art" > Art < /option> < /FormControl > < /FormGroup> < /Col > < Col md = {
        6
    } >
    < FormGroup >
    < ControlLabel > Z - Score < /ControlLabel> < FormControl type = "text"
placeholder = "Enter Z-Score"
ref = "zScore"
value = {
    this.state.zScore
}
onChange = {
    this.handleChangeZScore
}
/> < /FormGroup > < /Col> < Col md = {
12
} >
< FormGroup >
    < ControlLabel > Address < /ControlLabel> < FormControl componentClass = "textarea"
placeholder = "Enter Address"
ref = "adddress"
value = {
    this.state.adddress
}
onChange = {
    this.handleChangeAddress
}
/> < /FormGroup > < /Col> < Col md = {
12
} >
< FormGroup >
    < ControlLabel > Telephone < /ControlLabel> < FormControl type = "text"
placeholder = "Enter phone number"
ref = "telephone"
value = {
    this.state.contactNumber
}
onChange = {
    this.handleChangeTelephone
}
/> < /FormGroup > < /Col>

< Col sm = {
        6
    } >
    < Button bsStyle = "danger"
onClick = {
    this.close
} > Close < /Button> < Button bsStyle = "success"
onClick = {
    this.close
}
type = "submit" > Submit < /Button> < /Col > < /Form> < /div > < /Modal.Body> < Modal.Footer > < /Modal.Footer > < /Modal>

< /div>

< div className = "modal-container" >
    < Modal show = {
        this.state.showModal2
    }
onHide = {
        this.closeEditPic
    }
    //show={this.state.show}
    //onHide={close}
    //container={this}
aria-labelledby = "contained-modal-title" >
    < Modal.Header closeButton >
    < Modal.Title id = "contained-modal-title" > Edit User < /Modal.Title> < /Modal.Header > < Modal.Body >

    < Image src = {
        this.state.imgURL
    }
responsive / >
    < div class = "upload-button" > Upload Image < /div> < input class = "file-upload"
onChange = {
    this.handleChange
}
ref = "myInput"
type = "file"
accept = "image/*" / >

    < div className = "hidden" >
    < img src = {
        this.state.hiddenURL
    }
ref = "hiddenImg" / >


    < /div>  < /Modal.Body > < Modal.Footer >
    < Col sm = {
        6
    } >
    < Button bsStyle = "danger"
onClick = {
    this.closeEditPic
} > Close < /Button> < Button bsStyle = "success"
onClick = {
        this.handleSubmit
    } > Save < /Button> < /Col > < /Modal.Footer> < /Modal >


    < /div>

< /div>
)
}

});
