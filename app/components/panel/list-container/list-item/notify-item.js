import React from 'react';

export default class NotifyItem extends React.Component {
  constructor() {
    super();
  }

  selected(e) {
    console.log("hi");
  }

  render() {

    return (
      <div className={'list-item notify-item '+this.props.selected} onClick={this.selected.bind(this)}>
        <div className="icons-container">
          <img className="notif-container" src="./img/notifications.png" />
        </div>
        <div className="text-container">
          <span className="notif-link"> {this.props.notification.link} </span>
          <span className="notif-description"> {this.props.notification.description} </span>
        </div>
      </div>
    );
  }
}
