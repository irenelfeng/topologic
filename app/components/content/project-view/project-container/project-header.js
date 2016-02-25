import React from 'react';

export default class ProjectHeader extends React.Component { 
  constructor() {
    super();
    this.type = 'project';
  }

  editForm(){
    this.props.setForm(this.props.project);
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
      <div className="project-header" onClick={this.props.onClick} >

        <div className="img-container">
          <img src={this.props.project.imgSrc} />
        </div>

        <div className="non-picture-els">
          <span> {this.props.project.name} </span>
          <div className="progress-bar"> 
            {progressBar}
          </div>
        </div>
        <div className="edit-container">
          <img onClick={this.editForm.bind(this)} src="./img/edit.png" />
        </div>

      </div>
    );
  }
}
