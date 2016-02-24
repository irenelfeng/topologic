import React from 'react';

export default class TaskItem extends React.Component {
  constructor() {
    super();
  }

  selected(e){
    this.props.editItem(this.props.task.title, this.props.task, this.type);
  }

  render() {
    var projectSection = '';
    var br = '';
    if (this.props.task.p) {
      projectSection = (<span className="project-title"> {this.props.task.p.name} </span>);
    }

    return (
      <div className={'list-item task-item ' +this.props.selected} onClick={this.selected.bind(this)}>
        <div className="icons-container">
          <img className="person-container" src="./img/person.png"/>
        </div>
        <div className="text-container">
          {projectSection}
          <span className="task-title"> {this.props.task.title} </span>
        </div>
      </div>
    );
  }
}
