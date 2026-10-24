import React, {useId} from 'react';
import {colors, FONT, tween} from '../shared/styleTokens';
import {PhoenixMotif} from '../shared/PhoenixMotif';

const clamp = (value:number) => Math.min(1, Math.max(0, value));
const ornament = 'M0 0C28-28 49-31 64-11C73 1 64 14 54 9C46 5 50-6 58-4M25-17Q19-39 36-43Q49-31 25-17M40-22Q53-48 67-37Q67-20 40-22';

/** Quiet paper-scroll invitation, opened with a normalized frame-derived progress. */
export const CooperationCard:React.FC<{progress:number}> = ({progress}) => {
  const id = `cooperation-${useId().replace(/:/g, '')}`;
  const p = tween(clamp(progress), 0, 1);
  return <svg width="640" height="380" viewBox="0 0 640 380" aria-label="合作邀请" style={{fontFamily:FONT, overflow:'visible'}}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#F9ECD0"/><stop offset="1" stopColor="#E7C99D"/></linearGradient></defs>
    <g opacity={p} transform={`translate(320 190) scale(${.94 + p * .06} ${.985 + p * .015}) translate(-320 -190)`}>
      <path d="M29 32Q19 53 29 71V315Q40 331 29 349H610Q622 330 611 312V72Q600 50 612 32Z" fill={colors.ink} opacity=".13" transform="translate(0 8)"/>
      <path d="M29 27Q19 48 29 66V310Q40 326 29 344H610Q622 325 611 307V67Q600 45 612 27Z" fill={`url(#${id})`} stroke={colors.wood} strokeWidth="3"/>
      <path d="M46 45H594V326H46Z" fill="none" stroke={colors.gold} strokeWidth="2"/>
      <path d="M57 58H583V313H57Z" fill="none" stroke={colors.red} strokeWidth="1" opacity=".7"/>
      <g fill="none" stroke={colors.red} strokeWidth="3" opacity=".8"><path d={ornament} transform="translate(73 93)"/><path d={ornament} transform="translate(567 93) scale(-1 1)"/><path d={ornament} transform="translate(73 278) scale(1 -1)"/><path d={ornament} transform="translate(567 278) scale(-1 -1)"/></g>
      <g fill={colors.red} transform="translate(320 77)"><path d="M0-14Q-20-11-13 3Q-23 19-4 18Q1 32 8 17Q29 17 15 2Q20-15 0-14Z"/><circle r="5" fill={colors.paper}/></g>
      <text x="320" y="178" textAnchor="middle" fontSize="55" letterSpacing="10" fill={colors.red}>合作邀请</text>
      <path d="M133 209H507" stroke={colors.gold} strokeWidth="1.7"/><path d="M302 209L320 200L338 209L320 218Z" fill={colors.gold}/>
      <text x="320" y="261" textAnchor="middle" fontSize="27" letterSpacing="2" fill={colors.ink}>让一纸手艺，被更多人看见</text>
      <path d="M24 29H42V342H24ZM599 29H617V342H599Z" fill={colors.wood} stroke={colors.gold} strokeWidth="2"/>
      <path d="M24 42H42M24 329H42M599 42H617M599 329H617" stroke={colors.gold} strokeWidth="4"/>
    </g>
  </svg>;
};

export const BusinessPriceStamp:React.FC<{progress?:number;emphasis?:number}> = ({progress=1, emphasis=1}) => {
  const id = `price-${useId().replace(/:/g, '')}`;
  const p = tween(clamp(progress), 0, 1);
  return <svg width="300" height="160" viewBox="0 0 300 160" aria-label="9.9元包邮" style={{fontFamily:FONT, overflow:'visible'}}>
    <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor="#B43B35"/><stop offset="1" stopColor={colors.red}/></linearGradient></defs>
    <g opacity={p * (.62 + .38 * clamp(emphasis))} transform={`translate(150 ${80 - (1-p) * 12}) scale(${.96+p*.04}) translate(-150 -80)`}>
      <path d="M14 15H286V145H14Z" fill={colors.ink} opacity=".17" transform="translate(0 5)"/>
      <path d="M11 12H289V148H11Z" fill={`url(#${id})`} stroke={colors.wood} strokeWidth="2"/>
      <path d="M20 21H280V139H20Z" fill="none" stroke={colors.gold} strokeWidth="2"/>
      <path d="M27 29H273V131H27Z" fill="none" stroke={colors.paper} strokeWidth="1" opacity=".55"/>
      <g fill="none" stroke={colors.gold} strokeWidth="3"><path d="M20 45H34V21M266 21V45H280M20 115H34V139M266 139V115H280"/></g>
      <text x="150" y="83" textAnchor="middle" fontSize="43" letterSpacing="1" fill={colors.paper}>9.9元包邮</text>
      <text x="150" y="116" textAnchor="middle" fontSize="17" letterSpacing="2" fill="#E8CA8E">统一包装 · 量产销售</text>
    </g>
  </svg>;
};

