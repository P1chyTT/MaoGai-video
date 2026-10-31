import type {PropsWithChildren} from 'react';
import {AbsoluteFill,Img,staticFile} from 'remotion';
import {colors,FONT} from './styleTokens';
import './font';
/** Reused paper-stage technique; contains no former story marks or character references. */
export const ShadowStage=({children}:PropsWithChildren)=><AbsoluteFill style={{background:colors.paper,fontFamily:FONT,overflow:'hidden'}}>
 {children}
 <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at 66% 36%,transparent 30%,rgba(49,93,69,.13) 100%)'}}/>
 <Img src={staticFile('assets/backgrounds/paper-grain.svg')} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:.065,mixBlendMode:'multiply'}}/>
 <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}><path d="M40 1000V42H1880V1000H40" fill="none" stroke={colors.forest} strokeWidth="8"/><path d="M58 982V60H1862V982H58" fill="none" stroke={colors.gold} strokeWidth="1.5" opacity=".65"/></svg>
</AbsoluteFill>;
