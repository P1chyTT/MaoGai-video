import {colors,tween} from '../shared/styleTokens';
import {ProductCard,VideoCover,type ProductCardKind} from './ProductProps';
import {WorkDesk} from './WorkDesk';
import {FeedbackScreen} from './FeedbackScreen';

const types:ProductCardKind[]=['cover','video','sticker','keychain','expression'];
/** Four deliberately edited paper-stage beats, rather than unrelated rooms. */
export const Montage=({frame,fps=30}:{frame:number;fps?:number})=>{
 const t=frame/fps;
 const open=tween(t,0,.9);
 return <>
  <WorkDesk frame={299} shot={13} screen={<FeedbackScreen frame={299} mode="design" fps={fps}/>}/>
  <div style={{position:'absolute',inset:0,background:colors.paper,opacity:open}}/>
  <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,opacity:open}}>
   <path d="M188 195H1730V924H188Z" fill="#dfc69a" opacity=".26"/>
   <path d="M170 223V176H222M1698 176H1750V223M170 880V932H222M1698 932H1750V880" fill="none" stroke={colors.gold} strokeWidth="3"/>
   {Array.from({length:10},(_,i)=><path key={i} d={`M${220+i*160} 195L${400+i*160} 925`} stroke={colors.gold} opacity=".09"/>)}
  </svg>
  {t<3.55?<div style={{position:'absolute',left:623-open*223,top:331-open*151,width:700,height:440,scale:.634+open*.966,rotate:`${Math.sin(t*2)*1.6*open}deg`,transformOrigin:'0 0',opacity:1-tween(t,3.05,3.55)}}><VideoCover/></div>:null}
  {t>=3&&t<6.55?<div style={{position:'absolute',inset:0,opacity:1-tween(t,6.05,6.55)}}>
   {[0,1,2].map(i=>{
    const p=tween(t,3+i*.18,3.5+i*.18);
    const accent=i===1?1.06:.88;
    return <div key={i} style={{position:'absolute',left:300+i*450+(1-p)*140,top:265+(i===1?-25:22),width:420,height:380,scale:accent,rotate:`${i===0?-5:i===2?5:0}deg`,opacity:p,transformOrigin:'50% 50%'}}><ProductCard kind="video" variant={i}/></div>;
   })}
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><g fill={colors.red} opacity=".7">{Array.from({length:35},(_,i)=>{const h=18+(Math.sin(frame*.14+i*.6)+1)*26;return <rect key={i} x={365+i*34} y={800-h/2} width="8" height={h}/>;})}</g><path d="M323 855H1597" stroke={colors.gold} strokeWidth="2"/></svg>
  </div>:null}
  {t>=6&&t<9.55?<div style={{position:'absolute',inset:0,opacity:1-tween(t,9.05,9.55)}}>{(['expression','sticker','keychain','cover'] as const).map((kind,i)=>{
   const p=tween(t,6+i*.15,6.55+i*.15);
   return <div key={kind} style={{position:'absolute',left:220+i*372,top:300+(1-p)*90,width:420,height:380,scale:.82,rotate:`${(i%2?1:-1)*(1-p)*7}deg`,transformOrigin:'50% 50%',opacity:p}}><ProductCard kind={kind} variant={i}/></div>;
  })}</div>:null}
  {t>=9?<div style={{position:'absolute',inset:0,scale:tween(t,9,11,1.17,1),transformOrigin:'50% 52%'}}>
   {Array.from({length:15},(_,i)=>{
    const p=tween(t,9+i*.045,9.55+i*.045);
    return <div key={i} style={{position:'absolute',left:245+(i%5)*290,top:185+Math.floor(i/5)*260+(1-p)*35,width:420,height:380,scale:.65,transformOrigin:'0 0',opacity:p}}><ProductCard kind={types[i%5]} variant={i}/></div>;
   })}
  </div>:null}
 </>;
};
