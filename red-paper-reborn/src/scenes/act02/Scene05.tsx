import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act02Frame } from "../../components/act02/Act02Frame";
import { Villager, handPoint } from "../../components/act02/Villager";
import {
  FactoryGate,
  Gear,
  PastDesk,
  Spade,
  ToolBag,
} from "../../components/act02/Props";
import { ArtDefs, ink, MountainScene } from "../../components/act01/art";
import { Factory } from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { tween, colors } from "../../shared/styleTokens";

const stoppedAngle = (t: number, stop: number) => {
  const d = Math.max(0, Math.min(t, stop));
  return 270 * (d - (d * d) / (2 * stop));
};
export const Scene05 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const p = handPoint({ x: 560, y: 265, scale: 0.74, upper: 4, forearm: -10 });
  return (
    <Act02Frame
      scene="Scene05"
      label="2003—2005年｜陆续关停矿山和水泥厂"
      subline="历史过程示意"
      labelOpacity={tween(t, 0, 0.3)}
      fiction={t >= 0.4}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <ArtDefs id={id} />
        {t < 3.2 ? (
          <g opacity={tween(t, 0.2, 0.8) * (1 - tween(t, 2.8, 3.2))}>
            <svg
              x="256"
              y="250"
              width="650"
              height="397"
              viewBox="170 200 1050 680"
              preserveAspectRatio="xMidYMid slice"
            >
              <MountainScene />
            </svg>
            <g transform="translate(-265 -210)">
              <Factory />
            </g>
            <Gear x={580} y={662} angle={stoppedAngle(t, 1.4)} scale={0.8} />
            <Gear x={1244} y={598} angle={stoppedAngle(t, 2.45)} scale={0.8} />
            <path
              d="M391 773H1525"
              stroke="#B18E50"
              strokeWidth="4"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - tween(t, 0.1, 2)}
            />
            <circle cx="391" cy="773" r="8" fill="#8A6849" />
            <circle
              cx="1525"
              cy="773"
              r="8"
              fill="#8A6849"
              opacity={tween(t, 1.5, 2.2)}
            />
            <text x="391" y="846" textAnchor="middle" fontSize="52" fill={ink}>
              2003
            </text>
            <text
              x="1525"
              y="846"
              textAnchor="middle"
              fontSize="52"
              fill={ink}
              opacity={tween(t, 1.5, 2.2)}
            >
              2005
            </text>
          </g>
        ) : null}
        {t >= 3 && t < 8.2 ? (
          <g opacity={tween(t, 3, 3.35) * (1 - tween(t, 7.9, 8.2))}>
            <g opacity=".12">
              <MountainScene />
            </g>
            <Villager
              x={590}
              y={257}
              scale={0.63}
              kind="worker"
              head={tween(t, 3.4, 5.2, 0, 6)}
              upper={-4}
              forearm={-12}
            />
            <Villager
              x={865}
              y={227}
              scale={0.67}
              kind="woman"
              head={tween(t, 3.8, 5.8, 1, 5)}
              upper={-25}
              forearm={-25}
            />
            <Villager
              x={1160}
              y={257}
              scale={0.63}
              kind="farmer"
              facing="left"
              head={2}
              upper={tween(t, 4.4, 5.9, -5, -61)}
              forearm={-47}
              ask
            />
            <path
              d="M594 684Q966 541 1340 684Q1430 741 1332 776H601Q498 743 594 684Z"
              fill={`url(#${id}-wood)`}
              stroke={ink}
              strokeWidth="5"
            />
            <path
              d="M604 760H1331V798H604ZM650 798H686L676 932H638ZM1261 798H1298L1310 932H1275Z"
              fill="#705035"
              stroke={ink}
              strokeWidth="4"
            />
            <path
              d="M823 654L1094 654L1156 732H763Z"
              fill={colors.paper}
              stroke="#A48C5F"
              strokeWidth="3"
            />
            <svg
              x="824"
              y="655"
              width="270"
              height="65"
              viewBox="200 270 1400 650"
              preserveAspectRatio="none"
            >
              <MountainScene />
            </svg>
            <Villager
              x={320}
              y={335}
              scale={0.65}
              kind="farmer"
              head={tween(t, 3.5, 5.8, -1, 5)}
              upper={-35}
              forearm={-40}
            />
            <Villager
              x={1410}
              y={335}
              scale={0.65}
              kind="worker"
              facing="left"
              head={tween(t, 4, 6.5, 0, 5)}
              upper={tween(t, 5.5, 6.8, -9, -35)}
              forearm={-42}
            />
          </g>
        ) : null}
        {t >= 8 && t < 10.8 ? (
          <g transform={`translate(${tween(t, 8, 10.8, 0, -120)} 0)`}>
            <MountainScene />
            <g opacity=".7">
              <Factory />
            </g>
            <FactoryGate closed={tween(t, 8.2, 10.1)} />
            <g transform="translate(1658 529)">
              <path
                d="M-20 0H147V18H-20Z"
                fill="#705038"
                stroke={ink}
                strokeWidth="3"
              />
              <g
                transform={`translate(54 ${tween(t, 8.4, 9.8, 165, 72)}) scale(.6)`}
              >
                <Spade angle={tween(t, 8.4, 9.8, 14, 0)} />
              </g>
            </g>
            <ToolBag x={p.x} y={p.y} scale={0.69} />
            <Puppet
              x={560}
              y={265}
              scale={0.74}
              variant="middle"
              upper={4}
              forearm={-10}
              head={3}
              smile={false}
            />
          </g>
        ) : null}
        {t >= 10.8 ? (
          <g transform="translate(-300 -60) scale(1.25)">
            <PastDesk time={t - 12} />
          </g>
        ) : null}
      </svg>
    </Act02Frame>
  );
};
