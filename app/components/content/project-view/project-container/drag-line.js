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

    var incY = radius; var incX = radius;
    if (s.x < t.x)
      incX = incX * -1;

    if (s.y < t.y)
      incY = incY * -1;

    var path = `M${s.x},${s.y}L${t.x + incX},${t.y + incY}`;
    // return (
    //   <path className="arrow" d={path} style={{stroke:'black', strokeWidth:3}} markerEnd="url(#arrow)"/>
    // );
    return (
      <line className="arrow" x1={s.x} y1={s.y} x2={t.x + incX} y2={t.y + incY} style={{stroke:'black', strokeWidth:3}} markerEnd="url(#arrow)"/>
    );
  }
}
