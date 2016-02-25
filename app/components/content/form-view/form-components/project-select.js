import React from 'react';
import ReactSelectize from 'react-selectize';

export default class ProjectSelect extends React.Component {
  constructor() {
    super();

  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;

    var options = this.props.projects.map(function(projects){
      return {label: projects.name ? projects.name :'No project', value: projects.name ? projects.name :'No project', avatar: projects.avatar}
    });

    // for edit. will do later. Can only change the project to lone and from lone to project? 
    //var avatar = options.filter(o => o.name == this.props.project)[0].avatar;
    //var name = options.filter(o => o.name == this.props.project)[0].label;

    // if (this.props.type == 'edit') {
    //   select =
    //   (<div className="projects-option-item">
    //     <img className="projects-option-pic" src={avatar} />
    //     <div className="projects-option-text">
    //       {name}
    //     </div>
    //   </div>);
    // }
    // else {
      var defaultprojects = options.filter(o => o.label == 'No project')[0];

      var select = React.createElement(SimpleSelect, {
        options: options,

        defaultValue: defaultprojects,
        placeholder: "Select a project",
        renderOption: function (projects) {
          return (
            <div className="groups-option-item">
              <img className="groups-option-pic" src={projects.avatar} />
              <div className="groups-option-text">
                {projects.label}
              </div>
            </div>
          );
        },
        renderValue: function(projects) {
          return (
            <div className="groups-option-item">
              <img className="groups-option-pic" src={projects.avatar} />
              <div className="groups-option-text">
                {projects.label}
              </div>
            </div>
          )
        }
      });
    // }

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
