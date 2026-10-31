import { Series, useVideoConfig } from "remotion";
import { Scene17 } from "../scenes/act05/Scene17";
import { Scene18 } from "../scenes/act05/Scene18";
import { Scene19 } from "../scenes/act05/Scene19";
import { Scene20 } from "../scenes/act05/Scene20";
export const Act05Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene17 · 把计划改成行动"
        durationInFrames={15 * fps}
        premountFor={fps}
      >
        <Scene17 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene18 · 镜头对准劳动"
        durationInFrames={15 * fps}
        premountFor={fps}
      >
        <Scene18 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene19 · 热度之外的分寸"
        durationInFrames={15 * fps}
        premountFor={fps}
      >
        <Scene19 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene20 · 两代人一起拍"
        durationInFrames={15 * fps}
        premountFor={fps}
      >
        <Scene20 />
      </Series.Sequence>
    </Series>
  );
};
