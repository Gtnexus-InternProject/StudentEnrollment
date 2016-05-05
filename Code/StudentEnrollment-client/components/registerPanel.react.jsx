
/**
 * Created by hrajapaksha on 4/29/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');

import request from 'superagent'
import {Panel ,Form,FormControl,FormGroup,ControlLabel,HelpBlock,Checkbox,Radio,Button,PageHeader} from 'react-bootstrap';



const title = (
    <span>Panel title</span>

);

var userName;

module.exports = React.createClass({



        getInitialState() {
            return {userName: '',password:'',email:'',lastName:'',firstName:'',address:'',gender:'',alStream:'',telephone:'',zScore:''};
        },

        test12(){
            alert('rfcecr');

            userName = this.state.userName.trim(),
                setTimeout(() => {

                    request.get('http://localhost:3000/users/student/' +userName)
                        .set('Accept', 'application/json')
                        .end(function(err, res){
                            if(err){

                            }else if(res.status==200)
                            {
                                alert('Username is already taken')
                                retur
                            }

                            console.log(res.status);
                        } );
                    //var statusCode=fetch(values.userName);
                }, 1000)
        },

        handleChangeUserName: function(event) {
            this.setState({userName: event.target.value});
        },



        handleChangePassword: function(event) {
            //if(this.state.password.trim().length>1){
            this.setState({password: event.target.value});
            //}else {

            //
            //}
        },
        handleChangeEmail: function(event) {
            this.setState({email: event.target.value});
        },
        handleChangeLast: function(event) {
            this.setState({lastName: event.target.value});
        },
        handleChangeFirst: function(event) {
            this.setState({firstName: event.target.value});
        },
        handleChangeZScore: function(event) {
            this.setState({zScore: event.target.value});
        },
        handleChangeAddress: function(event) {
            this.setState({address: event.target.value});

        },
        handleChangeTelephone: function(event) {
            this.setState({telephone: event.target.value});

        },
        handleSubmit(data){
            alert('ggg');
            data.preventDefault();
            var formR={
                userName:this.state.userName.trim(),
                password:this.state.password.trim(),
                email:this.state.email.trim(),
                firstName: this.state.firstName.trim(),
                lastName:this.state.lastName.trim(),
                gender:this.state.gender.trim(),
                alStream:this.state.alStream.trim(),
                address:this.state.address.trim(),
                telephone:this.state.telephone.trim(),
                zScore:this.state.zScore.trim()
            }

            request.post('http://localhost:3000/users/student')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
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

            return ( <div>
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

                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl type="email" placeholder="Enter email"
                                         ref="email"
                                         value={this.state.email}
                                         onChange={this.handleChangeEmail}/>
                        </FormGroup>

                        <FormGroup >
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl type="text"
                                         placeholder="Enter First Name"
                                         ref="firstName"
                                         value={this.state.firstName}
                                         onChange={this.handleChangeFirst}/>
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl type="text"
                                         placeholder="Enter last Name"
                                         ref="lastName"
                                         value={this.state.lastName}
                                         onChange={this.handleChangeLast}/>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Gender</ControlLabel>
                            <FormControl componentClass="select" placeholder="select"
                                         ref="gender"
                                         value={this.setState(ref.target.value)}>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel>AL Stream</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" ref="alStresm">
                                <option value="1">Maths</option>
                                <option value="2">Biology</option>
                                <option value="3">Commerce</option>
                                <option value="4">Art</option>
                            </FormControl>
                        </FormGroup>

                        <FormGroup >
                            <ControlLabel>Z-Score</ControlLabel>
                            <FormControl type="text" placeholder="Enter Z-Score"
                                         ref="zScore"
                                         value={this.state.zScore}
                                         onChange={this.handleChangeZScore}/>
                        </FormGroup>

                        <FormGroup >
                            <ControlLabel>Address</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Enter Address"
                                         ref="address"
                                         value={this.state.address}
                                         onChange={this.handleChangeAddress} />
                        </FormGroup>

                        <FormGroup >
                            <ControlLabel>Telephone</ControlLabel>
                            <FormControl type="text" placeholder="Enter phone number"
                                         ref="telephone"
                                         value={this.state.telephone}
                                         onChange={this.handleChangeTelephone}/>
                        </FormGroup>

                        <Button bsStyle="danger" type="button">
                            Cancel
                        </Button>
                        <Button bsStyle="success" type="submit" >
                            Submit

                        </Button>

                    </Form>
                </Panel>

            </div>  )




        }
    }
)