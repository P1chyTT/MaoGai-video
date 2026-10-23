import {Img, staticFile} from 'remotion';
import {type Act02Shot,xiaolinMotion} from './characterMotion';
import {useVideoConfig} from 'remotion';

/** Original PNG, uniformly sized; no invented limb artwork or nonuniform deformation. */
export const XiaolinPuppet=({frame,shot}:{frame:number;shot:Act02Shot})=>{
 const {fps}=useVideoConfig();const pose=xiaolinMotion(shot,frame,fps);
 const head='M300 0H950V460H740L680 405L594 365L558 320L534 286L504 274L501 312L456 300L439 251L300 250Z';
 const left='M267 525L347 525L409 580L403 656L369 716L279 719L239 697L197 769L180 821L135 817L136 758L184 684L221 632L213 610Z';
 const right='M644 522L708 522L772 581L781 624L822 680L865 734L898 811L851 818L805 765L755 725L709 722L653 674L625 607Z';
 const source=staticFile('assets/characters/xiaolin.png');
 return <div style={{position:'absolute',left:1115+(1-pose.enter)*730,top:75+pose.settle,width:600,height:900,transformOrigin:'47% 95%',rotate:`${pose.body}deg`,filter:'drop-shadow(5px 7px 3px #2d1e1b30)'}}>
  <div style={{width:1024,height:1536,scale:600/1024,transformOrigin:'0 0',position:'absolute'}}>
   <Img src={source} style={{position:'absolute',width:1024,height:1536,clipPath:`path(evenodd, "M0 0H1024V1536H0Z ${head} ${left} ${right}")`}}/>
   <Img src={source} style={{position:'absolute',width:1024,height:1536,clipPath:`path("${head}")`,rotate:`${pose.head}deg`,transformOrigin:'475px 300px'}}/>
   <Img src={source} style={{position:'absolute',width:1024,height:1536,clipPath:`path("${left}")`,rotate:`${pose.phoneArm}deg`,transformOrigin:'309px 540px'}}/>
   <Img src={source} style={{position:'absolute',width:1024,height:1536,clipPath:`path("${right}")`,rotate:`${pose.freeArm}deg`,transformOrigin:'678px 540px'}}/>
  </div>
 </div>;
};
