import React, { Component } from 'react';
import './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <div className="navContainer">
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
        <li>
          <a href="/journal">
            <i className="large material-icons">notes</i>
            Journal
          </a>
        </li>
      </ul>
    );
  }
}

export default Nav;
