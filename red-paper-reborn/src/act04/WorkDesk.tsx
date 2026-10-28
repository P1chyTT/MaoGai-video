import {useId, type ReactNode} from 'react';
import {useVideoConfig} from 'remotion';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {colors, FONT, tween} from '../shared/styleTokens';

type WorkDeskProps = {frame:number;shot:13|15|16;screen:ReactNode};

/** A local paper stage for Xiaolin; the screen slot is 644 × 322 native pixels. */
export const WorkDesk = ({frame,shot,screen}:WorkDeskProps) => {
  const id=useId().replace(/:/g,'');
  const {fps}=useVideoConfig();
  const t=frame/fps;
  const resting={enter:1,settle:0,head:3,body:0,phoneArm:-10,freeArm:5};
  let pose=resting;
  if(shot===13){
    const looking=tween(t,2,3.4);
    const typing=tween(t,4,4.25)*(1-tween(t,6.6,7));
    const lean=tween(t,7,9);
    pose={
      enter:1,settle:0,
      head:2-looking*4.2-lean*.8,
      body:-.45-lean*1.1,
      phoneArm:-3+Math.sin(frame*.49)*1.7*typing,
      freeArm:-3+Math.sin(frame*.49+1.1)*1.3*typing,
    };
  }else if(shot===15){
    const excitement=tween(t,0,3.4);
    const concern=tween(t,4,9);
    const typing=1-tween(t,7.8,10.8);
    const lower=tween(t,11,13.8);
    // At 13.8 s these become exactly the Scene16 starting pose, without a
    // continuing sine or idle animation that would jump across the cut.
    pose={
      enter:1,settle:0,
      head:(-2-excitement*2+concern*6)*(1-lower)+resting.head*lower,
      body:(-1.1-excitement*.5+concern*.6)*(1-lower),
      phoneArm:(-3+Math.sin(frame*.4)*1.2*typing)*(1-lower)+resting.phoneArm*lower,
      freeArm:(-4+Math.sin(frame*.4+1)*typing)*(1-lower)+resting.freeArm*lower,
    };
  }
  return <>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,fontFamily:FONT}}>
      <defs>
        <linearGradient id={`${id}-wall`} x2="0" y2="1"><stop stopColor="#f3e7d0"/><stop offset="1" stopColor="#d5be95"/></linearGradient>
        <linearGradient id={`${id}-wood`} x2="0" y2="1"><stop stopColor="#b38e5b"/><stop offset="1" stopColor={colors.wood}/></linearGradient>
        <linearGradient id={`${id}-light`}><stop stopColor="#f9e2a8" stopOpacity="0"/><stop offset="1" stopColor="#f9e2a8" stopOpacity=".42"/></linearGradient>
      </defs>
      <path d="M67 143H1853V981H67Z" fill={`url(#${id}-wall)`}/>
      <path d="M67 143H1853V163H67ZM1832 163H1853V981H1832Z" fill={colors.wood} opacity=".7"/>
      <path d="M79 173H1820M81 825H1819" fill="none" stroke={colors.gold} strokeWidth="2" opacity=".65"/>
      {/* A narrow paper screen distinguishes this workspace from the old house. */}
      <path d="M1510 179H1761V502H1510Z" fill="#e8d5ad" stroke={colors.wood} strokeWidth="10"/>
      <path d="M1522 191H1749V490H1522Z" fill="#f4e6c5" stroke={colors.gold} strokeWidth="2"/>
      {[1566,1623,1680,1737].map(x=><path key={x} d={`M${x} 192V490`} stroke={colors.wood} strokeWidth="5" opacity=".66"/>)}
      {[247,308,369,430].map(y=><path key={y} d={`M1522 ${y}H1749`} stroke={colors.wood} strokeWidth="5" opacity=".66"/>)}
      <path d="M1744 193L1516 193L432 839H1127Z" fill={`url(#${id}-light)`}/>
      {/* Drafts hang from a simple wooden rail, without modern interface icons. */}
      <path d="M215 225H452" stroke={colors.wood} strokeWidth="8"/>
      <path d="M239 241L406 233L418 460L250 468Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/>
      <path d="M262 263H387M266 280H379M272 424H393M273 438H357" stroke={colors.wood} strokeWidth="2" opacity=".32"/>
      <circle cx="255" cy="240" r="4" fill={colors.ink}/><circle cx="390" cy="234" r="4" fill={colors.ink}/>
      <path d="M1240 900V479Q1290 440 1351 479V901M1260 490H1335" stroke={colors.wood} strokeWidth="12" fill="none"/>
    </svg>
    <div style={{position:'absolute',left:266,top:297,width:135,height:106,rotate:'-3deg',opacity:.72}}><PhoenixMotif id={`${id}-pinned-sample`}/></div>
    <div style={{position:'absolute',inset:0,clipPath:'inset(0 0 368px 0)'}}>
      <XiaolinPuppet frame={frame} shot={7} pose={pose} x={1110} y={210} width={610}/>
    </div>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,fontFamily:FONT}}>
      <path d="M133 815H1786V990H133Z" fill="#b39a72"/>
      <path d="M378 798L357 973H397L425 798M1567 798L1596 973H1639L1614 798" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
      <path d="M386 811H1608V862H386Z" fill="#61422f" stroke={colors.ink} strokeWidth="4"/>
      <path d="M337 712H1647L1733 803H262Z" fill={`url(#${id}-wood)`} stroke={colors.ink} strokeWidth="4"/>
      <g fill="none" stroke={colors.ink} opacity=".13">{Array.from({length:14},(_,i)=><path key={i} d={`M${330-i*3} ${726+i*5}Q950 ${720+i*5} ${1650+i*4} ${727+i*5}`}/>)}</g>
      <path d="M262 803H1733V819H262Z" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
      <path d="M279 809H1717M411 839H1580" stroke={colors.gold} opacity=".6" strokeWidth="2"/>
      <path d="M815 632H884L910 717H783Z" fill={colors.wood} stroke={colors.ink} strokeWidth="4"/>
      <path d="M756 718H932L958 732H731Z" fill={colors.wood} stroke={colors.ink} strokeWidth="3"/>
      <rect x="505" y="294" width="680" height="360" rx="5" fill={colors.wood} stroke={colors.ink} strokeWidth="6"/>
      <rect x="523" y="313" width="644" height="322" fill="#ddc79d" stroke={colors.gold} strokeWidth="2"/>
      <path d="M1160 665H1380L1440 735H1110Z" fill="#bfa574" stroke={colors.wood} strokeWidth="4"/>
      {[0,1,2,3].map(r=><path key={r} d={`M${1151-r*10} ${680+r*12}H${1380+r*11}`} stroke={colors.wood} strokeWidth="3" opacity=".75"/>)}
      {[0,1,2,3,4,5,6,7].map(c=><path key={c} d={`M${1171+c*27} 674l23 50`} stroke={colors.wood} strokeWidth="2" opacity=".65"/>)}
      <path d="M1458 735Q1456 708 1479 705Q1502 708 1505 735Z" fill="#cfb88b" stroke={colors.wood} strokeWidth="3"/>
      <path d="M1479 707V722" stroke={colors.wood} strokeWidth="2"/>
      <path d="M388 741L527 733L556 772L406 783Z" fill={colors.paper} stroke={colors.gold} strokeWidth="2"/>
      <path d="M396 746L535 738L562 774L412 782Z" fill={colors.red}/>
      <path d="M414 755L528 749M421 767L540 759" stroke={colors.gold} opacity=".6"/>
      <path d="M966 746L1064 745L1083 776L974 780Z" fill={colors.paper} stroke={colors.gold} strokeWidth="1.5"/>
      <path d="M982 756H1054M988 765H1045" stroke={colors.wood} strokeWidth="2" opacity=".4"/>
      <ScissorAnimation frame={0} x={907} y={774} scale={.45} rest/>
    </svg>
    <div style={{position:'absolute',left:570,top:741,width:260,height:198,transform:'rotate(-4deg) scaleY(.28)',transformOrigin:'50% 0',filter:'drop-shadow(2px 3px 1px #2d1e1b25)'}}>
      <PhoenixMotif id={`${id}-desk-phoenix`}/>
    </div>
    <div style={{position:'absolute',left:523,top:313,width:644,height:322,overflow:'hidden'}}>{screen}</div>
  </>;
};
