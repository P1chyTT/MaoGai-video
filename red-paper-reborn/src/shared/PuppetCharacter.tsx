import React from 'react';
import {Img, staticFile} from 'remotion';
import {tween} from './styleTokens';

/** Source image is used unchanged. Head is an exact complementary SVG clip, pivoted at the neck. */
export const PuppetCharacter: React.FC<{frame:number;headAngle?:number;bodyAngle?:number}> = ({frame,headAngle,bodyAngle=0}) => {
  const look=headAngle??(tween(frame,270,345,0,-2.1)+tween(frame,390,440,0,2.1));
  const breath=Math.sin(frame/54)*.24;
  const head='polygon(35.156% 0,72.266% 0,72.266% 15.625%,61.133% 17.513%,54.395% 16.602%,46.387% 14.779%,35.156% 14.648%)';
  const body='polygon(0 0,35.156% 0,35.156% 14.648%,46.387% 14.779%,54.395% 16.602%,61.133% 17.513%,72.266% 15.625%,72.266% 0,100% 0,100% 100%,0 100%)';
  return <div style={{position:'absolute',left:445,top:205,width:670,height:570,overflow:'hidden',transformOrigin:'50% 50%',rotate:`${breath+bodyAngle}deg`,filter:'drop-shadow(5px 7px 3px rgba(45,30,27,.18))'}}>
    <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:body}}/>
    <Img src={staticFile('assets/characters/grandma.png')} style={{position:'absolute',width:670,height:1005,clipPath:head,rotate:`${look}deg`,transformOrigin:'373px 162px'}}/>
  </div>;
};
