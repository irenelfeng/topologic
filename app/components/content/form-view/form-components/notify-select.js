import React from 'react';

export default class Title extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="notify-select" className="form-group">
        <div className="form-aligned-col1"> Notify me... </div>
        <div id="group-dropdown" className="form-aligned-col2">
          Sample Group
        </div>
      </div>
    );
  }
}
