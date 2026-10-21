import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors, FONT} from './styleTokens';
import './font';

export const ShadowStage: React.FC<React.PropsWithChildren> = ({children}) => <AbsoluteFill style={{background:colors.paper,fontFamily:FONT,overflow:'hidden'}}>
  {children}
  <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at 66% 36%, transparent 30%, rgba(63,35,20,.16) 100%)'}}/>
  <Img src={staticFile('assets/backgrounds/paper-grain.svg')} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:.075,mixBlendMode:'multiply'}}/>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
    <path d="M40 1000V42H1880V1000" fill="none" stroke={colors.ink} strokeWidth="12"/>
    <path d="M58 982V60H1862V982" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".65"/>
    {[70,1770].map(x=><g key={x} transform={`translate(${x} 70)`} fill="none" stroke={colors.gold} strokeWidth="3" opacity=".6"><path d="M0 65V0H65M12 55V12H55M24 43V24H43"/></g>)}
    <path d="M40 1000H1880" stroke={colors.wood} strokeWidth="3" opacity=".6"/>
  </svg>
</AbsoluteFill>;

export const StageMark = () => <div style={{position:'absolute',top:176,left:220,display:'flex',alignItems:'center',gap:15,color:colors.wood,fontSize:22,letterSpacing:5}}><span style={{border:`1px solid ${colors.red}`,color:colors.red,padding:'4px 5px',fontSize:20,letterSpacing:2}}>非遗</span><span>剪纸 · 一纸传心</span></div>;
