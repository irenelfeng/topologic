import React from 'react';
import ProjectHeader from './project-header';

export default class ProjectContainer extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div className="project-container">
        <ProjectHeader project={this.props.project} />
      </div>
    );
  }
}
