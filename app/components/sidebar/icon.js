import React from 'react';

export default class Icon extends React.Component {
  constructor() {
    super();
  }

  onClick(e) {
    if (this.props.icon != this.props.active) {
      this.props.setActive(this.props.icon);
    }
  }

  render() {
    var selected = (this.props.icon == this.props.active) ? 'selected' : '';

    if (this.props.icon == 'notifications') {
      var numUnread = this.props.notifications.filter(n => n.unread).length;
      if (numUnread > 0) {
        var ping = (
          <svg className="ping">
            <circle cx="10" cy="10" r='7' style={{fill:'#FB6926'}}/>
            <text x="7" y="15" fill="white" fontSize="small">{numUnread}</text>
          </svg>
        );
      }
      else ping = '';
    }
    else ping = '';

    return (
      <div className={"icon-div icon-" + this.props.icon}>
        <img className={"icon-img " + selected} onClick={this.onClick.bind(this)} src = {'./img/' + this.props.icon + '.png'} />
        {ping}
      </div>
    );
  }
}
