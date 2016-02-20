import React from 'react';

export default class ProjectHeader extends React.Component { 
  constructor() {
    super();
  }

  render() {
    var completeds = this.props.project.tasks.filter(task => task.done);
    var notcompleteds = this.props.project.tasks.filter(task => !task.done);

    var progressBar = [];

    completeds.forEach(task => {
      progressBar.push((<div className="progress-bar-item done"> </div>));
    });

    notcompleteds.forEach(task => {
      progressBar.push((<div className="progress-bar-item notdone"> </div>))
    });

    return (
      <div className="project-header">
        <img src={this.props.project.imgSrc} />
        <span> {this.props.project.name} </span>
        <div className="progress-bar"> 
          {progressBar}
        </div>
      </div>
    );
  }
}
