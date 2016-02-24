import React from 'react';
import $ from 'jquery';

export default class Location extends React.Component {
  constructor() {
    super();
  }

  render() {
    var initValue = this.props.location;

    if ($('.location-container').length > 0) {
      $('.location-container').find('.form-location').val(initValue);
    }

    return (
      <div className="location-container form-group">
        <div className="form-aligned-col1"> Location: </div>
        <input className="form-location form-aligned-col2" placeholder="(optional)" defaultValue={initValue} />
      </div>
    );
  }
}
