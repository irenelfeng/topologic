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
    var readOnly = (this.props.title != '' && this.props.title != null);

    return (
      <div className="form-title-container">
        <div>
          <input className="form-title" placeholder="Title" value={this.props.title} onChange={this.onChange.bind(this)} readOnly={readOnly}/>
        </div>
      </div>
    );
  }
}
