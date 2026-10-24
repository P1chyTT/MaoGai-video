import {useId} from 'react';
import {Img,staticFile} from 'remotion';
import {OldHouseStage,WoodLines} from '../shared/OldHouseStage';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {phoneGrip} from '../act02/characterMotion';
import {colors,tween} from '../shared/styleTokens';

/** The phone records the same connected phoenix used on the worktable. */
const CraftCamera=({id}:{id:string})=><div style={{width:164,height:106,position:'relative',filter:'drop-shadow(3px 4px 2px #2d1e1b36)'}}>
  <svg width="164" height="106" viewBox="0 0 164 106" style={{position:'absolute',inset:0}}>
    <rect x="2" y="2" width="160" height="102" rx="9" fill={colors.ink} stroke={colors.gold} strokeWidth="3"/>
    <rect x="14" y="10" width="136" height="86" rx="2" fill={colors.paper}/>
    <circle cx="156" cy="53" r="2.5" fill={colors.gold}/>
  </svg>
  <div style={{position:'absolute',left:25,top:12,width:112,height:82}}><PhoenixMotif id={id}/></div>
</div>;

export const PaperCutDetail=({frame,fps=30}:{frame:number;fps?:number})=>{
  const t=frame/fps;const uid=useId().replace(/:/g,'');
  const pose={enter:1,settle:0,body:-.4,head:-3+tween(t,2,3,0,-1),phoneArm:tween(t,2,2.8,18,25),freeArm:-3};
  const grip=phoneGrip(pose);
  const detailOut=tween(t,1.9,2.65);
  const zoom=tween(t,0,1,1,1.055);const pan=tween(t,1,2,0,-100);
  return <>
    <OldHouseStage frame={480+frame} grandmaFrame={frame} toolFrame={frame} puppetHeadAngle={-1} scale={1.015} shiftY={-6}
      behindTable={<>
        <XiaolinPuppet frame={frame} shot={5} pose={pose}/>
        <div style={{position:'absolute',left:grip.x-77,top:grip.y-61,rotate:`${grip.angle+3}deg`,transformOrigin:'77px 61px'}}><CraftCamera id={`${uid}-camera`}/></div>
      </>}/>
    <div style={{position:'absolute',inset:0,background:colors.paper,opacity:1-detailOut,translate:`${-80*detailOut}px 0`,scale:zoom,transformOrigin:'57% 57%'}}>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
        <defs><linearGradient id={`${uid}-wood`} x2=".2" y2="1"><stop stopColor="#c5a376"/><stop offset="1" stopColor="#a78157"/></linearGradient></defs>
        <rect x="154" y="157" width="1612" height="778" fill={colors.ink} opacity=".16"/>
        <rect x="168" y="149" width="1584" height="768" rx="5" fill={`url(#${uid}-wood)`} stroke={colors.wood} strokeWidth="7"/>
        <WoodLines detail/>
        <path d="M169 402H1752M169 660H1752" stroke={colors.wood} opacity=".16" strokeWidth="3"/>
        <path d="M1560 152H1746L1130 915H440Z" fill="#ffedbb" opacity=".14"/>
        <path d="M190 173H1729V891H190Z" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".55"/>
      </svg>
      <div style={{position:'absolute',inset:0,translate:`${pan}px 0`}}>
        <div style={{position:'absolute',left:385,top:230,width:1030,height:630,rotate:'-4deg',filter:'drop-shadow(3px 5px 2px #2d1e1b42)'}}><PhoenixMotif id={`${uid}-detail`}/></div>
        <div style={{position:'absolute',inset:0,clipPath:'inset(149px 0 0 0)'}}><Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',left:160,top:-400,width:1000,height:1500,clipPath:'polygon(59% 32%,65% 32%,83% 39%,93% 44%,94% 50%,86% 50%,76% 45%,63% 43%)',rotate:`${Math.sin(t*2.2)*.35}deg`,transformOrigin:'617px 513px'}}/></div>
        <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
          <ScissorAnimation frame={frame+6} x={1100} y={330} scale={1.14}/>
          <g fill={colors.red} opacity=".82">{[[340,370],[355,715],[1450,745],[1310,835],[1500,490]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l${10+i*2} -7l-7 16Z`}/>)}</g>
          <path d="M412 845Q650 822 894 860" fill="none" stroke={colors.wood} strokeWidth="1.5" opacity=".2"/>
        </svg>
      </div>
    </div>
  </>;
};
