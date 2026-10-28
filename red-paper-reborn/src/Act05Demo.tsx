import {Audio} from '@remotion/media';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';

export const Act05Demo = () => {
  return (
    <>
      <AbsoluteFill style={{backgroundColor: 'black'}}>
        <OffthreadVideo
          src={staticFile('Act05Demo.mp4')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </AbsoluteFill>
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_10_16_Kind-hearted_Grandma.mp3')}
        durationInFrames={136.36}
        from={18}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_11_01_Kind-hearted_Grandma.mp3')}
        durationInFrames={83.07}
        from={157}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_13_51_CQY.mp3')}
        durationInFrames={80.72}
        from={334}
        playbackRate={0.94}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_15_51_Kind-hearted_Grandma.mp3')}
        durationInFrames={132.44}
        from={589}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_16_33_Kind-hearted_Grandma.mp3')}
        durationInFrames={148.9}
        from={722}
      />
      <Audio
        src={staticFile('MiniMax_2026-10-28_18_17_13_Kind-hearted_Grandma.mp3')}
        durationInFrames={150.47}
        from={873}
      />
    </>
  );
};