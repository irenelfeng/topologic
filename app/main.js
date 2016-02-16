import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar'

// import all of our javascript files

// components here. 

class Main extends React.Component { 
	constructor() {
		super();
		this.me = [1,2,3,4];
		this.me.filter((num) => num > 2);
	}

	render() {
		return (
			<div>
				<Sidebar/>

			</div>
		); //need semicolon
	}
} 


ReactDOM.render(
  <Main/>,
  document.getElementById('example')
);