import React from 'react';

export default class TutorialItem extends React.Component {
  constructor() {
    super();
    this.type = 'tutorials'
  }

  selected(e) {
    var item = this.props.tutorials;
    this.props.editItem(this.props.tutorials.subtitle,item, this.type);
  }

render() {
  console.log("rerender tutorial item");
  return (
    <div className={'list-item tutorial-item ' + this.props.selected} onClick={this.selected.bind(this)} >
      <div className="text-container">
        <span className="tutorial-name"> {this.props.tutorial.name} </span>
        {this.props.tutorial.subtitle}
      </div>
    </div>
  );
}
}
