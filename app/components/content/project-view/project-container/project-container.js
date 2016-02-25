import React from 'react';
import ProjectHeader from './project-header';
import d3 from 'd3';
import Project from './project';
import Dragline from './drag-line';

export default class ProjectContainer extends React.Component { 
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed});
  }

  forceProjectUpdate() {
    this.forceUpdate();
    this.props.forcePanelUpdate();
  }

  render() {
    var projectBox = (
      <div id={'project-box-' + this.props.project.name.replace(/ /g, '_')} className="project-box">
        <Project project={this.props.project} addLink={this.props.addLink} deleteObject={this.props.deleteObject} forceProjectUpdate={this.forceProjectUpdate.bind(this)} />
      </div>
    );

    if (this.state.collapsed) projectBox = '';

    return (
      <div className="project-container" >
        <ProjectHeader project={this.props.project} onClick={this.toggleCollapse.bind(this)} setForm={this.props.setForm} />

        {projectBox}
      </div>
    );
  }
}
