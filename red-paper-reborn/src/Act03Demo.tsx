import {Series,useVideoConfig} from 'remotion';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';

export const Act03Demo=()=>{
 const {fps}=useVideoConfig();
 return <Series>
  <Series.Sequence name="08 · 合作邀请" durationInFrames={270} premountFor={fps}><Scene08/></Series.Sequence>
  <Series.Sequence name="09 · 商业逻辑" durationInFrames={450} premountFor={fps}><Scene09/></Series.Sequence>
  <Series.Sequence name="10 · 手艺的价值" durationInFrames={360} premountFor={fps}><Scene10/></Series.Sequence>
  <Series.Sequence name="11 · 小林的劝说" durationInFrames={300} premountFor={fps}><Scene11/></Series.Sequence>
  <Series.Sequence name="12 · 传承的本质" durationInFrames={420} premountFor={fps}><Scene12/></Series.Sequence>
 </Series>;
};
