import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act06Frame } from "../../components/act06/Act06Frame";
import { ScrollBackdrop, ScrollPeople } from "../../components/act06/Scroll";
import { FinalPair } from "../../components/act06/FinalPair";
import { tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";
export const Scene23 = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps;
  const y = tween(t, 0, 8, 0, 40),
    theme = tween(t, 4, 4.4) * (1 - tween(t, 12.45, 12.9667));
  return (
    <Act06Frame scene="Scene23">
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(0 ${y})`}>
          <ScrollBackdrop
            time={11.9667 + t}
            expand={1}
            light={tween(t, 4, 5)}
            noteOpacity={1 - tween(t, 12.45, 12.9667)}
          />
          <ScrollPeople time={11.9667 + t} />
          <FinalPair lower={tween(t, 4.6, 7)} look={1} />
        </g>
        <g
          opacity={theme}
          transform={`translate(0 ${-20 * tween(t, 12.45, 12.9667)})`}
          fill={ink}
          textAnchor="middle"
          fontSize="50"
          letterSpacing="4"
        >
          <text x="960" y="213">
            推进生态文明建设
          </text>
          <text x="960" y="295">
            建设人与自然和谐共生的现代化。
          </text>
          <path d="M760 330H1160" stroke="#B79B5D" strokeWidth="2" />
        </g>
      </svg>
    </Act06Frame>
  );
};
