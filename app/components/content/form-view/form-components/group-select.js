import React from 'react';

import ReactSelectize from 'react-selectize';

export default class GroupSelect extends React.Component { 
  constructor() {
    super();

  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;
    var options = this.props.groups.map(function(group){
                return {label: group.name, value: group.name}
            });

    return (
      <div id="group-select" className="form-group">
        <div className="form-aligned-col1"> Group: </div>
        <div id="group-dropdown" className="form-aligned-col2">
          <SimpleSelect 
            defaultValue = {{label: "Personal", value: null}}
            options = {options} 
            placeholder = "Select a group"
            />
        </div>
      </div>
    );
  }
}
