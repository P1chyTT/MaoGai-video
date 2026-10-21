import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {OldHouseStage} from '../shared/OldHouseStage';
import {ShadowStage, StageMark} from '../shared/ShadowStage';
import {colors, FONT, tween} from '../shared/styleTokens';
import {Dialogue} from '../shared/Dialogue';
import captions from '../shared/captions.json';

export const Scene01 = () => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <ShadowStage>
    <OldHouseStage frame={frame} scale={tween(frame,1*fps,5*fps,1,1.045)} intro/>
    <StageMark/>
    <div style={{position:'absolute',left:470,top:268,color:colors.red,fontFamily:FONT,writingMode:'vertical-rl',fontSize:74,letterSpacing:17,opacity:tween(frame,.6*fps,1.8*fps),textShadow:'2px 3px 1px #a67d4822'}}>红纸新生</div>
    <div style={{position:'absolute',left:427,top:284,color:colors.wood,writingMode:'vertical-rl',fontSize:24,letterSpacing:7,opacity:tween(frame,1.5*fps,2.5*fps)}}>第一幕 · 冷清的红纸</div>
    <AbsoluteFill style={{background:'#38251c',opacity:tween(frame,0,1*fps,.78,0)}}/>
    <Dialogue captions={captions.scene01}/>
  </ShadowStage>;
};
