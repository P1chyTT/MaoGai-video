import {useCurrentFrame, useVideoConfig} from 'remotion';
import {OldHouseStage} from '../shared/OldHouseStage';
import {ShadowStage, StageMark} from '../shared/ShadowStage';
import {tween} from '../shared/styleTokens';
import {Dialogue} from '../shared/Dialogue';
import captions from '../shared/captions.json';

export const Scene02 = () => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <ShadowStage>
    <OldHouseStage frame={frame+8*fps} grandmaFrame={frame} scale={tween(frame,13*fps,15*fps,1.045,1.16)} shiftX={tween(frame,13*fps,15*fps,0,-35)} shiftY={tween(frame,13*fps,15*fps,0,-62)}/>
    <StageMark/>
    <Dialogue captions={captions.scene02}/>
  </ShadowStage>;
};
