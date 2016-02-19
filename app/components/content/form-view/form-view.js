import React from 'react';
import NewTaskForm from './forms/new-task-form';

export default class FormView extends React.Component { 
  constructor() {
    super();
    this.forms = {
      'newtask': (<NewTaskForm />)
    }
  }

  render() {
    return (
      <div id="full-form">
        {this.forms[this.props.type]}
      </div>
    );
  }
}
