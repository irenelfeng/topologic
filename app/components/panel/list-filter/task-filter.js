import React from 'react';

export default class TaskFilter extends React.Component { 
  constructor() {
    super();
    this.state = {
      selected: 'progress'
    };

    this.filterFns = {
      important: (task) => task.important,
      progress: (task) => !task.done,
      complete: (task) => task.done
    };
  }

  onClick(e) {
    var option = e.target.id.split('-')[2];
    this.setState({ selected: option });
    this.props.setFilter(this.filterFns[this.state.selected]);
  }

  render() {
    var s = (type) => this.state.selected == type ? 'selected' : '';

    return (
      <div id="task-filter-container">
        <div id="task-filter-important" className={'task-filter-option ' + s('important')} onClick={this.onClick.bind(this)}> 
          <img id="task-filter-important-img" src="./img/important.png" />
        </div>
        <div id="task-filter-progress" className={'task-filter-option ' + s('progress')} onClick={this.onClick.bind(this)}> In Progress </div>
        <div id="task-filter-complete" className={'task-filter-option ' + s('complete')} onClick={this.onClick.bind(this)}> Complete </div>
      </div>
    );
  }
}
