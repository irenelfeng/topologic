import React from 'react';

export default class TitleComponent extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="group-select" className="form-group">
        <div className="form-aligned-col1"> Group: </div> 
        <div id="group-dropdown" className="form-aligned-col2">
          Sample Group
        </div>
      </div>
    );
  }
}