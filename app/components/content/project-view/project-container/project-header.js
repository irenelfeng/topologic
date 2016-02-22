import React from 'react';

export default class ProjectHeader extends React.Component { 
  constructor() {
    super();
  }

  render() {
    var completeds = this.props.project.tasks.filter(task => task.done);
    var notcompleteds = this.props.project.tasks.filter(task => !task.done);

    var progressBar = [];

    completeds.forEach((task, i) => {
      progressBar.push((<div className="progress-bar-item done" key={'filledbar-item-' + this.props.project.name + '-' + i.toString()}> </div>));
    });

    notcompleteds.forEach((task, i) => {
      progressBar.push((<div className="progress-bar-item notdone" key={'unfilledbar-item-' + this.props.project.name + '-' + i.toString()}> </div>))
    });

    return (
      <div className="project-header">

        <div className="img-container">
          <img src={this.props.project.imgSrc} />
        </div>

        <div className="non-picture-els">
          <span> {this.props.project.name} </span>
          <div className="progress-bar"> 
            {progressBar}
          </div>
        </div>

      </div>
    );
  }
}