/** Three craft-paper metaphors for packaging; no platform or app interface. */
export const CommercialSymbols:React.FC<{progress?:number;opacity?:number}> = ({progress=1, opacity=1}) => {
  const p = clamp(progress);
  return <svg width="660" height="210" viewBox="0 0 660 210" style={{fontFamily:FONT}}>
    {[0,1,2].map((index) => {
      const reveal = tween(p, index*.18, .54+index*.18);
      return <g key={index} transform={`translate(${index*220 + 10} ${10+(1-reveal)*8})`} opacity={reveal*opacity}>
        <path d="M10 4H190L198 16V174L187 188H8V15Z" fill={colors.paper} fillOpacity=".9" stroke={colors.gold} strokeWidth="1.5"/>
        <path d="M20 14H182V176H20Z" fill="none" stroke={colors.wood} strokeWidth="1" opacity=".55"/>
        {index===0 ? <g fill="none" stroke={colors.red} strokeWidth="3"><path d="M46 45H154V113H46Z"/><path d="M39 63V38H65M135 38H161V63M39 94V121H65M135 121H161V94"/><path d="M58 103Q76 69 94 84Q111 49 144 103Z"/><circle cx="75" cy="58" r="6"/></g>
          : index===1 ? <g fill="none" stroke={colors.jade} strokeWidth="3" strokeLinecap="round"><path d="M55 40Q97 18 141 40L148 112Q99 134 49 112Z" fill="#D8C6A0" fillOpacity=".35"/><path d="M58 49Q99 30 138 49M56 63Q99 45 140 63M54 77Q99 61 142 77M52 91Q99 79 144 91M51 105Q99 95 146 105"/><path d="M81 35L77 120M119 35L123 120" stroke={colors.wood}/></g>
          : <g fill="none" stroke={colors.wood} strokeWidth="3"><path d="M49 39Q64 33 69 43H151L143 117H58Z" fill="#ECDAB5"/><path d="M72 59H132M71 76H130M69 93H111" stroke={colors.red}/><path d="M138 32L152 35L144 121L130 118Z" fill={colors.wood} strokeWidth="1"/></g>}
        <text x="101" y="158" textAnchor="middle" fontSize="28" letterSpacing="5" fill={colors.ink}>{['滤镜','配乐','话术'][index]}</text>
      </g>;
    })}
  </svg>;
};

/** Fading symbols that keep the connected phoenix sheet as the story's focal point. */
export const PaperCutProducts:React.FC<{progress:number}> = ({progress}) => {
  const id = `products-${useId().replace(/:/g, '')}`;
  const p = tween(clamp(progress), 0, 1);
  return <svg width="680" height="230" viewBox="0 0 680 230" style={{fontFamily:FONT}}>
    <g opacity={p*.76} transform={`translate(0 ${(1-p)*8})`}>
      <g transform="translate(12 12)"><path d="M8 5H190V154L164 181H8Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/><path d="M164 181V154H190" fill="#D7BF98" stroke={colors.gold} strokeWidth="1.5"/><svg x="30" y="14" width="140" height="112"><PhoenixMotif id={`${id}-sticker`}/></svg><text x="98" y="158" textAnchor="middle" fontSize="26" letterSpacing="4" fill={colors.ink}>贴纸</text></g>
      <g transform="translate(241 12)"><path d="M100 5C66-5 63 35 100 41C136 35 136 5 100 5Z" fill="none" stroke={colors.wood} strokeWidth="3"/><path d="M100 30L169 77L155 154L100 183L45 154L31 77Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/><svg x="47" y="55" width="106" height="87"><PhoenixMotif id={`${id}-pendant`}/></svg><text x="100" y="167" textAnchor="middle" fontSize="25" letterSpacing="4" fill={colors.ink}>挂件</text><path d="M99 184V206M91 184L87 204M107 184L113 204" stroke={colors.red} strokeWidth="3"/></g>
      <g transform="translate(469 12)"><path d="M6 32H188V166H6Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/><path d="M14 39H181V158H14Z" fill="none" stroke={colors.wood} strokeWidth="1" opacity=".4"/><path d="M35 63H159M35 81H159M35 98H123" stroke={colors.red} strokeWidth="2" opacity=".8"/><text x="98" y="139" textAnchor="middle" fontSize="25" letterSpacing="3" fill={colors.ink}>顺口溜</text></g>
    </g>
  </svg>;
};

export const SocialMetric:React.FC<{progress:number}> = ({progress}) => {
  const p = tween(clamp(progress), 0, 1);
  const views = Math.round(1280+p*26320).toLocaleString('en-US');
  const forwards = Math.round(96+p*1184).toLocaleString('en-US');
  const likes = Math.round(238+p*3322).toLocaleString('en-US');
  return <svg width="320" height="120" viewBox="0 0 320 120" style={{fontFamily:FONT}}>
    <path d="M9 8H310V112H9Z" fill={colors.paper} fillOpacity=".95" stroke={colors.gold} strokeWidth="1.5"/>
    <path d="M17 16H302V104H17Z" fill="none" stroke={colors.wood} strokeWidth=".7" opacity=".5"/>
    <g fill="none" stroke={colors.red} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M29 42Q43 25 57 42Q43 59 29 42Z"/><circle cx="43" cy="42" r="5"/>
      <path d="M135 49V40Q135 32 146 32H153V24L166 37L153 49V41H147Q142 41 142 49Z"/>
      <path d="M236 51V38H242L248 25Q255 24 253 32L251 37H265L261 53H242Z"/>
    </g>
    <text x="43" y="76" textAnchor="middle" fontSize="20" fill={colors.ink}>{views}</text>
    <text x="150" y="76" textAnchor="middle" fontSize="20" fill={colors.ink}>{forwards}</text>
    <text x="252" y="76" textAnchor="middle" fontSize="20" fill={colors.ink}>{likes}</text>
    <g fontSize="15" fill={colors.wood} letterSpacing="2"><text x="43" y="96" textAnchor="middle">观看</text><text x="150" y="96" textAnchor="middle">转发</text><text x="252" y="96" textAnchor="middle">赞</text></g>
  </svg>;
};
