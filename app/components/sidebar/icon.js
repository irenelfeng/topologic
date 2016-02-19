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
    var opacity = (this.props.icon == this.props.active) ? 1 : .5;
    return (
      <div>
        <button onClick={this.onClick.bind(this)} style={{opacity : opacity}} >
          <img src = {'./img/' + this.props.icon + '.png'} />
        </button>
      </div>
    );
  }
}
