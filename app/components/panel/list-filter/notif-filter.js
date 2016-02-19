import React from 'react';

export default class NotifFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'alarm'
    };

    this.filterFns = {
      alarm: (task) => notif.alarm,
      history: (task) => true
    };
  }

  onClick(e) {
    var option = e.target.id.split('-')[2];
    this.setState({ selected: option });
    this.props.setFilter(this.filterFns[this.state.selected]);
  }

  render() {
    var s = (type) => this.state.selected == type ? 'selected' : '';

    return (
      <div id="notif-filter-container">
        <div id="notif-filter-alarm" className={'notif-filter-option ' + s('alarm')} onClick={this.onClick.bind(this)}>
          <img id="notif-filter-alarm-img" src="./img/alarm.png" />
        </div>
        <div id="notif-filter-history" className={'notif-filter-option ' + s('history')} onClick={this.onClick.bind(this)}> All Activity </div>
      </div>
    );
  }
}
