import React from 'react';

export default class TaskOrProject extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: 'task'
    };
  }

  onClick(e) {
    var option = e.target.id.split('-')[0];
    this.setState({ selected: option });
    //do props to change the form
    this.props.changeForm(option);
    
  }

  render() {

    var s = (type) => this.state.selected == type ? 'selected' : '';

    return (
      <div id="task-or-proj-container">
        <div id="task-option" className={'option ' + s('task')} onClick={this.onClick.bind(this)}> Task </div>
        <div id="project-option" className={'option ' + s('project')} onClick={this.onClick.bind(this)}> Project </div>
      </div>
    );
  }
}
