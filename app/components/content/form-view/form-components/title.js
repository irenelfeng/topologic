import React from 'react';

export default class Title extends React.Component {
  constructor() {
    super();
    this.state = {
      title:'' 
    }
  }

  onChange(e) {
    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div className="form-title-container">
        <input className="form-title" placeholder="Title" value={this.props.title} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
