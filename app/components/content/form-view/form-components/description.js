import React from 'react';

export default class Description extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="description-container" className="form-group">
        <div className="form-aligned-col1"> Description: </div>
        <textarea id="task-description" className="form-aligned-col2" />
      </div>
    );
  }
}
