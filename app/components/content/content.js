import React from 'react';
import ProjectView from './project-view/project-view';
import GroupView from './group-view/group-view';

export default class Content extends React.Component { 
  constructor() {
    super();
  }

  /**
   * Set the filter to use function `fn` in the panels
   * @param {Function} fn
   */
  setFilter(fn) {
    if (fn != this.state.filterFn) {
      this.setState({
        filterFn: fn
      });
    }
  }

  /**
   * Either render group view or project view depending on props.active
   */
  render() {
    var views = {
      projects: (
        <ProjectView active={this.props.active}
          saveObject={this.props.saveObject}
          deleteObject={this.props.deleteObject}
          setForm = {this.props.setForm}
          form={this.props.form}
          items={this.props.items}
          projects={this.props.items.projects}
          addLink={this.props.addLink}
          forcePanelUpdate={this.props.forcePanelUpdate} />),

      groups: (
        <GroupView 
          active={this.props.active}
          saveObject={this.props.saveObject}
          deleteObject={this.props.deleteObject}
          setForm={this.props.setForm}
          form={this.props.form}
          groups={this.props.items.groups}
          forcePanelUpdate={this.props.forcePanelUpdate} />)
    };

    return (
      <div id="content">
        {views[this.props.active]}
      </div>
    );
  }
}
