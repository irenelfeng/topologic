import React from 'react';
import ReactSelectize from 'react-selectize';

export default class NotifySelect extends React.Component {
  constructor() {
    super();
  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;
    var options = ["minutes", "hours", "days"].map(function(val){
      return {label: val, value: val}
    });

    if (this.props.deadline) {
      var deadlineEls =
      (<div className="form-aligned-col2-list-item">
        <input type="checkbox" className="form-aligned-col2-check" />
        <div className="form-aligned-col2-notif">
          <input className="notif-num" placeholder="15" />
          <SimpleSelect
              defaultValue = {{label: "minutes", value: "minutes"}}
              options = {options}
              placeholder = "Select a unit of time"
          />
          <div className="notif-text"> before the deadline </div>
        </div>
      </div>)
    }
    else deadlineEls ='';

    return (
      <div>
        <div id="notify-select" className="form-group">
          <div className="form-aligned-col1"> Notify me... </div>
          <div className="form-aligned-col2-list">
            <div className="form-aligned-col2-list-item">
              <input type="checkbox" className="form-aligned-col2-check" />
              <div className="form-aligned-col2-text"> When task is completed </div>
            </div>
            { deadlineEls }
          </div>
        </div>
      </div>
    );
  }
}
