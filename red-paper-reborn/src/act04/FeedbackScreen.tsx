import React, {useId} from 'react';
import {colors, FONT, tween} from '../shared/styleTokens';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {PrintedPhoenix, VideoCover} from './ProductProps';
import comments from './comments.json';

export type FeedbackScreenProps = {frame:number;mode:'design'|'feedback';fps?:number};

/** Paper cards inside the existing 644 × 322 monitor; every change follows frame. */
export const FeedbackScreen:React.FC<FeedbackScreenProps> = ({frame,mode,fps=30}) => {
  const id=`act04-screen-${useId().replace(/:/g,'')}`;
  const t=frame/fps;
  const edit=tween(t,4,7);
  const finish=tween(t,6.5,7.2);
  const mouseX=438-tween(t,4,5.2,0,312)+tween(t,5.2,6.5,0,265);
  const mouseY=231-tween(t,4,5.2,0,80)+tween(t,5.2,6.5,0,16);
  const rise=tween(t,.15,4);
  const coverFade=tween(t,4,8,0,.9);

  return <svg width="644" height="322" viewBox="0 0 644 322" style={{fontFamily:FONT}} aria-label={mode==='design'?'小林重新设计剪纸封面':'互动上升与网友评论'}>
    <defs><clipPath id={`${id}-bounds`}><path d="M0 0H644V322H0Z"/></clipPath></defs>
    <g clipPath={`url(#${id}-bounds)`}>
      <path d="M0 0H644V322H0Z" fill="#DDC79D"/>
      <path d="M11 11H633V311H11Z" fill="none" stroke={colors.red} strokeWidth="1" opacity=".6"/>
      {mode==='design'?<>
        <g opacity={1-tween(t,4,4.55)}>
          <text x="322" y="37" textAnchor="middle" fontSize="22" letterSpacing="5" fill={colors.wood}>剪纸 · 方案手札</text>
          <svg x="168" y="57" width="307" height="233"><PhoenixMotif id={`${id}-original`}/></svg>
          <path d="M104 156H142M502 156H540" stroke={colors.gold} strokeWidth="2"/>
        </g>
        <g opacity={edit*(1-finish)} transform={`translate(${-30*(1-edit)} 0)`}>
          <path d="M23 75H185V276H23Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/>
          <svg x="38" y="88" width="132" height="132"><PrintedPhoenix size={132}/></svg>
          <text x="104" y="252" textAnchor="middle" fontSize="22" letterSpacing="2" fill={colors.wood}>印花样稿</text>
        </g>
        <g opacity={edit}>
          <svg x={203-finish*103} y={50-finish*32} width={407+finish*37} height={256+finish*24} viewBox="0 0 700 440"><VideoCover progress={edit}/></svg>
        </g>
        <g opacity={tween(t,4,4.3)*(1-tween(t,7,7.7))} transform={`translate(${mouseX} ${mouseY}) rotate(-8)`}>
          <path d="M0 0L5 33L14 24L22 37L29 33L21 20L34 19Z" fill={colors.paper} stroke={colors.wood} strokeWidth="2"/>
        </g>
      </>:<>
        <g opacity={1-coverFade}>
          <svg x="123" y="60" width="398" height="250" viewBox="0 0 700 440"><VideoCover/></svg>
        </g>
        <path d="M17 13H627V62H17Z" fill={colors.paper} fillOpacity=".92"/>
        <path d="M24 48H230" stroke={colors.wood} strokeWidth="1" opacity=".35"/>
        <path d="M24 47L64 44L108 38L150 31L195 16L229 13" pathLength="1" stroke={colors.jade} strokeWidth="3" fill="none" strokeDasharray="1" strokeDashoffset={1-rise} strokeLinecap="round"/>
        <text x="269" y="42" fontSize="23" letterSpacing="2" fill={colors.wood}>观看 · 持续增加</text>
        <g transform="translate(592 35)" fill="none" stroke={colors.red} strokeWidth="2"><path d="M-19 0Q0-19 19 0Q0 19-19 0Z"/><circle r="6"/></g>
        {comments.slice(0,3).map((text:string,index:number)=>{
          const appear=tween(t,4+index*1.5,4.5+index*1.5);
          const y=80+index*75;
          return <g key={text} opacity={appear} transform={`translate(${(1-appear)*12} 0)`}>
            <path d={`M44 ${y+4}H602V${y+64}H44Z`} fill={colors.ink} opacity=".15"/>
            <path d={`M40 ${y}H598V${y+61}H40Z`} fill="#F7ECD5" stroke={colors.gold} strokeWidth="1.5"/>
            <path d={`M48 ${y+8}H590V${y+53}H48Z`} fill="none" stroke={colors.wood} strokeWidth=".7" opacity=".35"/>
            <path d={`M54 ${y+18}H62V${y+43}H54Z`} fill={colors.red} opacity=".65"/>
            <text x="89" y={y+42} fontSize="34" letterSpacing="2" fill={colors.ink}>{text}</text>
          </g>;
        })}
      </>}
    </g>
  </svg>;
};
