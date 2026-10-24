import {useCurrentFrame, useVideoConfig} from 'remotion';
import {OldHouseStage} from '../shared/OldHouseStage';
import {ShadowStage, StageMark} from '../shared/ShadowStage';
import {PhoenixMotif} from '../shared/PhoenixMotif';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {XiaolinPuppet} from '../act02/XiaolinPuppet';
import {phoneGrip} from '../act02/characterMotion';
import {PhoneFrame} from '../act02/PhoneFrame';
import {colors,tween} from '../shared/styleTokens';
import {ComputerDesk} from './ComputerDesk';
import {MerchantPuppet} from './MerchantPuppet';
import {BusinessPriceStamp,CommercialSymbols,PaperCutProducts,SocialMetric} from './BusinessProps';

type HouseShot=9|10|11|12;
const beat=(f:number,a:number,b:number,c:number,d:number)=>tween(f,a,b)*(1-tween(f,c,d));

/** The shared room coordinates never change. Camera transforms include every world prop. */
export const Act03Stage=({shot}:{shot:8|HouseShot})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 if(shot===8){
  const zoom=tween(t,8,9,1,1.12);
  return <ShadowStage><div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,transformOrigin:'850px 490px'}}><ComputerDesk frame={f}/></div><StageMark/></ShadowStage>;
 }
 const enter=shot===9?tween(t,0,3):1;
 const price=shot===9?tween(t,10,11.5):1;
 const emphasis=shot===9?1:shot===10?1-tween(t,7,9,0,.64):.36;
 const saying=shot===10?beat(t,2,2.5,10.8,11.5):shot===12?beat(t,3,3.5,12.8,13.5):0;
 const grandmaHead=shot===9?-1+Math.sin(t*1.5)*.3:shot===10?1-tween(t,.6,2,0,4)+Math.sin(t*2.3)*.55*saying:shot===11?-3+tween(t,2,4,0,1): -2+tween(t,0,2,0,3)-tween(t,3,4.5,0,3)+Math.sin(t*1.6)*.5*saying;
 const toolFrame=shot===9?(f%207):69;
 const lower=shot===12?tween(t,.2,2.6):0;
 const forearm=lower*22;
 const radians=forearm*Math.PI/180;
 const release=shot===12?tween(t,2.6,3):0;
 const toolX=858.515625+Math.cos(radians)*188.484375-Math.sin(radians)*117.494140625+(979-989.2612)*release;
 const toolY=548.505859375+Math.sin(radians)*188.484375+Math.cos(radians)*117.494140625+(755-728.052)*release;
 const approach=shot===11?tween(t,0,2):shot===12?1:0;
 const aside=shot===11?tween(t,2,4):shot===12?1-tween(t,0,2.5):0;
 const speaking=shot===11?beat(t,1.5,2,7.8,8.3):0;
 const pose={enter:1,settle:0,phoneArm:25,freeArm:-10-14*beat(t,2,3,6.8,8)*speaking,head:1+Math.sin(t*3)*1.1*speaking,body:-.4-1.2*speaking};
 const xiaolinX=1510-approach*440+aside*12;
 const xiaolinY=210;
 const xiaolinWidth=480;
 const originalGrip=phoneGrip(pose);
 const grip={x:xiaolinX+(originalGrip.x-1115)*xiaolinWidth/600,y:xiaolinY+(originalGrip.y-75)*xiaolinWidth/600};
 const detail=shot===9?tween(t,13,15):0;
 const pricePush=shot===10?beat(t,7,8,9,10.5):0;
 const finalPush=shot===12?tween(t,3,11):0;
 const zoom=1+detail*.09+pricePush*.045+finalPush*.115;
 const panX=shot===11?aside*22:shot===12?22*(1-tween(t,0,2.5))-finalPush*34:shot===10?tween(t,9,12,0,14):0;
 const panY=finalPush*-15;
 const back=shot>=11?1:shot===10?tween(t,9,12):0;
 const merchantX=1280+back*90;
 const merchantWidth=530-back*50;
 return <ShadowStage>
  <div style={{position:'absolute',inset:0,transform:`translate(${panX}px,${panY}px) scale(${zoom})`,transformOrigin:shot===12?'1060px 700px':'1100px 650px'}}>
   <OldHouseStage frame={2400+({9:0,10:450,11:810,12:1110}[shot])+f} grandmaFrame={500+f*.01} puppetFrame={345} puppetHeadAngle={grandmaHead} puppetBodyAngle={saying*-.45} puppetForearmAngle={shot===12?forearm:undefined} heldTools={false} restingScissors={false} tablePaper={false} behindTable={<>
    <MerchantPuppet frame={f} x={merchantX} y={145+back*35} width={merchantWidth} enter={enter} headAngle={shot===9?2*beat(t,3,4,5,6):shot===10?-1:0} handAngle={shot===9?-3*beat(t,3,4,12,14):0}/>
    {shot>=11?<XiaolinPuppet frame={f} shot={7} pose={pose} x={xiaolinX} y={xiaolinY} width={xiaolinWidth}/>:null}
   </>}/>
   {/* A connected, unbroken sheet is laid in the same world position as earlier acts. */}
   <div style={{position:'absolute',left:988,top:718,width:358,height:77,transform:'rotate(-4deg)',filter:'drop-shadow(2px 3px 1px #2d1e1b30)'}}>
    <svg viewBox="0 0 1000 760" width="100%" height="100%" preserveAspectRatio="none"><PhoenixMotif id={`act03-table-${shot}`}/></svg>
   </div>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
    <g transform={`translate(${toolX} ${toolY}) rotate(${forearm})`}>
     <g opacity={1-lower}><path d="M-42-12L65-3L86 45L-22 37Z" fill={colors.red} stroke="#772626" strokeWidth="2"/><path d="M-34-6L55 2" stroke={colors.gold} opacity=".35"/></g>
     <ScissorAnimation frame={toolFrame} rest={shot!==9} scale={.49+lower*.06}/>
    </g>
   </svg>
   {shot>=11?<div style={{position:'absolute',left:grip.x,top:grip.y,width:71.4,height:133.45,rotate:`${pose.phoneArm+pose.body-4}deg`,transformOrigin:'19.04px 16.66px'}}><PhoneFrame frame={330} metricFrame={shot===11?f:300} lit metrics={shot===11&&t>=5}/></div>:null}
   <div style={{position:'absolute',left:1052,top:815,width:300,height:160,scale:.62,transformOrigin:'0 0',opacity:price*(shot===12?1-tween(t,8,11,0,.56):1)}}><BusinessPriceStamp progress={price} emphasis={emphasis}/></div>
   {shot===9?<div style={{position:'absolute',left:982,top:450,width:660,height:210,scale:.63,transformOrigin:'0 0'}}><CommercialSymbols progress={tween(t,6,9.5)} opacity={1-tween(t,12,14)}/></div>:null}
   {shot===11?<div style={{position:'absolute',left:915,top:490,width:320,height:120,scale:.5,transformOrigin:'0 0',opacity:beat(t,5,5.5,7.7,8.3)}}><SocialMetric progress={tween(t,5,8)}/></div>:null}
   {shot===12?<div style={{position:'absolute',left:940,top:315,width:680,height:230,scale:.5,transformOrigin:'0 0',opacity:.72*(1-tween(t,8,11))}}><PaperCutProducts progress={tween(t,3.3,7.7)}/></div>:null}
  </div>
  <StageMark/>
 </ShadowStage>;
};
