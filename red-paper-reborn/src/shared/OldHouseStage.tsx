import React, {useId} from 'react';
import {colors, tween} from './styleTokens';
import {PuppetCharacter} from './PuppetCharacter';
import {ScissorAnimation} from './ScissorAnimation';

const Flower:React.FC<{x:number;y:number;r?:number}> = ({x,y,r=14}) => <g transform={`translate(${x} ${y})`} fill="none" stroke={colors.gold} strokeWidth="1.5">{Array.from({length:6},(_,i)=><ellipse key={i} cx="0" cy={-r*.65} rx={r*.35} ry={r*.65} transform={`rotate(${i*60})`}/>)}<circle r={r*.24}/></g>;

export const WoodLines:React.FC<{detail?:boolean}> = ({detail=false}) => <g fill="none" stroke="#36221c" opacity={detail?.16:.19} strokeWidth={detail?1.3:1}>
  {Array.from({length:24},(_,i)=><path key={i} d={`M${detail?180:540} ${detail?195+i*27:744+i*2} Q${700+i*19} ${detail?170+i*27:753+i*2} ${detail?1730:1650} ${detail?200+i*27:745+i*2}`}/>)}
</g>;

export const OldHouseStage:React.FC<{frame:number;grandmaFrame?:number;scale?:number;shiftX?:number;shiftY?:number;intro?:boolean;detail?:boolean;children?:React.ReactNode}> = ({frame,grandmaFrame,scale=1,shiftX=0,shiftY=0,intro=false,detail=false,children}) => {
  const prefix=useId().replace(/:/g,'');
  const id=(s:string)=>`${prefix}-${s}`;
  const url=(s:string)=>`url(#${id(s)})`;
  const light=tween(frame,60,180,0,25);
  const pass=grandmaFrame===undefined?0:tween(grandmaFrame,120,240,0,1);
  const curl=Math.sin(Math.PI*tween(frame,135,210))*8;
  return <>
    <div style={{position:'absolute',inset:0,transform:`translate(${shiftX}px,${shiftY}px) scale(${scale})`,transformOrigin:'58% 66%'}}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
        <defs>
          <linearGradient id={id('wall')} x2=".8" y2="1"><stop stopColor="#d4b98c"/><stop offset=".6" stopColor={colors.paper}/><stop offset="1" stopColor="#d4b785"/></linearGradient>
          <linearGradient id={id('outside')} x2="0" y2="1"><stop stopColor="#edd8ac"/><stop offset="1" stopColor="#c4ae7e"/></linearGradient>
          <linearGradient id={id('sun')} x1="1" y1="0" x2=".1" y2="1"><stop stopColor="#fff1bf" stopOpacity=".52"/><stop offset="1" stopColor="#fff3c7" stopOpacity="0"/></linearGradient>
          <linearGradient id={id('woodtop')} x2="0" y2="1"><stop stopColor="#9d784f"/><stop offset="1" stopColor={colors.wood}/></linearGradient>
          <clipPath id={id('window-hole')}><rect x="1268" y="229" width="396" height="388"/></clipPath>
        </defs>
        <rect x="70" y="68" width="1780" height="920" fill={url('wall')}/>
        <path d="M93 156H1825M92 917H1825" stroke="#796044" strokeWidth="4" opacity=".4"/>
        <path d="M106 145H1814" stroke="#432d22" strokeWidth="39"/><path d="M114 123H1807" stroke="#aa8150" strokeWidth="3"/>
        <rect x="111" y="148" width="22" height="840" fill={colors.wood}/><rect x="1786" y="148" width="24" height="840" fill={colors.wood}/>
        <path d="M90 866H1835V990H90Z" fill="#af936a" opacity=".6"/>
        <path d="M130 890H1787M130 936H1787M330 866L220 988M1600 866L1704 988" stroke={colors.wood} opacity=".18" strokeWidth="2"/>
        <g opacity=".7"><path d="M232 292h152v254H232Z" fill="#c7ac80" stroke={colors.wood} strokeWidth="6"/><path d="M245 305h126v224H245Z" fill="#e5d2af" stroke={colors.wood} strokeWidth="1"/>
          <path d="M305 482Q270 401 330 349M300 440Q253 431 274 393M306 407Q344 399 346 374" fill="none" stroke={colors.jade} strokeWidth="4"/>
          <Flower x={327} y={351}/><Flower x={276} y={397} r={11}/><Flower x={342} y={375} r={10}/>
          <path d="M225 287H391M225 552H391" stroke={colors.ink} strokeWidth="12"/>
        </g>
        <g transform="translate(210 635)"><path d="M0 0h275v15H0Z" fill={colors.wood}/><path d="M16 15v105M259 15v105" stroke={colors.wood} strokeWidth="10"/>
          <path d="M36-10Q20-52 35-78H91Q107-52 94-10Z" fill={colors.jade} stroke={colors.ink} strokeWidth="3"/><path d="M31-73H95M35-28H94" stroke={colors.gold} strokeWidth="3"/>
          <path d="M61-78Q38-160 6-172M60-80Q86-149 125-153M47-118L17-122M76-121L111-119" fill="none" stroke={colors.wood} strokeWidth="5"/><Flower x={5} y={-172} r={10}/><Flower x={125} y={-153} r={12}/><Flower x={18} y={-123} r={8}/>
          <path d="M148-16v-47h76v47" fill="#b39863" stroke={colors.wood} strokeWidth="3"/><path d="M144-63h84v-9h-84Z" fill={colors.wood}/><path d="M151-52h70M151-40h70M151-28h70M163-60v44M181-60v44M200-60v44" stroke={colors.wood} strokeWidth="2" opacity=".7"/>
        </g>
        <rect x="1244" y="205" width="444" height="436" rx="3" fill={colors.wood} stroke={colors.ink} strokeWidth="5"/>
        <g clipPath={url('window-hole')}><rect x="1268" y="229" width="396" height="388" fill={url('outside')}/>
          <path d="M1235 498Q1325 395 1406 476Q1508 354 1710 467V630H1235Z" fill={colors.jade} opacity=".14"/>
          <path d="M1608 610Q1587 451 1635 247M1615 436Q1542 401 1538 350M1613 455Q1684 398 1688 350" fill="none" stroke={colors.wood} strokeWidth="6" opacity=".25"/>
          {grandmaFrame!==undefined&&grandmaFrame>=120&&grandmaFrame<=240?<g transform={`translate(${1740-pass*590} ${498+Math.sin(pass*Math.PI*7)*2})`} fill={colors.ink} opacity=".32"><path d="M-23-12Q-30-49-7-54Q22-53 19-19L34 0L20 9L10 15Q18 45 43 118H-56Q-43 53-26 24Z"/><path d="M18 61L68 103L75 177" fill="none" stroke={colors.ink} strokeWidth="8"/><path d="M-21 110L-41 178M12 110L38 178" stroke={colors.ink} strokeWidth="14"/></g>:null}
        </g>
        <g stroke={colors.wood} fill="none" strokeWidth="9">{[1268,1367,1466,1565,1664].map(x=><path key={x} d={`M${x} 229V617`}/>)}{[229,326,423,520,617].map(y=><path key={y} d={`M1268 ${y}H1664`}/>)}
          {[1317,1416,1515,1614].map(x=>[277,374,471,568].map(y=><path key={`${x}-${y}`} d={`M${x-32} ${y}L${x} ${y-33}L${x+32} ${y}L${x} ${y+33}Z`} strokeWidth="4"/>))}
        </g>
        <path d="M1233 649H1696" stroke="#39271f" strokeWidth="17"/><path d="M1245 643H1688" stroke={colors.gold} strokeWidth="2"/>
        <path d={`M${1290+light} 240H1647L1190 882H375Z`} fill={url('sun')}/>
        {Array.from({length:9},(_,i)=><ellipse key={i} cx={1040+i*65+Math.sin(frame/90+i)*7} cy={372+i*39-((frame*(.04+i*.003))%100)} rx={i%2?1.4:2.1} ry="1" fill="#fff3cb" opacity=".55"/>)}
        {/* A chair and control rods make the flat silhouette read as a seated puppet. */}
        {grandmaFrame!==undefined?<g fill="none" stroke={colors.wood}><path d="M615 783V512Q650 475 686 512V797M628 525H672M638 536V773M661 536V773" strokeWidth="9"/><path d="M626 810L611 960M686 810L699 956" strokeWidth="12"/></g>:null}
      </svg>
      {grandmaFrame!==undefined?<PuppetCharacter frame={grandmaFrame}/>:null}
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
        <g style={{filter:'drop-shadow(0px 8px 5px rgba(45,30,27,.16))'}}>
          <path d="M565 785L545 978H584L609 797M1568 791L1592 978H1629L1612 783" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
          <path d="M580 806H1608V865Q1575 883 1554 851H637Q614 883 580 861Z" fill="#61422f" stroke={colors.ink} strokeWidth="4"/>
          <path d="M628 828H1557M628 839H1557" stroke={colors.gold} strokeWidth="1.5" opacity=".5"/>
          {[685,818,951,1084,1217,1350,1483].map(x=><g key={x} stroke="#ba8f51" strokeWidth="2" fill="none"><path d={`M${x-24} 833q24-25 48 0q-24 25-48 0Z`}/><circle cx={x} cy="833" r="7"/></g>)}
          <path d="M574 727H1599L1681 793H502Z" fill={url('woodtop')} stroke={colors.ink} strokeWidth="4"/>
          <WoodLines/>
          <path d="M504 793H1681V807H504Z" fill="#513827" stroke={colors.ink} strokeWidth="3"/><path d="M515 797H1669" stroke="#bc9156" strokeWidth="2"/>
        </g>
        <g transform="translate(1172 751) rotate(-4)">
          <path d="M-185-24H137L169 24H-206Z" fill="#4f2c22" opacity=".24" transform="translate(3 5)"/>
          <path d={`M-185-24H137L169 ${24-curl}Q133 ${14-curl} 105 24H-206Z`} fill={colors.red} stroke="#7e2426" strokeWidth="2"/>
          <path d={`M105 24Q132 ${12-curl} 169 ${24-curl}L152 5Z`} fill="#c34c40" opacity={intro?.8:0}/>
          <path d="M-177-15H127M-174-11H65" stroke="#da7660" strokeWidth=".8" opacity=".38"/>
        </g>
        <ScissorAnimation frame={0} rest x={1406} y={755} scale={.68}/>
        <g transform="translate(1539 714)"><ellipse cx="0" cy="32" rx="36" ry="7" fill={colors.ink} opacity=".2"/><path d="M-25 0h50l-5 32h-40Z" fill="#d4c39a" stroke={colors.wood} strokeWidth="2"/><path d="M25 5q27-3 16 16H23" fill="none" stroke={colors.wood} strokeWidth="4"/><ellipse rx="25" ry="6" fill="#6b4933" stroke={colors.wood} strokeWidth="2"/><path d="M-17 11h34M-15 25h30" stroke={colors.jade} strokeWidth="3" opacity=".55"/></g>
        {[[1017,774],[1361,777],[1080,736],[1319,740],[1260,779]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l${7+i*2} -3l-3 6Z`} fill={colors.red} opacity=".85"/>)}
        {grandmaFrame!==undefined?<g transform={`translate(1047 ${666+Math.sin(grandmaFrame/35)*1.2})`}>
          <path d="M-42-12L65-3L86 45L-22 37Z" fill={colors.red} stroke="#772626" strokeWidth="2"/>
          <path d="M-34-6L55 2M-29 0L38 5" stroke="#d16851" opacity=".5"/>
          <ScissorAnimation frame={grandmaFrame} scale={.49}/><path d="M-37 18L-75 288" stroke="#6c5538" strokeWidth="2" opacity=".58"/>
        </g>:null}
        {/* Foreground scrollwork sits one plane closer than the house. */}
        <path d="M92 985V795Q160 787 181 832Q154 844 149 878Q190 861 210 902Q172 909 177 945H225V987Z" fill={colors.wood} opacity=".85"/>
        <path d="M110 979V815Q144 811 158 832Q131 866 132 963M133 913Q166 884 186 903" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".5"/>
      </svg>
    </div>
    {detail?<svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="detailwood" x2=".2" y2="1"><stop stopColor="#c5a376"/><stop offset="1" stopColor="#a78157"/></linearGradient><clipPath id="detailboard"><rect x="175" y="160" width="1570" height="755" rx="6"/></clipPath></defs><rect x="160" y="158" width="1600" height="782" rx="8" fill={colors.ink} opacity=".22"/><rect x="175" y="150" width="1570" height="755" rx="5" fill="url(#detailwood)" stroke={colors.wood} strokeWidth="8"/><g clipPath="url(#detailboard)"><WoodLines detail/><path d="M165 380H1755M165 640H1755" stroke={colors.wood} opacity=".3" strokeWidth="3"/><path d="M1630 155H1740L1030 906H420Z" fill="#ffedbb" opacity=".14"/></g><path d="M196 175H1724V879H196Z" fill="none" stroke={colors.gold} opacity=".4" strokeWidth="2"/></svg>:null}
    {children}
  </>;
};
