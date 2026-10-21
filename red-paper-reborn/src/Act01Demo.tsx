import {Series, useVideoConfig} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';

export const Act01Demo = () => {
  const {fps}=useVideoConfig();
  return <Series>
    <Series.Sequence name="01 · 冷清的老屋" durationInFrames={240} premountFor={fps}><Scene01/></Series.Sequence>
    <Series.Sequence name="02 · 奶奶剪纸" durationInFrames={450} premountFor={fps}><Scene02/></Series.Sequence>
    <Series.Sequence name="03 · 凤凰剪纸" durationInFrames={390} premountFor={fps}><Scene03/></Series.Sequence>
  </Series>;
};
