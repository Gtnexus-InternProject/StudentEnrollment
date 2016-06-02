/**
 * Created by hrajapaksha on 4/29/2016.
 */
var React = require('react');
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router'

module.exports = React.createClass({

    logout(event) {
      localStorage.removeItem('token' );
      localStorage.removeItem('type' );
      localStorage.removeItem('user' );
    },
    render() {
        return (
        //<h1> Test </h1> < Navbar inverse > <Navbar.Header>
        // <a href="#"></a>
        /**

        <Nav>
          <Navbar.Text>
            Signed in as:<NavItem href="#">{this.props.userName}</NavItem>
          </Navbar.Text>

        </Nav>


        < Navbar.Text pullRight >
            <Navbar.Link >
              <Link onClick={this.logout} to="/login">
                  logout
              </Link>
            </Navbar.Link>
        < /Navbar.Text>
        **/
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
                <Nav pullRight>
                  <NavItem onClick={this.logout} href="/login">Logout</NavItem>
                </Nav>


              </Navbar.Collapse >
               </Navbar>)
    }
});
