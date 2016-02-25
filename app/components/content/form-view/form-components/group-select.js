import React from 'react';
import ReactSelectize from 'react-selectize';

export default class GroupSelect extends React.Component {
  constructor() {
    super();

  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;

    var options = this.props.groups.map(function(group){
      return {label: group.name, value: group.name, avatar: group.avatar}
    });

    var avatar = options.filter(o => o.name == this.props.group)[0].avatar;
    var name = options.filter(o => o.name == this.props.group)[0].label;

    if (this.props.type == 'edit') {
      select =
      (<div className="group-option-item">
        <img className="group-option-pic" src={avatar} />
        <div className="group-option-text">
          {name}
        </div>
      </div>);
    }
    else {
      var defaultGroup = options.filter(o => o.label == 'Personal')[0];

      var select = React.createElement(SimpleSelect, {
        options: options,
        defaultValue: defaultGroup,
        placeholder: "Select a group",
        renderOption: function (group) {
          return (
            <div className="group-option-item">
              <img className="group-option-pic" src={group.avatar} />
              <div className="group-option-text">
                {group.label}
              </div>
            </div>
          );
        },
        renderValue: function(group) {
          return (
            <div className="group-option-item">
              <img className="group-option-pic" src={group.avatar} />
              <div className="group-option-text">
                {group.label}
              </div>
            </div>
          )
        }
      });
    }

    return (
      <div id="group-select" className="form-group">
        <div className="form-aligned-col1"> Group: </div>
        <div className="form-aligned-col2">
          {select}
        </div>
      </div>
    );
  }
}
