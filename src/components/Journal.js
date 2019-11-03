import React, { Component } from 'react';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';

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
      <PageLayout title="Journal">
        <JournalEntry write prompt="Type a short journal entry below." text={this.state.entry} onChange={this.onChange}/>
        <button className="btn saveButton light-green darken-2" onClick={this.onSaveEntry}>Save Entry</button>
      </PageLayout>
    );
  }
  onChange(event) {
    this.setState({ entry: event.target.value });
  }
  onSaveEntry() {
    
  }
}

export default Journal;
