import {useId} from 'react';
import {colors, FONT, tween} from '../shared/styleTokens';
import {PhoenixMotif} from '../shared/PhoenixMotif';

export const VideoCard=({index}:{index:number})=>{
 const motifId=useId().replace(/:/g,'');
 const themes=['灯火人间','一纸生花','衣冠风雅','手作有心','凤舞迎春'];
 return <g transform={`translate(0 ${index*285})`}>
  <rect x="9" y="9" width="242" height="264" rx="2" fill={index%2?colors.paper:'#ded0ae'} stroke={colors.gold} strokeWidth="2"/>
  <path d="M20 33V20H45M215 20H240V33M20 235V250H45M215 250H240V235" stroke={colors.wood} fill="none" strokeWidth="2"/>
  {index%3===0?<g transform="translate(130 104)" stroke={colors.ink} strokeWidth="2"><path d="M-58-39Q0-65 58-39V43Q0 65-58 43Z" fill={colors.red}/><path d="M0-51V53M-31-48Q-45 0-31 51M31-48Q45 0 31 51" fill="none" stroke={colors.gold}/><path d="M-15-57H15M-15 57H15M-10 57V85M0 57V91M10 57V85" stroke={colors.gold} strokeWidth="5"/><path d="M-65 82q-30-35-54-5q10 14 22-2M67-94q31-33 48 0q-22 19-30-2" fill="none" stroke={colors.jade} strokeWidth="4"/></g>:index%3===1?<foreignObject x="17" y="18" width="224" height="176"><PhoenixMotif id={motifId}/></foreignObject>:<g transform="translate(130 105)" stroke={colors.wood} strokeWidth="3"><path d="M-23-48Q0-64 23-48L28-10L77 10L57 53L29 39L38 90H-38L-29 39L-57 53L-77 10L-28-10Z" fill={colors.jade}/><path d="M-23-48L0-20L23-48M0-20V85" stroke={colors.gold} fill="none"/><path d="M-22 28Q0 8 22 28Q0 49-22 28Z" fill="none" stroke={colors.paper}/><circle cy="29" r="5" fill={colors.red}/></g>}
  <text x="130" y="221" textAnchor="middle" fontFamily={FONT} fontSize="25" letterSpacing="3" fill={colors.ink}>{themes[index%themes.length]}</text>
  <path d="M67 239H193" stroke={colors.gold}/>
 </g>;
};

export const PhoneFrame=({frame=0,metricFrame=frame,lit=true,metrics=false}:{frame?:number;metricFrame?:number;lit?:boolean;metrics?:boolean})=>{
 const uid=useId().replace(/:/g,'');
 const scroll=tween(frame,60,180,0,260)+tween(frame,180,270,0,450)+tween(frame,270,330,0,145);
 return <svg viewBox="0 0 300 560" width="100%" height="100%" style={{overflow:'visible',filter:'drop-shadow(4px 7px 3px #2d1e1b44)'}}>
  <defs><clipPath id={uid}><rect x="20" y="55" width="260" height="444" rx="3"/></clipPath></defs>
  <rect x="0" y="0" width="300" height="560" rx="22" fill={colors.ink} stroke={colors.gold} strokeWidth="5"/>
  <rect x="10" y="10" width="280" height="540" rx="15" fill="none" stroke={colors.wood} strokeWidth="2"/>
  <path d="M120 28H180" stroke={colors.gold} strokeWidth="4" strokeLinecap="round"/><circle cx="150" cy="528" r="10" fill="none" stroke={colors.gold} strokeWidth="2"/>
  <rect x="20" y="55" width="260" height="444" fill={lit?colors.paper:colors.wood}/>
  {lit?<g clipPath={`url(#${uid})`}><g transform={`translate(20 ${55-scroll})`}>{[0,1,2,3,4].map(i=><VideoCard key={i} index={i}/>)}</g></g>:null}
  {metrics?<g transform="translate(29 425)"><rect width="242" height="64" fill={colors.paper} stroke={colors.gold}/><path d="M15 24q15-19 30 0q-15 19-30 0Z" fill="none" stroke={colors.red} strokeWidth="2"/><circle cx="30" cy="24" r="4" fill={colors.red}/><text x="57" y="32" fontFamily={FONT} fontSize="24" fill={colors.ink}>{Math.round(tween(metricFrame,210,330,120,2680))}</text><path d="M170 42V20h10V9h10v14h24l-5 19Z" fill="none" stroke={colors.jade} strokeWidth="2"/></g>:null}
 </svg>;
};
