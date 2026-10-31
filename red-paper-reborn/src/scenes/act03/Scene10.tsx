import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act03Frame } from "../../components/act03/Act03Frame";
import { DateCard } from "../../components/act03/History";
import { Notebook, ridgePath } from "../../components/act03/Notebook";
import { MountainScene, ink } from "../../components/act01/art";
import { FarmHouse, FactoryGate } from "../../components/act02/Props";
import { CameraLayer } from "../../components/CameraLayer";
import { colors, tween } from "../../shared/styleTokens";

export const Scene10 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const morph = tween(t, 12.45, 13);
  const ridge = ridgePath(morph);
  return (
    <Act03Frame scene="Scene10">
      <CameraLayer
        fromScale={1}
        toScale={1.03}
        toX={0}
        duration={4}
        origin="50% 46%"
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <g opacity={1 - morph}>
            <DateCard x={160} y={185} compact={1} />
            <g opacity={(1 - tween(t, 3.6, 4.3)) * tween(t, 0, 0.4)}>
              <svg
                x="330"
                y="320"
                width="480"
                height="270"
                viewBox="200 240 1450 750"
              >
                <MountainScene detail={0.6} />
                <FactoryGate closed={1} />
              </svg>
              <svg
                x="1090"
                y="320"
                width="480"
                height="270"
                viewBox="2020 220 850 680"
              >
                <FarmHouse />
              </svg>
              <text
                x="560"
                y="605"
                fontSize="28"
                textAnchor="middle"
                fill="#71593E"
              >
                已关停的矿山
              </text>
              <text
                x="1330"
                y="605"
                fontSize="28"
                textAnchor="middle"
                fill="#71593E"
              >
                探索休闲经营
              </text>
            </g>
            <g opacity={tween(t, 4, 4.4)}>
              <rect
                x="270"
                y="364"
                width="1380"
                height="143"
                fill={colors.paper}
                opacity=".96"
              />
              <text
                x="960"
                y="461"
                textAnchor="middle"
                fontSize="88"
                letterSpacing="7"
                fill={colors.forest}
              >
                绿水青山就是金山银山
              </text>
              <text
                x="960"
                y="851"
                textAnchor="middle"
                fontSize="26"
                fill="#7A6446"
              >
                资料依据 S3、S5
              </text>
            </g>
            <g opacity={tween(t, 8, 8.4)}>
              <text
                x="550"
                y="578"
                textAnchor="middle"
                fontSize="34"
                fill={ink}
              >
                保护生态
              </text>
              <text
                x="1330"
                y="578"
                textAnchor="middle"
                fontSize="34"
                fill={ink}
              >
                转变发展方式
              </text>
              <path
                d="M420 604Q370 691 440 754L585 615L690 698L830 532"
                fill="none"
                stroke="#7F9870"
                strokeWidth="3"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - tween(t, 8, 10.5)}
              />
              <path
                d="M1488 604Q1545 695 1500 754L1375 638L1260 711L1100 550L960 650L830 532"
                fill="none"
                stroke="#7F9870"
                strokeWidth="3"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - tween(t, 8.5, 11)}
              />
              <path
                d={`${ridgePath()}L1500 796H440Z`}
                fill="#547653"
                opacity={tween(t, 10, 11.5) * 0.8}
              />
            </g>
          </g>
        </svg>
      </CameraLayer>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g opacity={morph}>
          <Notebook open={0} line={false} />
        </g>
        <g
          transform={`translate(960 496.8) scale(${1.03 - 0.03 * morph}) translate(-960 -496.8)`}
        >
          <path
            d={ridge}
            fill="none"
            stroke={morph > 0.7 ? "#6D8B68" : colors.gold}
            strokeWidth={3 - morph * 0.6}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(t, 9.5, 11.8)}
            opacity={tween(t, 9.5, 10)}
          />
        </g>
      </svg>
    </Act03Frame>
  );
};
