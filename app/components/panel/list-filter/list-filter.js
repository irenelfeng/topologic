import React from 'react';
import ProjectFilter from './project-filter';
import GroupFilter from './group-filter';
import NotifFilter from './notif-filter';
import TutorialFilter from './tutorial-filter';

export default class ListFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
    };
  }

  render() {
    var filters = {
      projects: (<ProjectFilter setFilter={this.props.setFilter} />),
      groups: (<GroupFilter setFilter={this.props.setFilter} />),
      notifications: (<NotifFilter setFilter={this.props.setFilter} />),
      tutorials: (<TutorialFilter setFilter={this.props.setFilter} />)
    }

    return filters[this.props.active];
  }
}
