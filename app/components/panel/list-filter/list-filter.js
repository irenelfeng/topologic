import React from 'react';
import TaskFilter from './task-filter';
import GroupFilter from './group-filter';
import NotifFilter from './notif-filter';

export default class ListFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
    };
  }

  render() {
    var filters = {
      tasks: (<TaskFilter setFilter={this.props.setFilter} />),
      groups: (<GroupFilter setFilter={this.props.setFilter} />),
      notifications: (<NotifFilter setFilter={this.props.setFilter} />)
    }

    return filters[this.props.active];
  }
}
