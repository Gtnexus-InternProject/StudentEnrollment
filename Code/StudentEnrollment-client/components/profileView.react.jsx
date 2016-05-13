/**
 * Created by hrajapaksha on 5/12/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import request from 'superagent'
import {Image,Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, PageHeader, Col,ButtonGroup} from 'react-bootstrap';

module.exports = React.createClass({

    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            email: '',

        }

    },



    componentWillMount(){

        var userName=this.props.userName;
        request
            .get('http://localhost:3000/users/student/'+ userName )
            .set('Accept', 'application/json')
            .set('x-access-token', this.props.token)
            .end(function (err, res) {
                if (err) {
                    alert('error' + err);
                }
                else {
                    //alert('aaaa')

                    this.setState({

                        firstName: res.body.firstName,
                        lastName: res.body.lastName,
                        email: res.body.email,

                    });
                }
            }.bind(this));

    },


    render(){

        return (
        <div>
            <Panel  bsStyle="danger">
                <Col md={12} >
                <Image  src="img/pro.PNG" circle/>
                </Col><Col md={12} >
                <h3 ><strong>{this.state.firstName} {this.state.lastName}</strong> </h3>
                </Col> <Col md={12} >
                <h4 >{this.state.email}</h4></Col>
                <ButtonGroup vertical block>
                    <Button bsStyle="info">Edit Profile</Button>
                    <Button bsStyle="info">Edit Subject</Button>
                </ButtonGroup>
            </Panel>
        </div>
    )
   }


});