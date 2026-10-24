import {Series,useVideoConfig} from 'remotion';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';
export const Act04Demo=()=>{
 const {fps}=useVideoConfig();
 return <Series>
  <Series.Sequence name="13 · 倔强的尝试" durationInFrames={300} premountFor={fps}><Scene13/></Series.Sequence>
  <Series.Sequence name="14 · 流量符号" durationInFrames={360} premountFor={fps}><Scene14/></Series.Sequence>
  <Series.Sequence name="15 · 观众的回声" durationInFrames={420} premountFor={fps}><Scene15/></Series.Sequence>
  <Series.Sequence name="16 · 手艺的魂" durationInFrames={420} premountFor={fps}><Scene16/></Series.Sequence>
 </Series>;
};
