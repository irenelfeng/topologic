import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar/sidebar';
import Panel from './components/panel/panel';
import Content from './components/content/content';

class Main extends React.Component {
  constructor() {
    super();

    var sampleProject = {
      tasks: [this.defaultTask({
          title: 'Done Important Task',
          done: true,
          important: true
        }), this.defaultTask({
          title: 'Not Done Important Task',
          done: false,
          important: true
        }), this.defaultTask({
          title: 'Not Done Not Important Task',
          done: false,
          important: false
        }), this.defaultTask({
          title: 'Done Not Important Task',
          done: true,
          important: false
        })],
      name: 'Sample Project',
      links: [],
      notify: {}
    };

    var nullProject = {
      tasks : [],
      name: null,
      links: [],
      notify: {}
    };

    this.state = {
      active: 'projects',
      items: {
        projects: [sampleProject, nullProject] ,
        groups: [{
          name: 'Personal',
          members: ['User'],
          avatar: './img/person.png',
          description: 'My group'
        },
        {
          name: 'Sample Group',
          members: 'John Stacy Phil George Alfred Joseph'.split(' '),
          avatar: './img/groups.png',
          description: 'Description here'
        },
        {
          name: 'Friendly Vibrant Monkey Man',
          members: 'Bo Stalion Greyman Frankdick'.split(' '),
          avatar: './img/groups.png',
          description: 'Different Description'
        }],
        notifications: [
        {
          type: 'groups',
          id: '0',
          description: 'Sarah has been added to Sample Group',
          link: 'Sample Group',
          alarm: true
        },
        {
          type: 'projects',
          id: '1',
          description: 'Done Important Task has been completed!',
          link: 'Done Important Task',
          alarm: false
        }],
        tutorials: [{
            name: 'Getting started:',
            subtitle: 'hit the ground running'
        },
          {
            name: 'Stickies:',
            subtitle: 'learn how to use stickies'
        },
          {
            name: 'Creating Groups:',
            subtitle: 'add the people you want'
          }]
      },
      form: {
        projects: null,
        groups: null
      },
    };
  }

  defaultTask(keyValues) {
    var defaults = {
      title: null,
      done: false,
      important: false,
      description: '',
      location: '',
      deadline: '',
      notify: {},
      stickies: []
    };

    for (var key in keyValues) {
      defaults[key] = keyValues[key];
    }

    return defaults;
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
      groups: null,
      tutorials: null
    };

    form[this.state.active] = item; //changes active tab to the item given
    this.setState({form: form});

    if(item == null){
      this.panelRef.listContainer.clearSelect(); // clear when setting form to main view
    }
  }

  /*
   * saves objects depending on its type. project index
   */
  saveObject(object, type) {
    if (type == 'task') {
      var project = this.state.items.projects.filter(p => {
        return p.tasks.filter(t => t.title == object.title).length > 0;
      })[0];

      if (project == null) {
        var project = this.state.items.projects.filter(p => p.name == null)[0];
      }

      var task = project.tasks.filter(t => t.title == object.title)[0];

      if (task != null) {
        for (var key in task) {
          task[key] = object[key];
        }
      } else {
        project.tasks.push(object);
      }
    }

    if (type == 'project') {
      var project = this.state.items.projects.filter(p => p.name == object.name)[0];

      if (project != null) {
        for (var key in project) {
          project[key] = object[key];
        }
      } else {
        this.state.items.projects.push(object);
      }
    }

    if (type == 'group') {
      var group = this.state.items.groups.filter(g => g.name == object.name)[0];

      if (group != null) {
        for (var key in group) {
          group[key] = object[key];
        }
      } else {
        this.state.items.groups.push(object);
      }
    }

    this.forceUpdate();
  }

  /**
   *
   */
  addLink(projectName, source, target) {
    var project = this.state.items.projects.filter(p => p.name == projectName)[0];
    if (project.links.filter(l => l.source == source && l.target == target).length > 0) return;

    project.links.push({source: source, target: target});
    this.forceUpdate();
  }

  /**
   *
   */
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
