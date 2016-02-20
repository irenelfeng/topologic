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
      'newtask': (<NewTaskForm setForm={this.props.setForm} />),
      'newproject': (<NewProjectForm setForm={this.props.setForm} />),
      'newgroup': (<NewGroupForm setForm={this.props.setForm} />)
    };

    return (
      <div id="full-form" >
        {forms[this.props.type]}
      </div>
    );
  }
}
