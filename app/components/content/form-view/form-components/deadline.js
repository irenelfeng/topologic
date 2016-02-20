import React from 'react';
import DatePicker from './date-picker.js'

export default class Deadline extends React.Component {
  constructor() {
    super();
  }

  onClick(e) {
    this.props.setDeadline(e.target.checked);
  }

  render() {
    if (this.props.deadline)
      var deadlineEls = (<DatePicker />);
    else deadlineEls = '';

    return (
      <div id="deadline-container" className="form-group">
        <div className="form-aligned-col1"> Time/Deadline: </div>
        <div className="form-aligned-col2">
          <input type="checkbox" onClick={this.onClick.bind(this)}/>
          { deadlineEls }
        </div>
      </div>
    );
  }
}