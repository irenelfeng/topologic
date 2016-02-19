import React from 'react';

export default class Icon extends React.Component { 
  constructor() {
    super();
  }

  onClick(e) {
    if (this.props.icon != this.props.active) {
      this.props.setActive(this.props.icon);
    }
  }

  render() {
    var selected = (this.props.icon == this.props.active) ? 'selected' : '';
    return (
      <div className="icon-div">
        <img className={"icon-img " + selected} onClick={this.onClick.bind(this)} src = {'./img/' + this.props.icon + '.png'} />
      </div>
    );
  }
}
