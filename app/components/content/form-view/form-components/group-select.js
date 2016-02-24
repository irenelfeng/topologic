import React from 'react';

import ReactSelectize from 'react-selectize';

export default class GroupSelect extends React.Component {
  constructor() {
    super();

  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;
    var options = ["testing", "this", "whee"].map(function(val){
                return {label: val, value: val}
            });

    if (this.props.type == 'edit')
      select = 'testing';
    else {
      var select = (<SimpleSelect
        defaultValue = {{label: "testing", value: "testing"}}
        options = {options}
        placeholder = "Select a group"
        />);
    }

    return (
      <div id="group-select" className="form-group">
        <div className="form-aligned-col1"> Group: </div>
        <div id="group-dropdown" className="form-aligned-col2">
          {select}
        </div>
      </div>
    );
  }
}
