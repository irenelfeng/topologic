import React from 'react';

export default class TutorialFilter extends React.Component {
  constructor() {
    super();
  }

  onChange(e) {
    var text = e.target.value;
    this.props.setFilter((tutorial) => tutorial.name.indexOf(text) > -1);
  }

  render() {
    return (
      <input id="action-search" placeholder="Search for an action..." onChange={this.onChange.bind(this)}/>
    );
  }
}
