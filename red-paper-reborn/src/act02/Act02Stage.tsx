import {useCurrentFrame,useVideoConfig} from 'remotion';
import {OldHouseStage} from '../shared/OldHouseStage';
import {ShadowStage,StageMark} from '../shared/ShadowStage';
import {PhoneFrame} from './PhoneFrame';
import {XiaolinPuppet} from './XiaolinPuppet';
import {colors,FONT,tween} from '../shared/styleTokens';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {xiaolinMotion,phoneGrip} from './characterMotion';

export const Act02Stage=({shot}:{shot:4|5|6|7})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const motion=xiaolinMotion(shot,f,fps);
 const grip=phoneGrip(motion);
 const lift=shot===4?tween(f,7*fps,9*fps):1;
 const zoom=shot===4?tween(f,10*fps,12*fps):shot===5?1-tween(f,11*fps,13*fps):0;
 const tool=shot<6?((f+17)%207):shot===6?tween(f,0,2*fps,22,69):69;
 const pose=shot<6?20:shot===6?tween(f,2*fps,4*fps,270,345):345;
 const phoneFrame=shot===5?f+60:shot===4?tween(f,8*fps,12*fps,0,60):330;
 const phoneX=grip.x,phoneY=grip.y+(1-lift)*25;
 const grandmaHead=shot===4?1-3*tween(f,4*fps,5*fps)+3*tween(f,6*fps,7*fps):shot===5?1-tween(f,11*fps,13*fps,0,2):shot===6?tween(f,2*fps,4*fps,-1,-4)+Math.sin(f/25)*.65*tween(f,4*fps,5*fps)*(1-tween(f,10*fps,11*fps)):-4+Math.sin(f/46)*.55;
 const grandmaBody=shot===6?tween(f,2*fps,4*fps,0,-.6):shot===7?-.6:0;
 const pullback=shot===7?1+tween(f,0,2*fps,0,.035)-tween(f,13*fps,15*fps,0,.035):1;
 const cameraScale=(1+zoom*(3.55+(shot===5?tween(f,0,2*fps,0,.08):0)))*pullback;
 const phoneCenterX=phoneX+42,phoneCenterY=phoneY+78;
 const translateX=(960-phoneCenterX)*zoom;
 const translateY=(550-phoneCenterY)*zoom;
 return <ShadowStage>
  <div style={{position:'absolute',inset:0,transformOrigin:`${phoneCenterX}px ${phoneCenterY}px`,transform:`translate(${translateX}px,${translateY}px) scale(${cameraScale})`}}>
   <OldHouseStage frame={45*fps+f+({4:0,5:360,6:780,7:1200}[shot])} grandmaFrame={500+f*.04} puppetFrame={pose} toolFrame={tool} puppetHeadAngle={grandmaHead} puppetBodyAngle={grandmaBody}/>
   <div style={{position:'absolute',left:1010,top:731,width:270,height:65,transform:'rotate(-4deg)',opacity:.95}}><PhoenixMotif id={`table-phoenix-${shot}`}/></div>
   <XiaolinPuppet frame={f} shot={shot}/>
   {lift>0?<div style={{position:'absolute',left:phoneX,top:phoneY,width:84,height:157,opacity:lift,rotate:`${grip.angle}deg`,transformOrigin:'22.4px 19.6px'}}><PhoneFrame frame={phoneFrame} metricFrame={f} lit metrics={shot===7&&f>6*fps}/></div>:null}
  </div>
  {shot===4&&f<2*fps?<div style={{position:'absolute',inset:0,opacity:1-tween(f,.2*fps,2*fps),scale:tween(f,0,2*fps,1,.7),transformOrigin:'50% 65%'}}><OldHouseStage frame={1080} scale={1.16} shiftX={-35} shiftY={-62} detail><div style={{position:'absolute',left:406,top:116,width:1108,height:842,filter:'drop-shadow(3px 5px 2px #2d1e1b44)'}}><PhoenixMotif id="act02-opening-phoenix"/></div></OldHouseStage></div>:null}
  {zoom<.05?<StageMark/>:null}
 </ShadowStage>;
};

export const ThemeCaption=({text,start=25,end=130}:{text:string;start?:number;end?:number})=>{
 const frame=useCurrentFrame();
 const alpha=tween(frame,start,start+20)*(1-tween(frame,end-20,end));
 return <div style={{position:'absolute',top:74,left:510,width:900,textAlign:'center',fontFamily:FONT,fontSize:29,letterSpacing:5,color:colors.wood,opacity:alpha,padding:'12px 25px',background:'#f2e5cbee',borderTop:`1px solid ${colors.gold}`,borderBottom:`1px solid ${colors.gold}`,pointerEvents:'none'}}>{text}</div>;
};
