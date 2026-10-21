import {useCurrentFrame, useVideoConfig} from 'remotion';
import {OldHouseStage} from '../shared/OldHouseStage';
import {ShadowStage, StageMark} from '../shared/ShadowStage';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {PaperReveal} from '../shared/PaperReveal';
import {tween} from '../shared/styleTokens';
import {Dialogue} from '../shared/Dialogue';
import captions from '../shared/captions.json';

export const Scene03 = () => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <ShadowStage>
    <OldHouseStage frame={frame+23*fps} scale={1.16} shiftX={-35} shiftY={-62} detail>
      <div style={{position:'absolute',inset:0,scale:tween(frame,0,2.5*fps,.94,1),transformOrigin:'50% 55%'}}>
        <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><ScissorAnimation rest frame={0} x={1567} y={722} scale={.95}/><g fill="#a52a2c">{[[351,390],[333,603],[1476,301],[1490,565],[1400,790]].map(([x,y],i)=><path key={i} d={`M${x} ${y}l${12+i*2} -6l-6 18l-8-3Z`}/>)}</g></svg>
        <PaperReveal/>
      </div>
    </OldHouseStage>
    <StageMark/>
    <Dialogue captions={captions.scene03}/>
  </ShadowStage>;
};
