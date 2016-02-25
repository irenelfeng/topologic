import React from 'react';
import ReactSelectize from 'react-selectize';

export default class GroupSelect extends React.Component {
  constructor() {
    super();

  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;

    if (this.props.type == 'edit')
      select = this.props.group ? this.props.group : 'Personal';
    else {
      var options = this.props.groups.map(function(group){
        return {label: group.name, value: group.name, avatar: group.avatar}
      });

      var select = React.createElement(SimpleSelect, {
        options: options,
        defaultValue: personal,
        placeholder: "Select a group",
        renderOption: function (group) {
          return (
            <div className="group-option-item">
              <div className="group-option-pic">
                <img src={group.avatar} />
              </div>
              <div className="group-option-text">
                {group.label}
              </div>
            </div>
          );
        }
      });
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
