import {useCurrentFrame,useVideoConfig} from 'remotion';
import {colors,FONT,tween} from '../shared/styleTokens';
export const ThemeCaption=({text}:{text:string})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{position:'absolute',top:85,left:280,right:280,textAlign:'center',fontFamily:FONT,color:colors.forest,fontSize:31,letterSpacing:6,opacity:tween(frame,0,.5*fps),borderBottom:`1px solid ${colors.gold}`,paddingBottom:17}}>{text}</div>;
};
