import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act05Frame } from "../../components/act05/Act05Frame";
import { Editor } from "../../components/act05/Editor";
import { LaborView } from "../../components/act05/Labor";
import { AlignedLandscape } from "../../components/act05/Props";
import { Puppet } from "../../components/act01/Puppet";
import { OldHouseStage } from "../../components/act01/StageProps";
import { Bench } from "../../components/act02/Props";
import { armTo } from "../../components/act03/Notebook";
import { tween } from "../../shared/styleTokens";

export const Scene19 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const zoom = tween(t, 1.4, 5.2),
    enter = tween(t, 0, 1.2),
    out = tween(t, 14, 14.9667);
  const point = armTo({
    x: 245,
    y: 300,
    scale: 0.68,
    targetX: 570,
    targetY: 520,
  });
  const typing = armTo({
    x: 355,
    y: 365,
    scale: 0.62,
    targetX: 592 + Math.sin(t * 12) * 2,
    targetY: 660,
  });
  return (
    <Act05Frame scene="Scene19" label="热度之外的分寸" labelOpacity={1 - out}>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g opacity={enter}>
          <OldHouseStage />
          <g
            transform={`translate(${-140 * zoom} ${-55 * zoom}) scale(${1 + 0.08 * zoom}) skewX(${-2 * (1 - zoom)})`}
          >
            <Bench x={478} y={674} scale={0.85} />
            <Puppet
              {...point}
              variant="elder"
              upper={t > 6.7 && t < 8.9 ? point.upper : -12}
              forearm={t > 6.7 && t < 8.9 ? point.forearm : -48}
              head={3}
            />
            <Puppet {...typing} variant="xiaohe" head={4} smile={t > 9.7} />
            <Editor time={t} />
          </g>
        </g>
        <g opacity={1 - enter}>
          <rect width="1920" height="1080" fill="#F2E5CB" />
          <g transform="translate(1160 672) scale(.18)">
            <LaborView kind={2} time={4.9667} />
          </g>
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
        {out > 0 ? (
          <svg
            x={tween(out, 0, 1, 525, 0)}
            y={tween(out, 0, 1, 267, 0)}
            width={tween(out, 0, 1, 659, 1920)}
            height={tween(out, 0, 1, 486, 1080)}
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
          >
            <AlignedLandscape time={0} />
          </svg>
        ) : null}
      </svg>
    </Act05Frame>
  );
};
