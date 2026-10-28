import {useId} from 'react';
import {WoodLines} from '../shared/OldHouseStage';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {colors,tween} from '../shared/styleTokens';
import {PaperProduct} from './ProductProps';

/** Same red ink, two different constructions: solid repetitions and open paper lace. */
export const HandmadeVsPrinted=({frame,fps=30}:{frame:number;fps?:number})=>{
 const t=frame/fps;const id=useId().replace(/:/g,'');
 const scan=tween(t,4.5,7);
 const focus=tween(t,11,13.5);
 const x=110*(1-scan)-focus*205;
 const zoom=1+focus*.13;
 return <div style={{position:'absolute',inset:0,background:colors.paper}}>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <defs><linearGradient id={`${id}-wood`} x2=".2" y2="1"><stop stopColor="#c5a376"/><stop offset="1" stopColor="#a78157"/></linearGradient><clipPath id={`${id}-board`}><rect x="175" y="160" width="1570" height="755"/></clipPath></defs>
   <rect x="160" y="158" width="1600" height="782" rx="8" fill={colors.ink} opacity=".22"/>
   <rect x="175" y="150" width="1570" height="755" rx="5" fill={`url(#${id}-wood)`} stroke={colors.wood} strokeWidth="8"/>
   <g clipPath={`url(#${id}-board)`}><WoodLines detail/><path d="M165 380H1755M165 640H1755" stroke={colors.wood} opacity=".3" strokeWidth="3"/><path d="M1630 155H1740L1030 906H420Z" fill="#ffedbb" opacity=".14"/></g>
   <path d="M196 175H1724V879H196Z" fill="none" stroke={colors.gold} opacity=".4" strokeWidth="2"/>
  </svg>
  <div style={{position:'absolute',inset:0,clipPath:'polygon(196px 175px,1724px 175px,1724px 879px,196px 879px)'}}>
  <div style={{position:'absolute',inset:0,transform:`translateX(${x}px) scale(${zoom})`,transformOrigin:'1200px 550px'}}>
   <div style={{position:'absolute',left:265,top:290,width:565,height:495,opacity:1-focus*.28}}>
    {Array.from({length:6},(_,i)=><div key={i} style={{position:'absolute',left:(i%3)*175,top:Math.floor(i/3)*230,rotate:'-2deg',filter:'drop-shadow(2px 3px 1px #2d1e1b25)'}}><PaperProduct kind="keychain" size={195}/></div>)}
   </div>
   <div style={{position:'absolute',left:925,top:245,width:720,height:547,rotate:'-4deg',filter:'drop-shadow(3px 5px 2px #2d1e1b44)'}}><PhoenixMotif id={`${id}-handmade`}/></div>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><ScissorAnimation frame={0} rest x={1535} y={802} scale={1.05}/></svg>
  </div>
  </div>
 </div>;
};
