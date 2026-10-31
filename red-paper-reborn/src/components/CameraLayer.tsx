import type {PropsWithChildren} from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {tween} from '../shared/styleTokens';
export const CameraLayer=({children}:PropsWithChildren)=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{position:'absolute',inset:0,scale:tween(frame,0,4*fps,1,1.035),translate:`${tween(frame,0,4*fps,0,-16)}px 0`,transformOrigin:'50% 65%'}}>{children}</div>;
};
