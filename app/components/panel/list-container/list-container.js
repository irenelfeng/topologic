import React from 'react';
import TaskItem from './list-item/task-item';
import GroupItem from './list-item/group-item';

export default class ListContainer extends React.Component { 
  constructor() {
    super();
    this.itemComponents = {
      tasks: (item) => (<TaskItem key={item.id} task={item} />),
      groups: (item) => (<GroupItem key={item.id} group={item} />)
    }
  }

  render() {
    var items = this.props.items.filter(this.props.filterFn).map((item) => this.itemComponents[this.props.active](item));

    return (
      <div id="list-container">
        {items}
      </div>
    );
  }
}