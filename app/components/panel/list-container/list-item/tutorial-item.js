import React from 'react';

export default class TutorialItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-item tutorial-item">
        <span> {this.props.tutorial.title} </span>
      </div>
    );
  }
}
