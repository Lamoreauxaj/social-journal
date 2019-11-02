import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar, NavItem } from 'react-materialize';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <div className="navContainer">
        <Navbar brand={<Link className="left" to="/">Feels</Link>} alignLinks="right" className="nav hide-on-med-and-down">
          <NavItem href="/journal">
            Journal
          </NavItem>
        </Navbar>
        <div className="contentContainer">
          {this.props.children}
        </div>
        <Footer className="bottomNav hide-on-large-only">
          <Link to="/journal">
            Journal
          </Link>
        </Footer>
      </div>
    );
  }
}

export default Nav;
