import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act05Frame } from "../../components/act05/Act05Frame";
import { LaborView } from "../../components/act05/Labor";
import { tween } from "../../shared/styleTokens";

export const Scene18 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const kind = Math.min(2, Math.floor(t / 5)),
    local = t - kind * 5,
    out = tween(t, 13.7, 14.9667);
  return (
    <Act05Frame scene="Scene18" label="小禾的课程拍摄｜虚构情节">
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect width="1920" height="1080" fill="#F2E5CB" />
        <g
          transform={`translate(${tween(out, 0, 1, 0, 1160)} ${tween(out, 0, 1, 0, 672)}) scale(${tween(out, 0, 1, 1, 0.18)})`}
        >
          <LaborView kind={kind} time={local} />
        </g>
        <text x="210" y="300" fontSize="38" fill="#2D1E1B" opacity={1 - out}>
          {["维护环境", "认真经营", "连接市场"][kind]}
        </text>
        <g opacity={out}>
          <path
            d="M1139 665H1519V882H1139Z"
            fill="none"
            stroke="#89754F"
            strokeWidth="8"
          />
          <text
            x="1330"
            y="911"
            textAnchor="middle"
            fontSize="25"
            fill="#655236"
          >
            农产品经营
          </text>
        </g>
      </svg>
    </Act05Frame>
  );
};
