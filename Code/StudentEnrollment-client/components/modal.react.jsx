/**
 * Created by hrajapaksha on 5/5/2016.
 */
var React = require('react'),
    ReactDOMServer = require('react-dom/server');
import {Form,Modal,Button,FormControl,FormGroup,ControlLabel,HelpBlock,Checkbox,Radio} from 'react-bootstrap';





const modalBodyAddSubject=(
    <div>
        <Form>
            <FormGroup>
                <ControlLabel>Email address</ControlLabel>
                <FormControl type="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <ControlLabel>First Name</ControlLabel>
                <FormControl type="text" placeholder="Enter text" />
            </FormGroup>

            <Button bsStyle="danger" type="button">
                Cancel
            </Button>
            <Button bsStyle="success" type="submit">Submit</Button>

        </Form>
    </div>
);

module.exports = React.createClass({





    getInitialState(){
        return { showModal: true };
    },

    close(){
        this.setState({ showModal: false });
    },

    open(){
        this.setState({ showModal: true });
    },


    render(){

        return (
            <div className="modal-container" style={{height: 200}}>
                  <Modal
                    show={this.state.showModal}
                    onHide={this.close}
                    //show={this.state.show}
                    //onHide={close}
                    //container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBodyAddSubject}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
