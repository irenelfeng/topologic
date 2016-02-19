import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar/sidebar';
import Panel from './components/panel/panel';
import Content from './components/content/content';

class Main extends React.Component { 
  constructor() {
    super();
    this.state = { 
      active: 'tasks',
      items: {
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
        groups: [{
            name: 'Sample Group',
            members: 'John Stacy Phil George Alfred Joseph'.split(' ')
          },
          {
            name: 'Friendly Vibrant Monkey Man',
            members: 'Bo Stalion Greyman Frankdick'.split(' ')
          }]
      },
      form: false,
    };

    this.state.items.tasks.forEach(t => t.id = t.title);
    this.state.items.groups.forEach(g => g.id = g.name);
  }

  setActive(icon) {
    this.setState({active: icon});
    this.panelRef.resetFilter();
  }

  setForm(bool) {
    this.setState({form: bool}); //will change later for toggling
    // when the sidebar icon changes will the form change back to false
  }


  render() {
    return (
      <div id="main">
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} />
        <Panel setForm={this.setForm.bind(this)} active={this.state.active} items={this.state.items} ref={(ref) => this.panelRef = ref} />
        <Content setForm = {this.setForm.bind(this)} active={this.state.active} items={this.state.items} form={this.state.form} />
      </div>
    );
  }
} 

//do not change - changes the index.html file
ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);