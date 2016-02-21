import React from 'react';
import NewTaskForm from './forms/new-task-form';
import NewProjectForm from './forms/new-project-form';
import NewGroupForm from './forms/new-group-form';

export default class FormView extends React.Component {
  constructor() {
    super();
  }

  render() {

    var forms = {
      'newtask': (<NewTaskForm newTask={this.props.newTask} changeForm ={this.props.changeForm} setForm={this.props.setForm} />),
      'newproject': (<NewProjectForm newProject={this.props.newProject} changeForm = {this.props.changeForm} setForm={this.props.setForm} />),
      'newgroup': (<NewGroupForm setForm={this.props.setForm} members = {this.props.members} />)
    };

    return (
      <div id={'form-'+ this.props.type}>
        {forms[this.props.type]}
      </div>
    );
  }
}
