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
        links: [],
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
   * A crazy function that does a lot of things: changes the view
   * When the sidebar icon changes will change the form to null view
   * @param {item} either null, {} (meaning new form), { ... } editForm
   */
  setForm(item) {
    var form = {
      projects: null,
      groups: null
    };
    debugger;

    form[this.state.active] = item; //changes active tab to the item given
    this.setState({form: form});
  }

  /*
  * saves objects depending on its type. project index
  */ 
  saveObject(object, type, project = null) {

    if (type == 'task') {
      if (project == null) { 
        //determine nullproject index, set project to that index.
        this.state.items.projects.forEach((p, i) => {
          if (p.name == null) project = i;
        });
      }
      var idx = null;
      this.state.items.projects[project].tasks.forEach((t, i) => {
        if (t.title == object.title) idx = i;
      });

      if (idx != null) this.state.items.projects[project].tasks.splice(idx, 1);
      this.state.items.projects[project].tasks.push(object);
    }

    if (type == 'project') {
      var idx = null;
      this.state.items.projects.forEach((p, i) => {
        if (p.name == object.name) idx = i;
      });
      if (idx != null)  this.state.items.projects.splice(idx, 1); //if already exists, remove (prevents editing from making a double)
      this.state.items.projects.push(object); 
    }

    if (type == 'group') {
      var idx = null;
      this.state.items.groups.forEach((g, i) => {
        if (g.name == g.name) idx = i;
      });
      if (idx != null)  this.state.items.g.splice(idx, 1); //if already exists, remove (prevents editing from making a double)
      this.state.items.g.push(object); 
    }
  }


  addMember(member, groupName){
    var group = this.state.items.groups.filter(p => p.name == groupName)[0];
    group['members'].push(data);
  }

  addLink(fromTitle, toTitle) {
    this.state.items.links.push({from: fromTitle, to: toTitle});
  }
  render() {
    return (
      <div id="main">
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} />
        <Panel setForm={this.setForm.bind(this)} active={this.state.active} items={this.state.items} ref={(ref) => this.panelRef = ref} />
        <Content saveObject={this.saveObject.bind(this)} setForm = {this.setForm.bind(this)} active={this.state.active} items={this.state.items} form={this.state.form} addLink={this.addLink.bind(this)} />

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
