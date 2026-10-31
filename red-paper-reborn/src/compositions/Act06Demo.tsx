import { Series, useVideoConfig } from "remotion";
import { Scene21 } from "../scenes/act06/Scene21";
import { Scene22 } from "../scenes/act06/Scene22";
import { Scene23 } from "../scenes/act06/Scene23";
import { Scene24 } from "../scenes/act06/Scene24";
export const Act06Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene21 · 两张图之间"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene21 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene22 · 从一个村庄望向更远"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene22 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene23 · 山河与生活同在"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene23 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene24 · 山河有约"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene24 />
      </Series.Sequence>
    </Series>
  );
};
