import React from 'react';
import d3 from 'd3';

export default class ProjectHeader extends React.Component { 
  constructor() {
    super();
  }


  render() {
    var f = this.props.from, t = this.props.to;
    
    var left = Math.min(f.x, t.x);
    var top = Math.min(f.y, t.y);
    var right = Math.max(f.x, t.x);
    var bottom = Math.max(f.y, t.y);

    var width = right - left;
    var height = bottom - top;

    var a = {};
    // if top left to bottom right
    if (top == f.y && left == f.x) {
      a.x1 = 0; a.y1 = 0;
      a.x2 = width; a.x2 = height;
    }
    // if bottom left to top right
    else if (bottom == f.y && left == f.x) {
      a.x1 = 0; a.y1 = height;
      a.x2 = width; a.y2 = 0;
    }
    // if top right to bottom left
    else if (top == f.y && right == f.x) {
      a.x1 = width; a.y1 = 0;
      a.x2 = 0; a.y2 = height;
    }
    // if bottom right to top left
    else if (bottom == f.y && right == f.y) {
      a.x1 = width; a.y2 = height;
      a.x2 = 0; a.y2 = 0;
    }

    return (
      <svg className="arrow-container" id={'link-' + Math.round(f.x) + '-' + Math.round(t.x)} style={{left: left, top: top, width: width, height: height}}> 
        <line className="arrow" x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} />
      </svg>
    );
  }
}
