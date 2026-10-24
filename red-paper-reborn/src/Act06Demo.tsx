import {Series,useVideoConfig} from 'remotion';
import {Scene21} from './scenes/Scene21';
import {Scene22} from './scenes/Scene22';
import {Scene23} from './scenes/Scene23';
import {Scene24} from './scenes/Scene24';
export const Act06Demo=()=>{const {fps}=useVideoConfig();return <Series>
  <Series.Sequence name="21 · 手、时间与心意" durationInFrames={120} premountFor={fps}><Scene21/></Series.Sequence>
  <Series.Sequence name="22 · 青年剪纸体验" durationInFrames={90} premountFor={fps}><Scene22/></Series.Sequence>
  <Series.Sequence name="23 · 两代人的新剪纸" durationInFrames={150} premountFor={fps}><Scene23/></Series.Sequence>
  <Series.Sequence name="24 · 一纸山河" durationInFrames={240} premountFor={fps}><Scene24/></Series.Sequence>
</Series>;};
