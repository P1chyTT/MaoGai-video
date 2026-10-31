import { Series, useVideoConfig } from "remotion";
import { Scene13 } from "../scenes/act04/Scene13";
import { Scene14 } from "../scenes/act04/Scene14";
import { Scene15 } from "../scenes/act04/Scene15";
import { Scene16 } from "../scenes/act04/Scene16";
export const Act04Demo = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Scene13 · 同一座山的今天"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene13 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene14 · 换一种忙碌"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene14 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene15 · 田里的价值"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Scene15 />
      </Series.Sequence>
      <Series.Sequence
        name="Scene16 · 一条相互支撑的路"
        durationInFrames={13 * fps}
        premountFor={fps}
      >
        <Scene16 />
      </Series.Sequence>
    </Series>
  );
};
