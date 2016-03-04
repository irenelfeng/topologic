import React from 'react';
import FormView from '../form-view/form-view';
import ProjectContainer from './project-container/project-container';

export default class ProjectView extends React.Component { 
  constructor() {
    super();
    this.state = {
      type: 'task'
    }
  } 

  /*
   * Changes the form type from task -> project. 
   */ 
  changeForm(key) {
    this.setState({type: key});
  }

  render() {
    if (this.props.form.projects != null)
      /**
       * If there's nothing, must be a new form     
       */
      if (Object.keys(this.props.form.projects).length == 0) 
        return (<FormView items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.changeForm.bind(this)} deleteObject={this.props.deleteObject} setForm={this.props.setForm} type={this.state.type} />);
      /**
       * If this.props.form.projects.title is set, it's a project form
       * (tasks have the `name` property)
       */
      else if (this.props.form.projects.title)
        return (<FormView items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.changeForm.bind(this)} deleteObject={this.props.deleteObject} setForm={this.props.setForm} type='task' />);
      /**
       * Must be a task edit form!
       */
      else
        return (<FormView items={this.props.items} form={this.props.form} saveObject={this.props.saveObject} changeForm={this.changeForm.bind(this)} deleteObject={this.props.deleteObject} setForm={this.props.setForm} type='project'/>);

    
    var projects = this.props.projects.map((p, i) => (<ProjectContainer key={i} project={p} addLink={this.props.addLink} deleteObject={this.props.deleteObject} setForm={this.props.setForm} forcePanelUpdate={this.props.forcePanelUpdate} />));
    return (
      <div className="project-view-container"> 
        {projects}
      </div>
    );
  }
}
