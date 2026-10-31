import { Series, useVideoConfig } from "remotion";
import { Act01Demo } from "./Act01Demo";
import { Act02Demo } from "./Act02Demo";
import { Act03Demo } from "./Act03Demo";
import { Act04Demo } from "./Act04Demo";
import { Act05Demo } from "./Act05Demo";
import { Act06Demo } from "./Act06Demo";
/** Review timeline only. Reuses all six originals without re-encoding or modifying them. */
export const FullFilmPreview = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Act01 · 山河旧貌"
        durationInFrames={40 * fps}
        premountFor={fps}
      >
        <Act01Demo />
      </Series.Sequence>
      <Series.Sequence
        name="Act02 · 发展的抉择"
        durationInFrames={50 * fps}
        premountFor={fps}
      >
        <Act02Demo />
      </Series.Sequence>
      <Series.Sequence
        name="Act03 · 理念的转变"
        durationInFrames={50 * fps}
        premountFor={fps}
      >
        <Act03Demo />
      </Series.Sequence>
      <Series.Sequence
        name="Act04 · 绿水青山变成金山银山"
        durationInFrames={50 * fps}
        premountFor={fps}
      >
        <Act04Demo />
      </Series.Sequence>
      <Series.Sequence
        name="Act05 · 新时代的接力"
        durationInFrames={60 * fps}
        premountFor={fps}
      >
        <Act05Demo />
      </Series.Sequence>
      <Series.Sequence
        name="Act06 · 山河有约"
        durationInFrames={50 * fps}
        premountFor={fps}
      >
        <Act06Demo />
      </Series.Sequence>
    </Series>
  );
};
