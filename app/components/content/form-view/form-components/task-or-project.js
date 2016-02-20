import React from 'react';

export default class TaskOrProject extends React.Component {
  constructor() {
    super();
  }

  onClick(e) {
    var option = e.target.id.split('-')[0];
    var type = 'new' + option;
    this.props.changeForm(type);
  }

  render() {
    var s = (type) => this.props.type == type ? 'selected' : '';

    return (
      <div id="task-or-project-container">

        <div id="task-or-project-header">
          <div className="text-container"> New... </div>
        </div>

        <div id="option-containers">

          <div id="task-option" className={'option ' + s('task')} onClick={this.onClick.bind(this)}>
            <div className="text-container"> Task </div>
          </div>

          <div id="project-option" className={'option ' + s('project')} onClick={this.onClick.bind(this)}>
            <div className="text-container"> Project </div>
          </div>

        </div>
      </div>
    );
  }
}
