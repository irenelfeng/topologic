import React from 'react';
import TaskItem from './list-item/task-item';
import GroupItem from './list-item/group-item';

export default class ListContainer extends React.Component { 
  constructor() {
    super();
    this.itemComponents = {
      projects: (item) => (<TaskItem key={item.id} task={item} />),
      groups: (item) => (<GroupItem key={item.id} group={item} />)
    }
  }

  render() {
    var items = [];
    if (this.props.active == 'projects') {
      this.props.items.forEach(p => {
        p.tasks.forEach(t => {
          items.push(t);
        });
      });
    }

    if (this.props.active == 'groups') {
      items = this.props.items;
    }

    var items = items.filter(this.props.filterFn).map((item) => this.itemComponents[this.props.active](item));

    return (
      <div id="list-container">
        {items}
      </div>
    );
  }
}