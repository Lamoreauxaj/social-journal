import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JournalEntry.scss';

class JournalEntry extends Component {
  constructor(props) {
    super();

    this.state = {
      title: props.title,
      prompt: props.prompt,
      post: props.post
    };

    this.renderWrite = this.renderWrite.bind(this);
    this.renderEntry = this.renderEntry.bind(this);
    this.renderLargeEntry = this.renderLargeEntry.bind(this);
    this.capString = this.capString.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  render() {
    if (this.props.write) {
      return this.renderWrite();
    }
    else {
      if (this.props.large)
        return this.renderLargeEntry();
      else
        return this.renderEntry();
    }
  }
  renderWrite() {
    return (
      <div className="journal row">
        <input className="title" value={this.state.title} onChange={(e) => this.onChange(e, 'title')}></input>
        <span className="prompt">{this.state.prompt}</span>
        <textarea value={this.state.post} className="journalInput col s12" placeholder="Journal anything on your mind..." onChange={(e) => this.onChange(e, 'post')}>
        </textarea>
      </div>
    );
  }
  onChange(event, key) {

    let obj = {
      title: this.state.title,
      prompt: this.state.prompt,
      post: this.state.post
    };
    console.log(event.target.value);
    obj[key] = event.target.value;
    this.setState(obj, () => {
      this.props.onChange({
        title: this.state.title,
        prompt: this.state.prompt,
        post: this.state.post
      })
    })
  }
  renderEntry() {
    return (
      <div className="journal row">
        <span className="title title-small">{this.props.title}</span>
        <span className="date date-small">{this.props.date}</span>
        <span className="prompt prompt-small">{this.props.prompt}</span>
        <textarea className="journalText col s12" disabled value={this.capString(this.props.text)}>
        </textarea>
      </div>
    );
  }
  renderLargeEntry() {
    return (
      <div className="journal row">
        <h4 className="title">{this.props.title}</h4>
        <h6 className="date">{this.props.date}</h6>
        <h6 className="prompt">{this.props.prompt}</h6>
        <textarea className="journalTextLarge col s12" disabled value={this.props.text}>
        </textarea>
      </div>
    );
  }
  capString(str) {
    if (str.length > 80)
      return str.substring(0, 80) + '...';
    else
      return str;
  }
}

JournalEntry.propTypes = {
  prompt: PropTypes.string,
  text: PropTypes.string,
  write: PropTypes.bool,
  large: PropTypes.bool,
  onChange: PropTypes.func
};

export default JournalEntry;
