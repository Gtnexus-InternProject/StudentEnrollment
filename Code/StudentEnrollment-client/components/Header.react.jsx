/**
 * Created by hrajapaksha on 4/29/2016.
 */
var React = require('react');
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router'

module.exports = React.createClass({

    logout(event) {
      localStorage.removeItem('token' );
    },
    render() {
        return (
        //<h1> Test </h1> < Navbar inverse > <Navbar.Header>
        // <a href="#"></a>
        <Navbar inverse>
   <Navbar.Header>
            <Navbar.Brand>
              <Navbar.Link href="#">Student Enrollment System</Navbar.Link>

            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        < Navbar.Collapse >
        <Navbar.Text>
            Signed in as:
            <Navbar.Link href="#">{this.props.userName}</Navbar.Link>
        </Navbar.Text>
        < Navbar.Text pullRight >
        <Navbar.Link >
            <Link onClick={this.logout} to="/login">
                logout
            </Link>
        </Navbar.Link>
        < /Navbar.Text>
                </Navbar.Collapse >
               </Navbar>)
    }
});
