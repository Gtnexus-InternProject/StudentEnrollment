/**
 * Created by hrajapaksha on 5/3/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');

import StyleSheet from 'react-stylesheet';
import request from 'superagent';
import Alert from './alert.react';
import { Link } from 'react-router'

import {Grid,Row,Carousel,Panel,Col,Form ,FormControl,FormGroup,ControlLabel,HelpBlock,Checkbox,Radio,Button,PageHeader} from 'react-bootstrap';

//const styless = StyleSheet.createStyleSheet({
//    base: {
//        width: 1366,
//        height: 768,
//        }
//});
const title = (
    <h2>Login</h2>
);
module.exports = React.createClass({

    getInitialState() {
        return {userName: '',password:''};
    },

    handleChangeUserName: function(event) {
        this.setState({userName: event.target.value});
    },

    handleChangePassword: function(event) {

        this.setState({password: event.target.value});

    },

    handleSubmit(data){
        alert('ggg');
        data.preventDefault();
        var formL={
            userName:this.state.userName.trim(),
            password:this.state.password.trim(),
        }
        //console.log(formL.userName);
        //request.get('http://localhost:3000/users/student/authenticate/'+formL.userName+'/'+formL.password)
        request.post('http://localhost:3000/users/student/authenticate')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(formL)

            .withCredentials()
            .end(function(err, res){
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    var token=(res.body.token);

                    if(token){
                        alert('token is - ' + (token));
                        return <Link to="/hello" />;
                    }
                    else{

                        alert("wrong username or password");

                    //res.send

                }}})
              },


    render(){


        return (

            <Carousel>
                <Carousel.Item>
                    <img  width= {1366} height= {768} alt="900x500" src="img/Hydrangeas.jpg"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1366} height= {768} alt="900x500" src="img/Penguins.jpg"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1366} height= {768} alt="900x500" src="img/Tulips.jpg"/>

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
                                        <h6><Link to="/hello">Register now </Link></h6>
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