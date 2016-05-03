/**
 * Created by hrajapaksha on 5/3/2016.
 */

var React = require('react'),
    ReactDOMServer = require('react-dom/server');

import StyleSheet from 'react-stylesheet'
import request from 'superagent'

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
                        <Col xs={6} md={4}></Col>
                        <Col xs={6} md={4}>
                            <Panel header={title} bsStyle="info">

                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Username
                                        </Col>
                                        <Col sm={10}>
                                            <FormControl type="text" placeholder="Username"/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalPassword">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Password
                                        </Col>
                                        <Col sm={10}>
                                            <FormControl type="password" placeholder="Password"/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Checkbox>Remember me</Checkbox>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Button bsStyle="success" type="submit">
                                                Sign in
                                            </Button>
                                        </Col>



                                </FormGroup>
                            </Form>

                        </Panel>
                        </Col>
                        <Col xs={6} md={4}></Col>
                    </Row></Grid>
            </Carousel>
        )
    }
});