import {tween} from '../shared/styleTokens';

export type Act02Shot=4|5|6|7;
export const xiaolinMotion=(shot:Act02Shot,frame:number,fps:number)=>{
 const t=frame/fps;
 const beat=(a:number,b:number,c:number,d:number)=>tween(t,a,b)*(1-tween(t,c,d));
 const speaking=shot===4?beat(4,4.5,9.8,10.3):shot===5?beat(10.6,11.2,13.1,13.7):shot===7?beat(1.5,2.1,11.8,13):0;
 const nod=Math.sin(t*3.1)*1.25*speaking;
 const phoneArm=shot===4?tween(t,7,9,0,24):shot===5?24+tween(t,10.5,12.5,0,5):shot===6?29-tween(t,10,12,0,9):20+tween(t,0,2,0,8);
 const freeArm=shot===4?-10*beat(4,5,6,7):shot===5?-6*tween(t,10.5,12)-5*beat(11,11.8,12,13):shot===6?-6*(1-tween(t,0,2)):-20*beat(2,3.8,11.5,14)-6*beat(7,7.7,8,8.7)-5*beat(9,9.5,10,10.7)-8*tween(t,12,14);
 const head=(shot===4?3*beat(4,4.7,5.7,6.6)-4*tween(t,7,9):shot===5?-4+tween(t,9,11,0,6):shot===6?2-tween(t,10,12,0,4):-2+tween(t,0,2,0,5)-tween(t,12,14,0,1))+nod;
 const body=shot===4?-1.1*beat(4,5,6,7):shot===5?-tween(t,10,12):shot===6?-1+tween(t,10,12,0,1.2):.2-tween(t,0,2,0,2.4)+tween(t,13,15,0,1.2);
 const enter=shot===4?tween(t,2,4):1;
 const settle=shot===4?Math.sin((t-2)*Math.PI*4)*3*beat(2,2.15,3.6,4):0;
 return {phoneArm,freeArm,head,body,enter,settle};
};

const rotatePoint=(x:number,y:number,cx:number,cy:number,angle:number)=>{
 const a=angle*Math.PI/180;return {x:cx+(x-cx)*Math.cos(a)-(y-cy)*Math.sin(a),y:cy+(x-cx)*Math.sin(a)+(y-cy)*Math.cos(a)};
};
/** Phone grip follows the same elbow and body transforms as the source-image hand. */
export const phoneGrip=(pose:ReturnType<typeof xiaolinMotion>)=>{
 const hand=rotatePoint(201,739,309,540,pose.phoneArm);
 const point=rotatePoint(hand.x,hand.y,481.28,1459.2,pose.body);
 return {x:1115+(1-pose.enter)*730+point.x*600/1024-22.4,y:75+pose.settle+point.y*600/1024-19.6,angle:pose.phoneArm+pose.body-4};
};
