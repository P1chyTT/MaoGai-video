import {useCurrentFrame,useVideoConfig} from 'remotion';
import {colors,FONT,tween} from '../shared/styleTokens';
import topics from './topics.json';

export const FinalTitle=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  const reveal=tween(frame,6.45*fps,7*fps);
  return <div style={{position:'absolute',top:92,left:270,right:270,opacity:reveal,translate:`0 ${(1-reveal)*9}px`,textAlign:'center',fontFamily:FONT,color:colors.ink,pointerEvents:'none'}}>
    <svg width="1380" height="96" viewBox="0 0 1380 96" style={{position:'absolute',inset:0}}><path d="M0 13H1380V83H0Z" fill={colors.paper} opacity=".95"/><path d="M28 13H1352M28 83H1352" stroke={colors.gold} strokeWidth="1.5"/><path d="M12 0V28M0 14H25M1368 0V28M1355 14H1380M12 68V96M0 82H25M1368 68V96M1355 82H1380" stroke={colors.red} strokeWidth="2" fill="none"/></svg>
    <div style={{position:'relative',padding:'26px 30px',fontSize:34,letterSpacing:4,lineHeight:1.35,textShadow:'0 1px 0 #fff3da',WebkitTextStroke:'.25px #2d1e1b'}}>{topics.scene24}</div>
  </div>;
};
