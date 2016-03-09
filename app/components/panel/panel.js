import React from 'react';
import ListFilter from './list-filter/list-filter';
import ListContainer from './list-container/list-container';

export default class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
    };

    this.headerImgs = {
      projects: ("./img/plus.png"),
      groups: ("./img/plus.png"),
      //notifications: ("./img/sort.png"),
    };

    this.defaultFns = {
      projects: (task) => !task.done,
      groups: (group) => true,
      notifications: (notification) => notification.alarm,
      tutorials: (tutorial) => true
    };

    this.lastActive = null;
  }

  setFilter(fn) {
    if (fn != this.state.filterFn) {
      this.setState({
        filterFn: fn
      });
    }
  }

  resetFilter() {
    this.setState({
      filterFn: () => true
    });
    this.listContainer.clearSelect();
  }

  onHeader() {
    this.listContainer.clearSelect();
    this.props.setForm({});
  }

  render() {
    var itemsToPass = this.props.items[this.props.active];
    var href = this.headerImgs[this.props.active];

    var shouldReset = (this.lastActive == null || this.lastActive != this.props.active);
    this.lastActive = this.props.active;

    if (shouldReset)
      this.state.filterFn = this.defaultFns[this.props.active];

    return (
      <div id="panel">
        <div id="panel-header-container">
          <div id="panel-header"> {this.props.active} </div>
          <img id="panel-plus" src={href} onClick={this.onHeader.bind(this)} />
        </div>
        <ListFilter active={this.props.active} setFilter={this.setFilter.bind(this)} />
        <ListContainer ref={(ref) => this.listContainer = ref} setForm={this.props.setForm} active={this.props.active} filterFn={this.state.filterFn} groups={this.props.items.groups} items={itemsToPass} />
      </div>
    );
  }
}
