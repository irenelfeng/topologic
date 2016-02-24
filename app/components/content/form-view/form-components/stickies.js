import React from 'react';

export default class Stickies extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="form-group">
        <div className="form-aligned-col1"> Stickies: </div>
        <div className="form-aligned-col2-list">
          <div className="form-aligned-col2-list-item">
            <div className="form-aligned-col2-check"> &bull; </div>
            <div className="form-aligned-col2-text"> Sample sticky here </div>
          </div>
          <div className="form-aligned-col2-list-item">
            <div className="form-aligned-col2-check"> &bull; </div>
            <input className="form-aligned-col2-text" placeholder="Type new sticky here" />
          </div>
        </div>
      </div>
    );
  }
}
