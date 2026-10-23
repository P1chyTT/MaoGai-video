import {useId} from 'react';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {OldHouseStage} from '../shared/OldHouseStage';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {colors, FONT, tween} from '../shared/styleTokens';
import {CooperationCard} from './BusinessProps';

/** The computer is a flat wooden prop on the existing, right-lit paper stage. */
export const ComputerDesk=({frame}:{frame:number})=>{
 const id=useId().replace(/:/g,'');
 const typing=tween(frame,60,75)*(1-tween(frame,105,120));
 const lean=tween(frame,180,225);
 const pose={enter:1,settle:0,body:-.8-lean*.9,head:-2-lean*2,phoneArm:-4+Math.sin(frame*.55)*1.8*typing,freeArm:-3+Math.sin(frame*.55+1.3)*1.3*typing};
 const invitation=tween(frame,120,180);
 return <>
  <OldHouseStage frame={2100+frame}/>
  <div style={{position:'absolute',inset:0,background:'#f2e5cb',opacity:.2}}/>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
   <path d="M1240 900V479Q1290 440 1351 479V901M1260 490H1335" stroke={colors.wood} strokeWidth="12" fill="none"/>
  </svg>
  <div style={{position:'absolute',inset:0,clipPath:'inset(0 0 368px 0)'}}><XiaolinPuppet frame={frame} shot={7} pose={pose} x={1110} y={210} width={610}/></div>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,fontFamily:FONT}}>
   <defs><linearGradient id={`${id}-desk`} x2="0" y2="1"><stop stopColor="#b38e5b"/><stop offset="1" stopColor={colors.wood}/></linearGradient></defs>
   <path d="M133 815H1786V990H133Z" fill="#b39a72"/>
   <path d="M378 798L357 973H397L425 798M1567 798L1596 973H1639L1614 798" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
   <path d="M386 811H1608V862H386Z" fill="#61422f" stroke={colors.ink} strokeWidth="4"/>
   <path d="M337 712H1647L1733 803H262Z" fill={`url(#${id}-desk)`} stroke={colors.ink} strokeWidth="4"/>
   <g fill="none" stroke={colors.ink} opacity=".13">{Array.from({length:14},(_,i)=><path key={i} d={`M${330-i*3} ${726+i*5}Q950 ${720+i*5} ${1650+i*4} ${727+i*5}`}/>)}</g><path d="M262 803H1733V819H262Z" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
   <path d="M279 809H1717M411 839H1580" stroke={colors.gold} opacity=".6" strokeWidth="2"/>
   <path d="M815 632H884L910 717H783Z" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
   <path d="M756 718H932L958 732H731Z" fill={colors.wood} stroke={colors.ink} strokeWidth="3"/>
   <rect x="505" y="294" width="680" height="360" rx="5" fill={colors.wood} stroke={colors.ink} strokeWidth="6"/>
   <rect x="523" y="313" width="644" height="322" fill="#ddc79d" stroke={colors.gold} strokeWidth="2"/>
   <path d="M535 324H1154V622H535Z" fill="none" stroke={colors.red} strokeWidth="1" opacity=".6"/>
   <text x="550" y="356" fontSize="22" fill={colors.wood} letterSpacing="4">一纸生花 · 手作集</text>
   {[0,1,2].map(i=><g key={i} opacity={tween(frame,60+i*7,85+i*7)} transform={`translate(${551+i*199} 382)`}>
    <rect width="185" height="210" fill="#f2e5cb" stroke={colors.gold} strokeWidth="2"/>
    <svg x="6" y="10" width="174" height="155"><PhoenixMotif id={`${id}-thumb-${i}`}/></svg>
    <text x="92" y="189" textAnchor="middle" fontSize="19" fill={colors.wood}>{['凤舞迎春','纸上花开','福满人间'][i]}</text>
   </g>)}
   <path d="M1160 665H1380L1440 735H1110Z" fill="#bfa574" stroke={colors.wood} strokeWidth="4"/>
   {[0,1,2,3].map(r=><path key={r} d={`M${1151-r*10} ${680+r*12}H${1380+r*11}`} stroke={colors.wood} strokeWidth="3" opacity=".75"/>)}
   {[0,1,2,3,4,5,6,7].map(c=><path key={c} d={`M${1171+c*27} 674l23 50`} stroke={colors.wood} strokeWidth="2" opacity=".65"/>)}
   <path d="M396 746L535 738L562 774L412 782Z" fill={colors.red}/>
   <path d="M414 755L528 749M421 767L540 759" stroke={colors.gold} opacity=".6"/>
  </svg>
  <div style={{position:'absolute',left:530,top:320,width:640,height:380,transform:`translateY(${(1-invitation)*24}px) scale(.99,.83)`,transformOrigin:'0 0',opacity:invitation}}><CooperationCard progress={invitation}/></div>
  <div style={{position:'absolute',inset:0,background:'#493323',opacity:.36*(1-tween(frame,0,60)),pointerEvents:'none'}}/>
 </>;
};
