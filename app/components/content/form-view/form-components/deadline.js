import React from 'react';
import Calendar from './date-picker.js'

export default class Deadline extends React.Component {
  constructor() {
    super();
  }

  onClick(e) {
    this.props.setDeadline(e.target.checked);
  }

  render() {
    if (this.props.deadline)
      var deadlineEls = (<Calendar />);
    else deadlineEls = '';

    return (
      <div id="deadline-container" className="form-group">
        <div className="form-aligned-col1"> Time/Deadline: </div>
        <div className="form-aligned-col2">
          <input type="checkbox" className="form-aligned-col2-check" onClick={this.onClick.bind(this)}/>
          { deadlineEls }
        </div>
      </div>
    );
  }
}
