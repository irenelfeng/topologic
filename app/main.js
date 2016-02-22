import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar/sidebar';
import Panel from './components/panel/panel';
import Content from './components/content/content';

class Main extends React.Component {
  constructor() {
    super();

    var sampleProject = {
      tasks: [{
          title: 'Done Important Task',
          done: true,
          important: true
        }, {
          title: 'Not Done Important Task',
          done: false,
          important: true
        }, {
          title: 'Not Done Not Important Task',
          done: false,
          important: false
        }, {
          title: 'Done Not Important Task',
          done: true,
          important: false
        }],
      name: 'Sample Project'
    }

    var nullProject = {
      tasks : [],
      name: null
    }

    //var sampleTutorial = {
    //  tutorials :[
    //    {title: 'Stickies'},
    //    {title: 'Getting started with topologic'},
    //    {title: 'Creating Groups'}
    //  ]
    //}

    this.state = {
      active: 'projects',
      items: {
        projects: [sampleProject, nullProject] ,
        groups: [{
          name: 'Sample Group',
          members: 'John Stacy Phil George Alfred Joseph'.split(' ')
        },
        {
          name: 'Friendly Vibrant Monkey Man',
          members: 'Bo Stalion Greyman Frankdick'.split(' ')
        }],
        tutorials: [
          {name: 'Stickies'},
          {name: 'Getting started with topologic'},
          {name: 'Creating Groups'}
          ]
      },
      form: {
        projects: null,
        groups: null
      },
    };
  }

  /*
  * Sidebar icon clicked, setform to null, change the icon.
  */
  setActive(icon) {
    this.setState({active: icon});
    this.panelRef.resetFilter();
    this.setForm(null);
  }

  /**
   * When the sidebar icon changes will the form change back to false
   * @param {item} either null, {} (meaning new form), { ... } editForm
   */
  setForm(item) {
    var form = {
      projects: null,
      groups: null
    };
    form[this.state.active] = item; //changes active tab to the item given
    this.setState({form: form});
  }

  /**
   * Adds a new task to a certain project
   * @param {data} all the data of the task
   */
  newTask(data, projectName) {
    var project = this.state.items.projects.filter(p => p.name == projectName)[0];
    project['tasks'].push(data);

  }

  /**
   * Adds a new project, no tasks essentially
   * @param {p} the project
   */
  newProject(p) {
    p['tasks'] = [];
    this.state.items.projects.push(p);
  }

  newGroup(group) { 

    this.state.items.groups.push(group);
  }


  addMember(member, groupName){
    var group = this.state.items.groups.filter(p => p.name == groupName)[0];
    group['members'].push(data);
  }

  render() {

    return (
      <div id="main">
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} />
        <Panel setForm={this.setForm.bind(this)} active={this.state.active} items={this.state.items} ref={(ref) => this.panelRef = ref} />
        <Content newProject={this.newProject.bind(this)} newTask = {this.newTask.bind(this)} setForm = {this.setForm.bind(this)} active={this.state.active} items={this.state.items} form={this.state.form} />
      </div>
    );
  }
}

/**
 * Render the main app
 */
ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
