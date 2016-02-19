import React from 'react';
import FormView from '../form-view/form-view';
import TaskCircle from './task-circle';

export default class TaskView extends React.Component { 
  constructor() {
    super();
  }

  render() {
    if (this.props.form)
      return (<FormView setForm = {this.props.setForm} type='newtask' />);

    var tasks = this.props.tasks.map((t, i) => (<TaskCircle key={i} />));

    return (
      <div> 
        {tasks}
      </div>
    );
  }
}
