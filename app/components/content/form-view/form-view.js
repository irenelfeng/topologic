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
      'task': (<NewTaskForm items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.props.changeForm} setForm={this.props.setForm} />),
      'project': (<NewProjectForm items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.props.changeForm} setForm={this.props.setForm} />),
      'group': (<NewGroupForm form={this.props.form} saveObject={this.props.saveObject} setForm={this.props.setForm} />)
    };

    return (
      <div id={'form-'+ this.props.type}>
        {forms[this.props.type]}
      </div>
    );
  }
}
