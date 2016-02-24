import React from 'react';
import FormView from '../form-view/form-view';
import ProjectContainer from './project-container/project-container';
import FloatingTask from './floating-task';

export default class ProjectView extends React.Component { 
  constructor() {
    super();
    this.state = {
      type: 'task'
    }
  } 

  /*
   * Changes the form from task -> project. 
   */ 
  changeForm(key) {
    this.setState({type: key});
  }

  render() {
    if (this.props.form[this.props.active] != null)
      return (<FormView items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.changeForm.bind(this)} setForm={this.props.setForm} type={this.state.type} />);

    var projects = [];
    var nullProject = null;
    this.props.projects.forEach(p => {
      if (p.name != null)
        projects.push(p)
      else
        nullProject = p;
    });

    var projects = projects.map((p, i) => (<ProjectContainer key={i} project={p} addLink={this.props.addLink} />));
    var floatingTasks = nullProject.tasks.map((t, i) => (<FloatingTask key={i} task={t} />));

    return (
      <div className="project-view-container"> 
        {projects}
        {floatingTasks}
      </div>
    );
  }
}
