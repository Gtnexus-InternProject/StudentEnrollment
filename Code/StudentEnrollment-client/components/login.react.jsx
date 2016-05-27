/**
 * Created by hrajapaksha on 5/3/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');

import request from 'superagent';

var nocache = require('superagent-no-cache');


import {Router, Route, Link, browserHistory} from 'react-router';

import {Grid,Row,Carousel,Panel,Col,Form ,FormControl,FormGroup,ControlLabel,HelpBlock,Checkbox,Radio,Button,PageHeader} from 'react-bootstrap';

const title = (
    <h2>Login</h2>
);
module.exports = React.createClass({

    getInitialState() {
        return {userName: '', password: ''};
    },

    handleChangeUserName: function (event) {
        this.setState({userName: event.target.value});
    },

    handleChangePassword: function (event) {

        this.setState({password: event.target.value});

    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    handleSubmit(data){
        //alert('ggg');
        data.preventDefault();
        var formL = {
            userName: this.state.userName.trim(),
            password: this.state.password.trim(),
        }

        request.post('http://localhost:3000/users/authenticate')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(formL)
            .end(function (err, res) {
                if (err || !res.ok) {
                    //alert('Oh no! error');
                    console.log(err);
                } else {
                    var token = (res.body.token);

                    if (token) {
                        if(res.body.type == 'student') {
                            //alert('token is - ' + (token));
                            browserHistory.push('/home/' + formL.userName + '/' + token);
                        }else if(res.body.type == 'admin'){
                            //alert('token is - ' + (token));
                            browserHistory.push('/admin');
                        }else if(res.body.type == 'coordinator'){
                            //alert('token is - ' + (token));
                            browserHistory.push('/coordinator/' + formL.userName + '/' + token);

                        }

                    }
                    else {
                        alert("wrong username or password");
                        browserHistory.push('/login');
                        //res.send
                    }
                }
            })
    },
    render(){


        return (

            <Carousel>
                <Carousel.Item>
                    <img width={1366} height={768} alt="900x500" src="img/Hydrangeas.jpg"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1366} height={768} alt="900x500" src="img/Penguins.jpg"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1366} height={768} alt="900x500" src="img/Tulips.jpg"/>

                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>


                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={3}></Col>
                        <Col xs={6} md={6}>
                            <Panel header={title} bsStyle="info">

                                <Form horizontal onSubmit={this.handleSubmit}>
                                    <FormGroup >
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Username
                                        </Col>
                                        <Col sm={10}>
                                            <FormControl
                                                type="text"
                                                placeholder="Username"
                                                ref="userName"
                                                value={this.state.userName}
                                                onChange={this.handleChangeUserName}/>


                                        </Col>
                                    </FormGroup>

                                    <FormGroup >
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Password
                                        </Col>
                                        <Col sm={10}>
                                            <FormControl
                                                type="password"
                                                ref="password"
                                                value={this.state.password}
                                                onChange={this.handleChangePassword}/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={8}>
                                            <Checkbox>Remember me</Checkbox>
                                        </Col>
                                        <Col smOffset={1} sm={3}>
                                            <h6><Link to="/register">Register now </Link></h6>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={10} sm={2}>
                                            <Button bsStyle="success" type="submit">
                                                Sign in
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </Col>
                        <Col xs={6} md={3}></Col>
                    </Row></Grid>
            </Carousel>
        )
    }
});
