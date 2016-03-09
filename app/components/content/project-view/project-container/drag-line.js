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

    return (
      <line className="arrow" x1={s.x} y1={s.y} x2={t.x} y2={t.y} style={{stroke:'black', strokeWidth:3}} markerEnd="url(#arrow)"/>
    );
  }
}
