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
      },
      form: false,
    };

    this.state.items.projects.forEach(p => {
      p.tasks.forEach(t => {
        t.id = t.title;
      });
    });
    
    this.state.items.groups.forEach(g => g.id = g.name);
  }

  setActive(icon) {
    this.setState({active: icon});
    this.panelRef.resetFilter();
    this.setForm(false); 
  }

  /**
   * When the sidebar icon changes will the form change back to false
   * @param {Boolean} bool whether form view is currently active
   */
  setForm(bool) {
    this.setState({form: bool});
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
    project['tasks'] = [];
    this.state.items.projects.push(project);

  }

  render() {

    return (
      <div id="main">
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} />
        <Panel setForm={this.setForm.bind(this)} active={this.state.active} items={this.state.items} ref={(ref) => this.panelRef = ref} />
        <Content newTask = {this.newTask.bind(this)} setForm = {this.setForm.bind(this)} active={this.state.active} items={this.state.items} form={this.state.form} />
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