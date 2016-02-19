import React from 'react';
import NewTaskForm from './forms/new-task-form';

export default class FormView extends React.Component { 
  constructor() {
    super();
    console.log("formView");
    console.log(this.props);

  }

  render() {
    var forms = {
      'newtask': (<NewTaskForm setForm={this.props.setForm}/>)
    };

    return (
      <div id="full-form" >
        {forms[this.props.type]}
      </div>
    );
  }
}
