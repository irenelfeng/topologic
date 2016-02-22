import React from 'react';
import ProjectHeader from './project-header';
import d3 from 'd3';
import Project from './project';
import Dragline from './drag-line';

export default class ProjectContainer extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div className="project-container" >
        <ProjectHeader project={this.props.project} />

        <div id={'project-box-' + this.props.project.name} className="project-box">
          <Project project={this.props.project} addLink={this.props.addLink} />
        </div>
      </div>
    );
  }
}
