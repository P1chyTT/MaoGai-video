import {Audio} from '@remotion/media';
import {Series, useVideoConfig, staticFile, Track} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';

export const Act01Demo = () => {
  const {fps}=useVideoConfig();
  return <>
    <Series>
      <Series.Sequence name="01 · 冷清的老屋" durationInFrames={240} premountFor={fps}><Scene01/></Series.Sequence>
      <Series.Sequence name="02 · 奶奶剪纸" durationInFrames={450} premountFor={fps}><Scene02/></Series.Sequence>
      <Series.Sequence name="03 · 凤凰剪纸" durationInFrames={390} premountFor={fps}><Scene03/></Series.Sequence>
    </Series>
    <Audio
      src={staticFile('MiniMax_2026-10-21_14_45_40_Kind-hearted_Grandma.mp3')}
      durationInFrames={95}
      from={10}
      playbackRate={0.96}
    />
    <Track name="MiniMax_2026-10-21_14_48_17_Kind-hearted_Grandma.mp3">
      <Audio
        src={staticFile('MiniMax_2026-10-21_14_48_17_Kind-hearted_Grandma.mp3')}
        from={117}
        durationInFrames={87}
        playbackRate={0.89}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-21_14_48_17_Kind-hearted_Grandma.mp3')}
        from={249}
        durationInFrames={61.64}
        trimBefore={87}
        playbackRate={0.91}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-21_14_48_17_Kind-hearted_Grandma.mp3')}
        from={335}
        durationInFrames={80.98}
        trimBefore={148.64}
        playbackRate={0.92}
      />
    </Track>
    <Track name="MiniMax_2026-10-21_14_48_51_Kind-hearted_Grandma.mp3">
      <Audio
        src={staticFile('MiniMax_2026-10-21_14_48_51_Kind-hearted_Grandma.mp3')}
        from={436}
        durationInFrames={103.04}
        playbackRate={0.92}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-21_14_48_51_Kind-hearted_Grandma.mp3')}
        from={573}
        durationInFrames={59.96}
        trimBefore={103.04}
        playbackRate={0.92}
      />
    </Track>
    <Audio
      src={staticFile('MiniMax_2026-10-23_23_46_50_Kind-hearted_Grandma.mp3')}
      durationInFrames={340.9}
      from={702}
      playbackRate={0.96}
    />
  </>;
};
