import {Audio} from '@remotion/media';
import {Series,useVideoConfig, staticFile} from 'remotion';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';
export const Act04Demo=()=>{
 const {fps}=useVideoConfig();
 return <>
  <Series>
   <Series.Sequence
    name="13 · 倔强的尝试"
    durationInFrames={300}
    premountFor={fps}
    style={{
     scale: 0.996
    }}
   ><Scene13/></Series.Sequence>
   <Series.Sequence name="14 · 流量符号" durationInFrames={360} premountFor={fps}><Scene14/></Series.Sequence>
   <Series.Sequence name="15 · 观众的回声" durationInFrames={420} premountFor={fps}><Scene15/></Series.Sequence>
   <Series.Sequence name="16 · 手艺的魂" durationInFrames={420} premountFor={fps}><Scene16/></Series.Sequence>
  </Series>
  <Audio
   src={staticFile('MiniMax_2026-10-28_17_42_49_CQY (1).mp3')}
   durationInFrames={64.26}
   from={77}
   playbackRate={0.92}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_17_45_07_CQY.mp3')}
   durationInFrames={94.82}
   from={150}
   playbackRate={0.95}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_17_46_54_Pelican.mp3')}
   durationInFrames={188.08}
   from={309}
   playbackRate={1.02}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_17_49_34_Pelican.mp3')}
   durationInFrames={61.91}
   from={494}
   playbackRate={0.96}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_17_51_34_Humorous_Elder.wav')}
   durationInFrames={91.26}
   from={774}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_18_00_06_Warm_Girl.mp3')}
   durationInFrames={73.67}
   from={862}
   playbackRate={1.05}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_18_01_31_Tender_CEO.mp3')}
   durationInFrames={54.07}
   from={931}
   trimBefore={0.92999999999995}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_18_03_19_Pelican.mp3')}
   durationInFrames={99.53}
   from={1273}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-28_18_04_05_Pelican.mp3')}
   durationInFrames={130.09}
   from={1370}
  />
 </>;
};
