import { Series, useVideoConfig } from "remotion";
import { Scene01 } from "../scenes/act01/Scene01";
import { Scene02 } from "../scenes/act01/Scene02";
import { Scene03 } from "../scenes/act01/Scene03";
import { Scene04 } from "../scenes/act01/Scene04";

export const Act01Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene01 · 一张旧照片"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Scene01 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene02 · 收入背后的灰尘"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Scene02 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene03 · 返乡的镜头"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Scene03 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene04 · 为什么要改"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Scene04 />
      </Series.Sequence>
    </Series>
  );
};
