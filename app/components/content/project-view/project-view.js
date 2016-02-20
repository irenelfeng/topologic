import React from 'react';
import FormView from '../form-view/form-view';
import ProjectContainer from './project-container/project-container';

export default class ProjectView extends React.Component { 
  constructor() {
    super();
  }

  render() {
    if (this.props.form)
      return (<FormView setForm = {this.props.setForm} type='new' />);

    var projects = this.props.projects.map((p, i) => (<ProjectContainer key={i} project={p} />));

    return (
      <div> 
        {tasks}
      </div>
    );
  }
}
