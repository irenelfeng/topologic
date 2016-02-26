import React from 'react';
import d3 from 'd3';
import common from './common';
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class DragLine extends React.Component { 
  constructor() {
    super();
  }


  render() {
    var s = this.props.source, t = this.props.target;
    
    var left = Math.min(s.x, t.x);
    var top = Math.min(s.y, t.y);
    var right = Math.max(s.x, t.x);
    var bottom = Math.max(s.y, t.y);

    var width = right - left;
    var height = bottom - top;

    var a = {};
    // if top left to bottom right
    if (top == s.y && left == s.x) {
      a.x1 = 0; a.y1 = 0;
      a.x2 = width; a.y2 = height;
    }
    // if bottom left to top right
    else if (bottom == s.y && left == s.x) {
      a.x1 = 0; a.y1 = height;
      a.x2 = width; a.y2 = 0;
    }
    // if top right to bottom left
    else if (top == s.y && right == s.x) {
      a.x1 = width; a.y1 = 0;
      a.x2 = 0; a.y2 = height;
    }
    // if bottom right to top left
    else if (bottom == s.y && right == s.x) {
      a.x1 = width; a.y1 = height;
      a.x2 = 0; a.y2 = 0;
    }

    a.x1 -= xRadius / 2; a.y1 -= yRadius / 2;
    if (this.props.target.name != null) {
      a.x2 -= xRadius / 2; x.y2 -= yRadius / 2;
    }

    return (
      <svg className="arrow-container" id={'link-' + Math.round(s.x) + '-' + Math.round(t.x)} style={{left: left, top: top, width: width, height: height}}> 
        <line className="arrow" x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2 } markerEnd="url(#arrow)"/>

        <defs> 
          <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0,-5L10,0L0,5" className="arrowHead" /> 
          </marker>
        </defs>

      </svg>
    );
  }
}
