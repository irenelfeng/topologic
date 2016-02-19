import React from 'react';

export default class Location extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="location-container" className="form-group">
        <div className="form-aligned-col1"> Location: </div>
        <input id="form-location" className="form-aligned-col2"/>
      </div>
    );
  }
}
