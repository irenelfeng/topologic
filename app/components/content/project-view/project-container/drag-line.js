import React from 'react';
import d3 from 'd3';

export default class DragLine extends React.Component { 
  constructor() {
    super();
  }

  render() {
    var radius = 50;
    var s = this.props.source, t = this.props.target;
    
    var left = Math.min(s.x, t.x);
    var top = Math.min(s.y, t.y);
    var right = Math.max(s.x, t.x);
    var bottom = Math.max(s.y, t.y);

    var width = right - left;
    var height = bottom - top;

    var incY = radius;

    if (s.y < t.y)
      incY = incY * -1;

    return (
      <line className="arrow" x1={s.x} y1={s.y} x2={t.x} y2={t.y + incY} style={{stroke:'black', strokeWidth:3}} markerEnd="url(#arrow)"/>
    );
  }
}
