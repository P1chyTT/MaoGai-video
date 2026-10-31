import { Series, useVideoConfig } from "remotion";
import { Scene05 } from "../scenes/act02/Scene05";
import { Scene06 } from "../scenes/act02/Scene06";
import { Scene07 } from "../scenes/act02/Scene07";
import { Scene08 } from "../scenes/act02/Scene08";

export const Act02Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene05 · 关停的决定"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene05 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene06 · 空下来的工具包"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene06 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene07 · 留给以后"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene07 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene08 · 第一批新尝试"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene08 />
      </Series.Sequence>
    </Series>
  );
};
