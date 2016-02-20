import React from 'react';

export default class NotifySelect extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.deadline) {
      var deadlineEls =
      (<div className="form-aligned-col2-list-item">
        <input type="checkbox" className="form-aligned-col2-check" />
        <div className="form-aligned-col2-notif">
          <input className="notif-num" placeholder="15" />
          <div className="notif-dropdown"> minutes </div>
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
