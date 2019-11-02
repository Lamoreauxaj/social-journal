import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JournalEntry.scss';

class JournalEntry extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="journal row">
        <span className="prompt">{this.props.prompt}</span>
        <textarea value={this.props.text} className="journalText col s8 offset-s2" placeholder="Journal anything on your mind..." onChange={this.props.onChange}>

        </textarea>
      </div>
    );
  }
}

JournalEntry.propTypes = {
  prompt: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func
};

export default JournalEntry;
