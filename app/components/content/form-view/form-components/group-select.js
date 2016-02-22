import React from 'react';

var rs = require('react-selectize');
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

    return (
      <div id="group-select" className="form-group">
        <div className="form-aligned-col1"> Group: </div>
        <div id="group-dropdown" className="form-aligned-col2">
          <SimpleSelect 
            defaultValue = {{label: "testing", value: "testing"}}
            options = {options} 
            placeholder = "Select a group"
            />
        </div>
      </div>
    );
  }
}
