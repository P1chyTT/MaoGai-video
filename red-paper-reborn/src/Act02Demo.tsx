import {Audio} from '@remotion/media';
import {Series,useVideoConfig, staticFile} from 'remotion';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
export const Act02Demo=()=>{const {fps}=useVideoConfig();return <>
 <Series>
  <Series.Sequence name="04 · 小林回到老屋" durationInFrames={360} premountFor={fps}><Scene04/></Series.Sequence>
  <Series.Sequence name="05 · 小林的金点子" durationInFrames={420} premountFor={fps}><Scene05/></Series.Sequence>
  <Series.Sequence name="06 · 奶奶的坚持" durationInFrames={420} premountFor={fps}><Scene06/></Series.Sequence>
  <Series.Sequence name="07 · 守旧与创新" durationInFrames={450} premountFor={fps}><Scene07/></Series.Sequence>
  </Series>
 <Audio
  src={staticFile('MiniMax_2026-10-24_00_10_32_CQY.mp3')}
  durationInFrames={131.66}
  from={131}
  playbackRate={0.92}
 />
 <Audio
  src={staticFile('MiniMax_2026-10-24_00_37_09_CQY.mp3')}
  durationInFrames={114.42}
  from={407}
  playbackRate={0.9}
 />
 <Audio
  src={staticFile('MiniMax_2026-10-24_00_40_05_CQY.mp3')}
  durationInFrames={97.96}
  from={578}
  playbackRate={0.9}
 />
 <Audio
  src={staticFile('MiniMax_2026-10-24_00_44_05_Kind-hearted_Grandma.mp3')}
  durationInFrames={363.62}
  from={860}
  playbackRate={0.95}
 />
 <Audio
  src={staticFile('MiniMax_2026-10-24_00_47_37_CQY.mp3')}
  durationInFrames={239.8}
  from={1284}
  playbackRate={0.92}
 />
</>;};
