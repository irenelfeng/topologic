import React from 'react';
import FormView from '../form-view/form-view';
import ProjectContainer from './project-container/project-container';

export default class ProjectView extends React.Component { 
  constructor() {
    super();
  }

  render() {
    if (this.props.form)
      return (<FormView newTask = {this.props.newTask} setForm = {this.props.setForm} type='newtask' />);

    var projects = this.props.projects.map((p, i) => (<ProjectContainer key={i} project={p} />));

    return (
      <div> 
        {projects}
      </div>
    );
  }
}
