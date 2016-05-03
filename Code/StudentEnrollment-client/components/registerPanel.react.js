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
            return {text: ''};
        },

        handleTextChange(e) {
            this.setState({text: e.target.value});
            console.log(text);
        },

       handleSubmit(data){
           alert('ggg');
           data.preventDefault();
           var text = this.state.text.trim();
           console.log(this);

           //this.setState({value: event.target.value});
           ////let theform = data.refs.register.value();
           ////console.log(theform);
           //
           //console.log(this);

            //request.post('http://localhost:3000/users/student')
            //    .set('Accept', 'application/json')
            //    .send(data)
            //    .withCredentials()
            //    .end(function (err, res) {
            //        if (err || !res.ok) {
            //            console.log('Oh no! error');
            //        } else {
            //            console.log('yay got ' + JSON.stringify(data));
            //        }
            //    })


       },

        render(){

            return ( <div>
                <Panel header={title} bsStyle="primary">
                    <PageHeader>Titledc
                        <small></small>
                    </PageHeader>

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>User Name</ControlLabel>
                            <FormControl type="text" placeholder="Enter text"
                                value={this.state.text}
                                         onChange={this.handleTextChange}
                                />

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
