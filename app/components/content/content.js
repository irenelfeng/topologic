import React from 'react';
import ProjectView from './project-view/project-view';
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
      projects: (<ProjectView setForm = {this.props.setForm} form={this.props.form} projects={this.props.items.groups} />),
      groups: (<GroupView setForm = {this.props.setForm} form={this.props.form} groups={this.props.items.tasks} />)
    };

    return (
      <div id="content">
        {views[this.props.active]}
      </div>
    );
  }
}
