import React from 'react';
import TaskView from './task-view/task-view';
import GroupView from './group-view/group-view';

export default class Content extends React.Component { 
  constructor() {
    super();
  }

  setFilter(fn) {
    if (fn != this.state.filterFn) {
      this.setState({
        filterFn: fn
      });
    }
  }

  render() {
    var views = {
      tasks: (<TaskView  />),
      groups: (<GroupView  />)
    };

    return (
      <div id="content">
        {views[this.props.active]}
      </div>
    );
  }
}
