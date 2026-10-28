import {useId} from 'react';
import {Img,staticFile} from 'remotion';
import {colors,tween} from '../shared/styleTokens';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {ModernPaperCut} from './PaperArt';

export const ExhibitScene=({frame,fps=30,showPaper=true}:{frame:number;fps?:number;showPaper?:boolean})=>{
  const t=frame/fps;const uid=useId().replace(/:/g,'');
  const push=tween(t,1,2)*(1-tween(t,3,4));
  const lift=tween(t,0,.9);const settle=Math.min(t,4);
  return <>
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
      <path d="M100 905H1820V950H100Z" fill={colors.wood} opacity=".1"/>
      <path d="M110 300Q360 140 620 285Q862 370 1120 240Q1440 100 1800 290" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".35"/>
      <path d="M80 670Q340 545 560 620Q790 580 940 640Q1230 490 1535 610Q1680 555 1840 620V950H80Z" fill={colors.jade} opacity=".055"/>
      <path d="M120 895H1800" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".4"/>
      {[235,1685].map((x,i)=><g key={x} transform={`translate(${x} 340) scale(${i?-1:1} 1)`} fill="none" stroke={colors.wood} opacity=".17" strokeWidth="3"><path d="M0 490Q90 340 10 210Q-30 130 65 0M10 210Q-70 170-84 90M40 90Q120 110 125 42"/>{[0,1,2].map(j=><path key={j} d={`M${j*14} ${310-j*75}q-82-50-91-5q16 37 70 15`}/>)}</g>)}
    </svg>
    <div style={{position:'absolute',left:145,top:250,width:445,height:667.5,rotate:`${.15*Math.sin(settle*1.5)}deg`,transformOrigin:'45% 95%',filter:'drop-shadow(5px 7px 3px #2d1e1b30)'}}>
      <Img src={staticFile('assets/characters/grandma.png')} style={{width:'100%',height:'100%'}}/>
    </div>
    <XiaolinPuppet frame={Math.min(frame,4*fps)} shot={5} x={1335} y={250} width={445} pose={{enter:1,settle:0,head:-1+tween(settle,0,1,0,1),body:0,phoneArm:-2,freeArm:0}}/>
    {showPaper?<div style={{position:'absolute',left:480-60*push,top:250+15*(1-lift)-30*push,width:960+120*push,height:576+72*push,filter:'drop-shadow(3px 5px 2px #2d1e1b35)'}}>
      <ModernPaperCut id={`${uid}-exhibit`} reveal={tween(t,1.8,3)}/>
    </div>:null}
    <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M540 859Q960 879 1380 859" fill="none" stroke={colors.gold} strokeWidth="1.3" opacity=".5"/></svg>
  </>;
};
