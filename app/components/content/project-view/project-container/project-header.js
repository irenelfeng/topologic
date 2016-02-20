import React from 'react';

export default class ProjectHeader extends React.Component { 
  constructor() {
    super();
  }

  render() {
    debugger;
    var completeds = this.props.project.tasks.filter(task => task.done);
    var notcompleteds = this.props.project.tasks.filter(task => !task.done);

    var progressBar = [];

    completeds.forEach((task, i) => {
      progressBar.push((<div className="progress-bar-item done" key={'bar-item-' + i.toString()}> </div>));
    });

    notcompleteds.forEach((task, i) => {
      progressBar.push((<div className="progress-bar-item notdone" key={'bar-item-' + i.toString()}> </div>))
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
