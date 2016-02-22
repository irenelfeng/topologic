import React from 'react';
import TaskItem from './list-item/task-item';
import GroupItem from './list-item/group-item';
import NotifyItem from './list-item/notify-item';
import TutorialItem from './list-item/tutorial-item';

export default class ListContainer extends React.Component {
  constructor() {
    super();
    this.itemComponents = {
      projects: (item) => (<TaskItem key={item.title} task={item} />),
      groups: (item) => (<GroupItem key={item.name} group={item} />),
      notifications: (item) => (<NotifyItem key={item.id} notification={item} />),
      tutorials: (item) => (<TutorialItem key={item.id} tutorial={item} />)
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

    if (this.props.active == 'notifications') {
      items = this.props.items;
    }

    if (this.props.active == 'tutorials') {
      this.props.items.forEach(p => {
        p.tasks.forEach(t => {
          items.push(t);
        });
      });
    }

    items = items.filter(this.props.filterFn).map((item) => this.itemComponents[this.props.active](item));

    return (
      <div id="list-container">
        {items}
      </div>
    );
  }
}
