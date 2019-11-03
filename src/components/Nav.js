import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <div className="navContainer">
        <div style={{flexGrow: "1", display: 'flex', flexDirection: 'column'}}>
          <nav className="nav-wrapper hide-on-med-and-down light-green">
            <a className="brand-logo" href="/">
              <i className="large material-icons">menu_book</i>
              Feels
            </a>
            {this.renderLinks("right")}
          </nav>
          <div className="contentContainer">
            {this.props.children}
          </div>
        </div>
        <nav className="bottomNav page-footer hide-on-large-only light-green">
          <a className="brand-logo left" href="/">
            <i className="large material-icons">menu_book</i>
          </a>
          {this.renderLinks("center")}
        </nav>
      </div>
    );
  }
  renderLinks(direction) {
    return (
      <ul className={`${direction}`}>
        <li className={this.props.location.pathname.substring(0, 8) === '/journal' ? 'active' : ''}>
          <a href="/journal">
            <i className="large material-icons">notes</i>
            Journal
          </a>
        </li>
        <li className={this.props.location.pathname.substring(0, 9) === '/messages' ? 'active' : ''}>
          <a href="/messages">
            <i className="large material-icons">message</i>
            Messages
          </a>
        </li>
        <li className={this.props.location.pathname.substring(0, 5) === '/user' ? 'active' : ''}>
          <a href="/user">
            <i className="large material-icons">face</i>
            User
          </a>
        </li>
      </ul>
    );
  }
}

export default withRouter(Nav);
