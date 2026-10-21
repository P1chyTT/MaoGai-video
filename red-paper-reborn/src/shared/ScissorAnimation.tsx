import React from 'react';
import {colors, tween} from './styleTokens';

/** Planar scissors. A 69-frame cycle has two short snips and a long hand-work pause. */
export const snipAngle = (frame:number) => {
  const p=((frame%69)+69)%69;
  const amplitude = 15 * (1-tween(frame,270,390,.0,.85));
  return amplitude * (tween(p,0,15)-tween(p,21,33));
};
export const ScissorAnimation: React.FC<{frame:number;x?:number;y?:number;scale?:number;rest?:boolean}> = ({frame,x=0,y=0,scale=1,rest=false}) => {
  const a=rest?5:snipAngle(frame);
  return <g transform={`translate(${x} ${y}) scale(${scale}) rotate(-20)`} stroke={colors.ink} strokeWidth="2.3" strokeLinejoin="round">
    <g transform={`rotate(${-a})`}><path d="M-5 0L115-13Q128-10 109-4L-6 8Z" fill="#b39c70"/><path d="M-7 2L-38-13" stroke={colors.wood} strokeWidth="10"/><ellipse cx="-48" cy="-17" rx="24" ry="14" fill="none" stroke="#806039" strokeWidth="8"/><ellipse cx="-48" cy="-17" rx="24" ry="14" fill="none" stroke={colors.gold} strokeWidth="2"/></g>
    <g transform={`rotate(${a})`}><path d="M-5 0L110 17Q124 17 109 8L-5-8Z" fill="#d0bd91"/><path d="M-7 0L-38 17" stroke={colors.wood} strokeWidth="10"/><ellipse cx="-48" cy="20" rx="24" ry="14" fill="none" stroke="#806039" strokeWidth="8"/><ellipse cx="-48" cy="20" rx="24" ry="14" fill="none" stroke={colors.gold} strokeWidth="2"/></g>
    <circle r="8" fill={colors.gold}/><circle r="2.2" fill={colors.ink}/>
  </g>;
};
