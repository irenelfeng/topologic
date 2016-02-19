import React from 'react';
import FormView from '../form-view/form-view';

export default class TaskView extends React.Component { 
  constructor() {
    super();
  }

  render() {
    if (this.props.tasks.length == 0)
      return (<FormView type='newtask' />);

    
  }
}
