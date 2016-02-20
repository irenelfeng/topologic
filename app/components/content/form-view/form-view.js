import React from 'react';
import NewTaskForm from './forms/new-task-form';
import NewProjectForm from './forms/new-project-form';
import NewGroupForm from './forms/new-group-form';

export default class FormView extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 'newtask'
    };
  }

  changeForm(key) {
    this.setState({type: key});
  }

  render() {
    var forms = {
      'newtask': (<NewTaskForm changeForm ={this.changeForm.bind(this)} setForm={this.props.setForm} />),
      'newproject': (<NewProjectForm changeForm = {this.changeForm.bind(this)} setForm={this.props.setForm} />),
      'newgroup': (<NewGroupForm setForm={this.props.setForm} />)
    };

    return (
      <div id={'form-'+ this.state.type}>
        {forms[this.state.type]}
      </div>
    );
  }
}
