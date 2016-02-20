import React from 'react';

export default class NotifyItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-item notify-item">
        <span> {this.props.notify.title} </span>
      </div>
    );
  }
}
