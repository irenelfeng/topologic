import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar/sidebar';
import Panel from './components/panel/panel';
import Content from './components/content/content';

class Main extends React.Component {
  constructor() {
    super();

    /**
     * Hard coded inital data – should be moved to .json
     */
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
      notify: {},
      avatar: '',
      description: ''
    };

    var nullProject = {
      tasks : [],
      name: 'Miscellaneous',
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
          type: 'group',
          id: '0',
          description: 'Sarah has been added to Sample Group',
          link: 'Sample Group',
          unread: true,
          alarm: true
        },
        {
          type: 'task',
          id: '1',
          description: 'Done Important Task has been completed!',
          link: 'Done Important Task',
          unread: true,
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

  /**
   * Wrapper for default task
   * Avoids having to retype all of these default values
   * @param  {Object} keyValues [defualt values to overwrite]
   */
  defaultTask(keyValues) {
    var defaults = {
      title: null,
      done: false,
      important: false,
      description: '',
      location: '',
      deadline: '',
      notify: {},
      stickies: [],
      group: 'Personal'
    };

    for (var key in keyValues) {
      defaults[key] = keyValues[key];
    }

    return defaults;
  }

  /*
  * Sidebar icon click behavior
  * Actions:
  *   – set form to null
  *   – change the icon to what was clicked
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
      notifications: null,
      tutorials: null
    };

    form[this.state.active] = item; //changes active tab to the item given
    if(this.state.active == "notifications" && item != null){
      /* changes active tab to the item given through clicking on notifications
      * there is no notification view.
      */
      if(item.type == 'group'){
        form['groups'] = this.state.items.groups.filter(g => g.name == item.link)[0];
      }else if(item.type == 'project'){
        form['projects'] = this.state.items.projects.filter(g => g.name == item.link)[0];
      }else if(item.type == 'task'){
        var task;
        var currentProject = this.state.items.projects.filter(p => {
          return p.tasks.filter(t => t.title == item.link).length > 0;
        })[0];
        if (currentProject)
          task = currentProject.tasks.filter(t => t.title == item.link)[0];
        form['projects'] = task;
      }
    }

    this.setState({form: form});

    if(item == null){
      this.panelRef.listContainer.clearSelect(); // clear when setting form to main view
    }
  }

  /*
   * Saves objects depending on its type
   * If there is already an object with this type and title:
   *   Write over its properties
   * Otherwise:
   *   Create a new one
   *
   * Note: no DB interactions here, just modifying the state
   */
  saveObject(object, type) {
    var errors = this.validate(object, type);
    if (errors.length > 0) return errors;

    if (type == 'task') {
      var currentProject = this.state.items.projects.filter(p => {
        return p.tasks.filter(t => t.title == object.title).length > 0;
      })[0];

      var futureProject = this.state.items.projects.filter(p => p.name == object.project)[0];
      var task;
      if (currentProject)
        task = currentProject.tasks.filter(t => t.title == object.title)[0];

      if (task != null && currentProject != futureProject) {
        var linksToSplice = currentProject.links.filter(l => l.source == task || l.target == task);
        linksToSplice.forEach(l => {
          currentProject.links.splice(project.links.indexOf(l), 1);
        });
        currentProject.tasks.splice(currentProject.tasks.indexOf(task), 1);
        futureProject.tasks.push(task);
      }

      if (task != null) {
        for (var key in task) {
          task[key] = object[key];
        }
      } else {
        futureProject.tasks.push(object);
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
    return null;
  }

  /**
   * Validates form values
   * @param  {Object} object [object containing form results to validate]
   * @param  {String} type   [type of object]
   * @return {Array}        [array of error strings that are what went wrong]
   */
  validate(object, type) {
    var errors = [];
    if (type == 'project') {
      if (object.name == '') {
        errors.push('Title cannot be blank.');
      }
    }

    if (type == 'task') {
      if (object.title == '') {
        errors.push('Title cannot be blank.');
      }

      if (object.project == null) {
        errors.push('Task must have a project');
      }
    }

    if (type == 'group') {
      if (object.title = '') {
        errors.push('Title cannot be blank.');
      }
    }

    return errors;
  }

  /**
   * Delete's object of type `type` with id `objectId`
   * @param  {String} objectID
   * @param  {String} type
   */
  deleteObject(objectID, type) {
    if (type == 'task') {
      var project = this.state.items.projects.filter(p => {
        return p.tasks.filter(t => t.title == objectID).length > 0;
      })[0];

      if (project == null) {
        var project = this.state.items.projects.filter(p => p.name == null)[0];
      }
      var task = project.tasks.filter(t => t.title == objectID)[0];

      if (task != null) {
        var linksToSplice = project.links.filter(l => l.source == task || l.target == task);
        linksToSplice.forEach(l => {
          project.links.splice(project.links.indexOf(l), 1);
        });

        project.tasks.splice(project.tasks.indexOf(task), 1);
      }
    }

    if (type == 'project') {
      var project = this.state.items.projects.filter(p => p.name == objectID)[0];

      if (project != null) {
        var idx = this.state.items.projects.indexOf(project);
        this.state.items.projects.splice(idx, 1);
      }
    }

    if (type == 'group') {

      var group = this.state.items.groups.filter(g => g.name == objectID)[0];

      if (group != null) {
        var idx = this.state.items.groups.indexOf(group);
        this.state.items.groups.splice(idx, 1);
      }
    }

    this.forceUpdate();
  }

  /**
   * Add a link between task `source` and `target` inside project `projectName`
   */
  addLink(projectName, source, target) {
    var project = this.state.items.projects.filter(p => p.name == projectName)[0];
    if (project.links.filter(l => l.source == source && l.target == target).length > 0) return;

    project.links.push({source: source, target: target});
    this.forceUpdate();
  }

  /**
   * Delete a link between task `source` and `target` inside project `projectName`
   */
  deleteLink(projectName, source, target) {
    var project = this.state.items.projects.filter(p => p.name == projectName)[0];
    var linkToDelete = project.links.filter(l => l.source == source && l.target == target)[0];

    if (!linkToDelete) return;
    project.links.splice(project.links.indexOf(linkToDelete), 1);
    this.forceUpdate();
  }

  /**
   * Main's render function
   */
  render() {
    return (
      <div id="main">
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} notifications={this.state.items.notifications} />
        <Panel setForm={this.setForm.bind(this)} active={this.state.active} items={this.state.items} ref={(ref) => this.panelRef = ref} />
        <Content saveObject={this.saveObject.bind(this)}
          deleteObject={this.deleteObject.bind(this)}
          setForm={this.setForm.bind(this)}
          active={this.state.active}
          items={this.state.items}
          form={this.state.form}
          addLink={this.addLink.bind(this)}
          deleteLink={this.deleteLink.bind(this)}
          forcePanelUpdate={function(){this.forceUpdate()}.bind(this)} />
        <div id="sticky-view"> </div>
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
