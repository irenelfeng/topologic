import React from 'react';
import ReactSelectize from 'react-selectize';

export default class ProjectSelect extends React.Component {
  constructor() {
    super();
  }

  getProjectValue() {
    return this.simpleSelect.state.value.value;
  }

  render() {
    var current = this.props.current ? this.props.current.name : 'Miscellaneous';

    var SimpleSelect = ReactSelectize.SimpleSelect;

    var options = this.props.projects.map(projects => {
      return {label: projects.name ? projects.name :'No project', value: projects.name ? projects.name :'No project', avatar: projects.avatar}
    });

    var defaultOpt = options.filter(o => o.label == current)[0];

    var select = (
      <SimpleSelect
        options={options}
        defaultValue={defaultOpt}
        placeholder="Select a project"
        ref={(ref) => this.simpleSelect = ref}
        // renderOption: function (projects) {
        //   return (
        //     <div className="groups-option-item">
        //       <img className="groups-option-pic" src={projects.avatar} />
        //       <div className="groups-option-text">
        //         {projects.label}
        //       </div>
        //     </div>
        //   );
        // },
        // renderValue: function(projects) {
        //   return (
        //     <div className="groups-option-item">
        //       <img className="groups-option-pic" src={projects.avatar} />
        //       <div className="groups-option-text">
        //         {projects.label}
        //       </div>
        //     </div>
        //   )
        // }
        />
    );

    return (
      <div id="projects-select" className="form-group">
        <div className="form-aligned-col1"> Projects: </div>
        <div className="form-aligned-col2">
          {select}
        </div>
      </div>
    );
  }
}
