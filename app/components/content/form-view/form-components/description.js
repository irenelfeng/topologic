import React from 'react';
import $ from 'jquery';

export default class Description extends React.Component {
  constructor() {
    super();
  }

  render() {
    var initValue = this.props.description;

    if ($('.description-container').length > 0) {
      $('.description-container').find('.task-description').val(initValue);
    }

    return (
      <div className="description-container form-group" >
        <div className="form-aligned-col1"> Description: </div>
        <textarea className="task-description form-aligned-col2" placeholder="(optional)" defaultValue={initValue} />
      </div>
    );
  }
}
