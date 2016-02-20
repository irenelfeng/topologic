import React from 'react';

export default class ProjectFilter extends React.Component {
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
    this.props.setFilter(this.filterFns[option]);
  }

  render() {
    var s = (type) => this.state.selected == type ? 'selected' : '';

    return (
      <div id="project-filter-container">
        <div id="project-filter-important" className={'project-filter-option ' + s('important')} onClick={this.onClick.bind(this)}>
          <img id="project-filter-important-img" src="./img/important.png" />
        </div>
        <div id="project-filter-progress" className={'project-filter-option ' + s('progress')} onClick={this.onClick.bind(this)}> In Progress </div>
        <div id="project-filter-complete" className={'project-filter-option ' + s('complete')} onClick={this.onClick.bind(this)}> Complete </div>
      </div>
    );
  }
}
