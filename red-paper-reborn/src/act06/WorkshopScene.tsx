import {useId} from 'react';
import {colors,tween} from '../shared/styleTokens';
import {PuppetCharacter} from '../shared/PuppetCharacter';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {YouthPuppet,WindowFlower} from './YouthPuppet';

const Learner=({x,y,flip=false}:{x:number;y:number;flip?:boolean})=><g transform={`translate(${x} ${y}) scale(${flip?-1:1} 1)`} fill={colors.jade} stroke={colors.wood} strokeWidth="2.5" opacity=".38">
 <path d="M-22-26Q-25-71 7-77Q30-72 25-43L38-33L28-26L22-15L7-5L-6-8L-12 13H-36Z"/>
 <path d="M-21-14Q-49-1-56 43L-75 135L-47 149L-24 75L-33 220H61L43 74L91 109L109 89L47 33L26 3Z"/>
 <path d="M-18 222L-24 347H0L12 236L28 347H54L47 222Z"/>
 <path d="M-9 17L8 56L30 17M8 56V203M-28 158Q9 125 44 158" fill="none" stroke={colors.gold} strokeWidth="3"/>
 <circle cx="-28" cy="42" r="6" fill={colors.gold}/><circle cx="41" cy="42" r="6" fill={colors.gold}/>
 <path d="M-17 107Q8 76 32 107Q8 133-17 107Z" fill={colors.paper} stroke="none"/>
</g>;

export const WorkshopScene=({frame,fps=30}:{frame:number;fps?:number})=>{
 const t=frame/fps;const uid=useId().replace(/:/g,'');
 return <div style={{position:'absolute',inset:0,scale:tween(t,0,1,1.5,1),transformOrigin:'51% 67%'}}>
   <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
     <defs><linearGradient id={`${uid}-roof`} x2="0" y2="1"><stop stopColor="#bc5040"/><stop offset="1" stopColor={colors.red}/></linearGradient><linearGradient id={`${uid}-table`} x2=".3" y2="1"><stop stopColor="#b28a5b"/><stop offset="1" stopColor={colors.wood}/></linearGradient></defs>
     <path d="M80 593Q297 380 560 535Q825 320 1080 472Q1320 328 1600 503Q1750 404 1840 480V910H80Z" fill={colors.jade} opacity=".09"/>
     <path d="M90 845Q500 817 930 854Q1500 796 1840 849V965H80Z" fill={colors.wood} opacity=".08"/>
     <g fill="none" stroke={colors.wood} strokeWidth="3" opacity=".24"><path d="M90 606Q250 550 430 588M1530 578Q1680 533 1840 565M125 843Q350 814 580 850M1400 870Q1650 818 1810 847"/></g>
     <Learner x={221} y={425}/><Learner x={1580} y={435} flip/>
     <path d="M225 260V940M1695 260V940" stroke={colors.wood} strokeWidth="17"/>
     <path d="M178 220Q960 155 1742 220L1709 299Q960 247 211 299Z" fill={`url(#${uid}-roof)`} stroke={colors.wood} strokeWidth="5"/>
     <path d="M215 253Q960 199 1705 253" fill="none" stroke={colors.gold} strokeWidth="2"/>
     <g fill={colors.gold} opacity=".65">{[335,580,825,1070,1315,1560].map(x=><path key={x} d={`M${x-24} 267l24 22l24-22l-24-17Z`}/>)}</g>
     <path d="M1533 294H1700L1070 947H540Z" fill="#fff1bf" opacity=".12"/>
   </svg>
   <div style={{position:'absolute',inset:0,translate:'-160px 75px',scale:.86,transformOrigin:'0 0'}}><PuppetCharacter frame={frame} headAngle={-1+tween(t,1,2,0,1)} forearmAngle={0}/></div>
   <YouthPuppet frame={frame} x={720} y={185} width={525}/>
   <XiaolinPuppet frame={frame} shot={5} x={1360} y={265} width={415} pose={{enter:1,settle:0,head:2-tween(t,1,2,0,2),body:-.4,phoneArm:0,freeArm:-2}}/>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
     <path d="M325 770L306 959H347L373 770M1570 770L1590 959H1633L1612 770" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
     <path d="M343 790H1602V858Q1560 877 1527 851H414Q370 880 343 850Z" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
     <path d="M365 716H1572L1680 783H258Z" fill={`url(#${uid}-table)`} stroke={colors.ink} strokeWidth="4"/>
     <path d="M258 783H1680V798H258Z" fill="#513827" stroke={colors.ink} strokeWidth="3"/>
     <path d="M274 789H1661M376 824H1567M394 838H1551" stroke={colors.gold} strokeWidth="2" opacity=".6"/>
     {Array.from({length:8},(_,i)=><path key={i} d={`M${353+i*20} ${724+i*6}Q880 ${728+i*7} ${1576+i*5} ${730+i*6}`} stroke={colors.wood} strokeWidth="1.2" opacity=".3" fill="none"/>)}
     <path d="M659 725L859 728L900 765L620 764Z" fill={colors.red}/><path d="M1140 731H1355L1385 764H1115Z" fill={colors.red}/>
     <ScissorAnimation frame={frame} x={788} y={716} scale={.53}/><ScissorAnimation rest frame={0} x={1317} y={743} scale={.47}/>
     <g transform="translate(752 657)"><path d="M-35-5L35-11L50 26L-31 33Z" fill={colors.red}/><ScissorAnimation frame={frame} scale={.34}/></g>
     <g fill={colors.red}>{[[925,746],[988,766],[1060,734],[606,754]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l12-5l-6 12Z`}/>)}</g>
   </svg>
   <div style={{position:'absolute',left:405,top:710,width:190,height:115,scale:'1 .42',transformOrigin:'50% 0'}}><PhoenixMotif id={`${uid}-sample`}/></div>
   <div style={{position:'absolute',left:952,top:714,scale:'1 .31',transformOrigin:'50% 0'}}><WindowFlower size={160}/></div>
 </div>;
};
