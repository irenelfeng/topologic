import React from 'react';

export default class Panel extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="panel">
        <div id="panel-header-container">
          <div id="panel-header"> {this.props.active} </div>
          <img id="panel-plus" src="./img/plus.png" />
        </div>
      </div>
    );
  }
}
