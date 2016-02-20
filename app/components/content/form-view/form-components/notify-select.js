import React from 'react';

export default class NotifySelect extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div id="notify-select" className="form-group">
          <div className="form-aligned-col1"> Notify me... </div>
          <div className="form-aligned-col2-list">
            <div className="form-aligned-col2-list-item">
              <input type="checkbox" className="form-aligned-col2-check" />
              <div className="form-aligned-col2-text"> When task is completed </div>
            </div>
            <div className="form-aligned-col2-list-item">
              <input type="checkbox" className="form-aligned-col2-check" />
              <div className="form-aligned-col2-text"> 15 mins before the deadline </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
