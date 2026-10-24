import {Freeze,useCurrentFrame,useVideoConfig} from 'remotion';
import {ShadowStage,StageMark} from '../shared/ShadowStage';
import {Act03Stage} from '../act03/Act03Stage';
import {tween} from '../shared/styleTokens';
import {WorkDesk} from './WorkDesk';
import {FeedbackScreen} from './FeedbackScreen';
import {Montage} from './Montage';
import {HandmadeVsPrinted} from './HandmadeVsPrinted';

export const Act04Stage=({shot}:{shot:13|14|15|16})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const zoom=shot===13?1+tween(t,9,10,0,.06):shot===15?1+tween(t,3.5,7.5,0,.21)-tween(t,11,14,0,.12):1.09;
 const tabletop=shot===16?tween(t,3,4.4):0;
 return <>
  <ShadowStage>
   {shot===14?<Montage frame={frame} fps={fps}/>:<div style={{position:'absolute',inset:0,scale:zoom,transformOrigin:'850px 500px'}}><WorkDesk frame={frame} shot={shot} screen={<FeedbackScreen frame={shot===16?420:frame} mode={shot===13?'design':'feedback'} fps={fps}/>}/></div>}
   {shot===15&&t<1?<div style={{position:'absolute',inset:0,opacity:1-tween(t,.2,1),scale:tween(t,0,1,1,.92),transformOrigin:'850px 480px'}}><Montage frame={359} fps={fps}/></div>:null}
   {shot===16?<div style={{position:'absolute',inset:0,opacity:tabletop}}><HandmadeVsPrinted frame={frame} fps={fps}/></div>:null}
   {shot!==14?<div style={{opacity:(shot===15?tween(t,.6,1):1)*(1-tabletop)}}><StageMark/></div>:null}
  </ShadowStage>
  {shot===13&&t<2?<div style={{position:'absolute',inset:0,opacity:1-tween(t,.3,2),scale:tween(t,0,2,1,.97),transformOrigin:'1165px 750px'}}><Freeze frame={419}><Act03Stage shot={12}/></Freeze></div>:null}
 </>;
};
