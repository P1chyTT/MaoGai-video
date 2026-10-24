import {Audio} from '@remotion/media';
import {Series,useVideoConfig, staticFile} from 'remotion';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';

export const Act03Demo=()=>{
 const {fps}=useVideoConfig();
 return <>
  <Series>
   <Series.Sequence name="08 · 合作邀请" durationInFrames={270} premountFor={fps}><Scene08/></Series.Sequence>
   <Series.Sequence name="09 · 商业逻辑" durationInFrames={450} premountFor={fps}><Scene09/></Series.Sequence>
   <Series.Sequence name="10 · 手艺的价值" durationInFrames={360} premountFor={fps}><Scene10/></Series.Sequence>
   <Series.Sequence name="11 · 小林的劝说" durationInFrames={300} premountFor={fps}><Scene11/></Series.Sequence>
   <Series.Sequence name="12 · 传承的本质" durationInFrames={420} premountFor={fps}><Scene12/></Series.Sequence>
  </Series>
  <Audio
   src={staticFile('Pelican.mp3')}
   durationInFrames={140.4}
   from={62}
   playbackRate={0.96}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_00_59_24_带货.mp3')}
   durationInFrames={47.02}
   from={382}
   playbackRate={0.96}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_00_40_带货.mp3')}
   durationInFrames={109.71}
   from={442}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_01_39_带货.mp3')}
   durationInFrames={105.01}
   from={562}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-21_14_45_40_Kind-hearted_Grandma.mp3')}
   durationInFrames={93.04}
   from={754}
   playbackRate={1.05}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_04_37_Kind-hearted_Grandma.mp3')}
   durationInFrames={122.25}
   from={842}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_05_36_Kind-hearted_Grandma.mp3')}
   durationInFrames={179.46}
   from={958}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_07_34_CQY.mp3')}
   durationInFrames={166.92}
   from={1148}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_09_50_Kind-hearted_Grandma.mp3')}
   durationInFrames={369.11}
   from={1437}
   playbackRate={1.01}
  />
  <Audio
   src={staticFile('MiniMax_2026-10-25_01_11_16_Pelican.mp3')}
   durationInFrames={107.36}
   from={1317}
  />
 </>;
};
