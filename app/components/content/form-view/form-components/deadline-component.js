import React from 'react';

export default class DeadlineComponent extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="deadline-container" className="form-group">
        <div className="form-aligned-col1"> Description: </div> 
        <input type="checkbox" className="form-aligned-col2" /> 
      </div>
    );
  }
}