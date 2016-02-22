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
  * changes the form only from task -> project. 
  */ 
  changeForm(key) {
    this.setState({type: key});
  }

  render() {
    if (this.props.form[this.props.active] != null)
      return (<FormView saveObject={this.props.saveObject} changeForm={this.changeForm.bind(this)} setForm = {this.props.setForm} type={this.state.type} />);

    var projects = this.props.projects.map((p, i) => (<ProjectContainer key={i} project={p} addLink={this.props.addLink} />));

    return (
      <div> 
        {projects}
      </div>
    );
  }
}
