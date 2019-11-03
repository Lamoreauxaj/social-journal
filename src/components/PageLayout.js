import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageLayout.scss';

class PageLayout extends Component {
  render() {
    return (
      <div className={`pageLayout light-green ${this.props.className}`}>
        <h4 className="pageTitle light-green">{this.props.title}</h4>
        <div className="pageContainer row">
          <div className="col m8 offset-m2 l6 offset-l3">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

PageLayout.propTypes = {
  title: PropTypes.string
};

export default PageLayout;
