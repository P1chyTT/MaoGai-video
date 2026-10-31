import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act02Frame } from "../../components/act02/Act02Frame";
import { Villager } from "../../components/act02/Villager";
import {
  CurrentRoom,
  FarmHouse,
  PastDesk,
  RuralBackdrop,
  Spade,
} from "../../components/act02/Props";
import { tween } from "../../shared/styleTokens";

export const Scene06 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const zoom = tween(t, 0, 3.8, 1.25, 1);
  return (
    <Act02Frame
      scene="Scene06"
      label="转型也有阵痛"
      labelOpacity={tween(t, 1, 1.25) * (1 - tween(t, 9.75, 10))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {t < 4 ? (
          <g
            transform={`translate(${tween(t, 0, 3.8, -300, 0)} ${tween(t, 0, 3.8, -60, 0)}) scale(${zoom})`}
          >
            <PastDesk time={t} />
          </g>
        ) : t < 8 ? (
          <g>
            <RuralBackdrop />
            <g transform="translate(-1970 -40) scale(1)">
              <FarmHouse />
            </g>
            <Villager
              x={345}
              y={298}
              scale={0.64}
              kind="farmer"
              head={tween(t, 4.2, 6.1, 1, -6)}
              upper={-5}
              forearm={-12}
            />
            <Villager
              x={844}
              y={276}
              scale={0.68}
              kind="woman"
              head={tween(t, 4.5, 6.8, 3, 6)}
              upper={-19}
              forearm={-31}
              held={<Spade angle={-13} />}
            />
            <Villager
              x={1285 + tween(t, 4, 8, 0, 174)}
              y={292}
              scale={0.66}
              kind="worker"
              head={-2}
              upper={7 + Math.sin(t * 4) * 4}
              forearm={-8}
              walk={Math.sin(t * 4) * 4}
            />
          </g>
        ) : (
          <CurrentRoom time={t - 8} />
        )}
        {t >= 8 ? (
          <text
            x="1555"
            y="725"
            fontSize="24"
            fill="#725A40"
            opacity={tween(t, 8.2, 8.5)}
          >
            今天
          </text>
        ) : null}
      </svg>
    </Act02Frame>
  );
};
