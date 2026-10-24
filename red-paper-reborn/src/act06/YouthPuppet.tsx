import {useId} from 'react';
import {Img,staticFile} from 'remotion';
import {colors,tween} from '../shared/styleTokens';

export const WindowFlower=({size=180}:{size?:number})=>{
 const id=useId().replace(/:/g,'');
 return <svg width={size} height={size} viewBox="-100 -100 200 200" style={{overflow:'visible'}}>
   <defs><mask id={id}><rect x="-100" y="-100" width="200" height="200" fill="black"/><circle r="90" fill="white"/><circle r="76" fill="black"/>{Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45})`}><path d="M-6 0Q-39-47 0-79Q39-47 6 0Z" fill="white"/><path d="M0-16Q-20-46 0-66Q20-46 0-16Z" fill="black"/></g>)}<circle r="23" fill="white"/><circle r="9" fill="black"/></mask></defs>
   <rect x="-100" y="-100" width="200" height="200" fill={colors.red} mask={`url(#${id})`}/>
 </svg>;
};

/** Unchanged source puppet: a restrained rigid lean, paper movement, no whole-image deformation. */
export const YouthPuppet=({frame,x=720,y=185,width=525,showPaper=true}:{frame:number;x?:number;y?:number;width?:number;showPaper?:boolean})=>{
 const lift=tween(frame,31,76);const s=width/1024;
 return <div style={{position:'absolute',left:x,top:y,width,height:width*1.5,rotate:`${tween(frame,20,50,.5,-.65)+tween(frame,58,82,0,.6)}deg`,transformOrigin:'45% 92%',filter:'drop-shadow(5px 7px 3px #2d1e1b30)'}}>
   <Img src={staticFile('assets/characters/youth.png')} style={{position:'absolute',inset:0,width,height:width*1.5}}/>
   {showPaper?<div style={{position:'absolute',left:895*s-83,top:694*s-45-42*lift,rotate:`${tween(frame,31,76,-8,0)}deg`,filter:'drop-shadow(2px 3px 1px #2d1e1b35)'}}><WindowFlower size={166}/></div>:null}
 </div>;
};
