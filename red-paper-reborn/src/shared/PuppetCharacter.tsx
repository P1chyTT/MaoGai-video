import React from 'react';
import {Img, staticFile} from 'remotion';
import {tween} from './styleTokens';

/** Source image is used unchanged. Head is an exact complementary SVG clip, pivoted at the neck. */
export const PuppetCharacter: React.FC<{frame:number;headAngle?:number;bodyAngle?:number;forearmAngle?:number}> = ({frame,headAngle,bodyAngle=0,forearmAngle}) => {
  const look=headAngle??(tween(frame,270,345,0,-2.1)+tween(frame,390,440,0,2.1));
  const breath=Math.sin(frame/54)*.24;
  const head='polygon(35.156% 0,72.266% 0,72.266% 15.625%,61.133% 17.513%,54.395% 16.602%,46.387% 14.779%,35.156% 14.648%)';
  const body='polygon(0 0,35.156% 0,35.156% 14.648%,46.387% 14.779%,54.395% 16.602%,61.133% 17.513%,72.266% 15.625%,72.266% 0,100% 0,100% 100%,0 100%)';
  // This optional cut follows the existing round elbow rivet. Native PNG pixel
  // coordinates are converted uniformly to the same 670 px image size.
  const sourceScale=670/1024;
  const armNative='M631 501C617 501 607 512 607 525C607 536 611 541 616 546L620 575L641 646L677 726L711 786L744 790L806 718L835 658L853 707L900 753H958V678L934 651L850 607L828 600L666 504L653 517C650 507 641 501 631 501Z';
  const arm=armNative.replace(/\d+(?:\.\d+)?/g,(coordinate)=>String(Number(coordinate)*sourceScale));
  const armTurn=Math.max(0,Math.min(22,forearmAngle??0));
  return <div style={{position:'absolute',left:445,top:205,width:670,height:570,overflow:'hidden',transformOrigin:'50% 50%',rotate:`${breath+bodyAngle}deg`,filter:'drop-shadow(5px 7px 3px rgba(45,30,27,.18))'}}>
    {forearmAngle===undefined ? <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:body}}/> : <div style={{position:'absolute',width:670,height:1005,clipPath:body}}>
      <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:`path(evenodd, "M0 0H670V1005H0Z ${arm}")`}}/>
      <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:`path("${arm}")`,rotate:`${armTurn}deg`,transformOrigin:`${632*sourceScale}px ${525*sourceScale}px`}}/>
    </div>}
    <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:head,rotate:`${look}deg`,transformOrigin:'373px 162px'}}/>
  </div>;
};
