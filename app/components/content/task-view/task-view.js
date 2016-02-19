import React from 'react';
import FormView from '../form-view/form-view';

export default class TaskView extends React.Component { 
  constructor() {
    super();
  }

  render() {
    if (this.props.form)
      return (<FormView setForm = {this.props.setForm} type='newtask' />);

    return (
      <div> </div>
    );
  }
}
