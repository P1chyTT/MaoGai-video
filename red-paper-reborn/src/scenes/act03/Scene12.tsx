import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act03Frame } from "../../components/act03/Act03Frame";
import { Restoration, SeasonTab } from "../../components/act03/Restoration";
import { colors, tween } from "../../shared/styleTokens";

export const Scene12 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const r = tween(t, 0, 2.2, 0, 1550);
  return (
    <Act03Frame
      scene="Scene12"
      label="此后多年｜持续治理与生态修复"
      labelOpacity={tween(t, 1, 1.3) * (1 - tween(t, 11.8, 12.2))}
      fiction
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id={`${id}-water`}>
            <circle cx="1195" cy="606" r={r} />
          </clipPath>
        </defs>
        <rect width="1920" height="1080" fill={colors.sky} />
        <g clipPath={`url(#${id}-water)`}>
          <rect width="1920" height="1080" fill={colors.paper} />
          <Restoration time={t} />
          <SeasonTab time={t} />
        </g>
        {t < 2.2 ? (
          <circle
            cx="1195"
            cy="606"
            r={r}
            fill="none"
            stroke="#D8D4AF"
            strokeWidth="8"
          />
        ) : null}
      </svg>
    </Act03Frame>
  );
};
