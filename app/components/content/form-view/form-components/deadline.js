import React from 'react';
import Calendar from './calendar.js'

export default class Deadline extends React.Component {
  constructor() {
    super();
  }

  onClick(e) {
    this.props.setDeadline(e.target.checked);
  }

  render() {
    if (this.props.deadlineActivated)
      var deadlineEls = (<Calendar deadline={this.props.deadline} />);
    else deadlineEls = '';

    return (
      <div id="deadline-container" className="form-group">
        <div className="form-aligned-col1"> Time/Deadline: </div>
        <div className="form-aligned-col2">
          <input type="checkbox" className="form-aligned-col2-check" onClick={this.onClick.bind(this)} checked={this.props.deadlineActivated} />
          { deadlineEls }
        </div>
      </div>
    );
  }
}
