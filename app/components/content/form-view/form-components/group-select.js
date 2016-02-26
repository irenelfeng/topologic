import React from 'react';
import ReactSelectize from 'react-selectize';

export default class GroupSelect extends React.Component {
  constructor() {
    super();
  }

  getGroupValue() {
    if (this.simpleSelect)
      return this.simpleSelect.state.value.value;
    else
      return this.group.name;
  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;

    var options = this.props.groups.map(group => {
      return {label: group.name, value: group.name, avatar: group.avatar}
    });

    var group = this.props.groups.filter(g => g.name == this.props.group)[0];
    this.group = group;

    if (this.props.type == 'edit') {
      var select =
      (<div className="group-option-item">
        <img className="group-option-pic" src={group.avatar} />
        <div className="group-option-text">
          {group.name}
        </div>
      </div>);
    }
    else {
      var defaultGroup = options.filter(o => o.label == 'Personal')[0];

      // hey ben, i added the ref for the simpleselect because we would get a null groupvalue :)
      var select = React.createElement(SimpleSelect, {
        options: options,
        ref: (ref) => this.simpleSelect = ref,
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
        },
      });
      this.simpleSelect = select;
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
