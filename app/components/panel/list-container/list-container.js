import React from 'react';
import TaskItem from './list-item/task-item';
import GroupItem from './list-item/group-item';
import NotifyItem from './list-item/notify-item';
import TutorialItem from './list-item/tutorial-item';

export default class ListContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: '',
    }

  }

  editItem(key, item, type) {
    this.setState({selected: key});
    //pass to main to change the content
    this.props.setForm(item);
  }

  clearSelect(){
    this.setState({selected: ''});
  }

  render() {
    var items = [];

    if (this.props.active == 'projects') {
      this.props.items.forEach(p => {
        p.tasks.forEach(t => {
          t.p = p;
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
      items = this.props.items;
    }

    var s = (item) => this.state.selected == item ? 'selected' : '';

    var itemComponents = {
        projects: (item) => (<TaskItem selected={s(item.title)} editItem={this.editItem.bind(this)} key={item.title} task={item}/>),
        groups: (item) => (<GroupItem selected={s(item.name)} editItem={this.editItem.bind(this)} key={item.name} group={item} />),
        notifications: (item) => (<NotifyItem selected={s(item.id)} editItem={this.props.editItem} key={item.id} notification={item} />),
        tutorials: (item) => (<TutorialItem selected={s(item.id)} editItem={this.props.editItem} key={item.id} tutorial={item} />)
      }

    // filtered items map to the current active icon items HTML
    items = items.filter(this.props.filterFn).map((item) => itemComponents[this.props.active](item));


    return (

      <div id="list-container">
        {items}
      </div>
    );
  }
}
