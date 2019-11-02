import React, { Component } from 'react';
import JournalEntry from './JournalEntry.js';

class Journal extends Component {
  constructor() {
    super();
    this.state = {
      entry: ''
    }
    this.onSaveEntry = this.onSaveEntry.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  render() {
    return (
      <div className="journal">
        <h4>Journal</h4>
        <JournalEntry prompt="Type a short journal entry below." text={this.state.entry} onChange={this.onChange}/>
        <button className="btn saveButton light-green darken-2" onClick={this.onSaveEntry}>Save Entry</button>
      </div>
    );
  }
  onChange(event) {
    this.setState({ entry: event.target.value });
  }
  onSaveEntry() {
    
  }
}

export default Journal;
