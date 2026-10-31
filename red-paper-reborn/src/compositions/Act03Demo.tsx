import { Series, useVideoConfig } from "remotion";
import { Scene09 } from "../scenes/act03/Scene09";
import { Scene10 } from "../scenes/act03/Scene10";
import { Scene11 } from "../scenes/act03/Scene11";
import { Scene12 } from "../scenes/act03/Scene12";
export const Act03Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene09 · 把时间说清楚"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene09 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene10 · 一句话指明方向"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene10 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene11 · 小禾改了一个词"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene11 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene12 · 理念要落在行动里"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene12 />
      </Series.Sequence>
    </Series>
  );
};
