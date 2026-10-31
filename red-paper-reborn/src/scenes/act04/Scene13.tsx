import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act04Frame } from "../../components/act04/Act04Frame";
import { ValleyBackground } from "../../components/act04/Valley";
import { DoorPanel, FamilyWalk, PhoneView } from "../../components/act04/Props";
import { Restoration, SeasonTab } from "../../components/act03/Restoration";
import { Puppet } from "../../components/act01/Puppet";
import { Villager, handPoint } from "../../components/act02/Villager";
import { tween } from "../../shared/styleTokens";

export const Scene13 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const today = tween(t, 0.35, 3.7);
  const pan = tween(t, 4, 10, 0, 90);
  const door = tween(t, 10.8, 12);
  const upper = tween(t, 4.4, 6.6, -18, -36),
    forearm = tween(t, 4.4, 6.6, -45, -71);
  const hand = handPoint({ x: 1151, y: 479, scale: 0.47, upper, forearm });
  return (
    <Act04Frame
      scene="Scene13"
      label="今天的余村｜保护仍在继续"
      labelOpacity={tween(t, 1, 1.3) * (1 - tween(t, 10.6, 11))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(${-pan} 0)`}>
          <g opacity={1 - today}>
            <Restoration time={389 / 30} />
            <SeasonTab time={389 / 30} />
          </g>
          <g opacity={today}>
            <ValleyBackground time={t} />
            <Puppet
              x={952}
              y={463}
              scale={0.49}
              variant="elder"
              upper={-5}
              forearm={-12}
              head={2}
            />
            <Puppet
              x={1151}
              y={479}
              scale={0.47}
              variant="xiaohe"
              head={tween(t, 3.9, 5.1, -5, 2)}
              upper={upper}
              forearm={forearm}
            />
            <PhoneView
              x={hand.x}
              y={hand.y + 7}
              scale={0.43}
              angle={-9}
              view={<ValleyBackground time={0} />}
            />
            <g opacity={tween(t, 7.8, 8.5)}>
              <path
                d="M1510 746L1539 731L1576 737L1594 754L1566 763Z"
                fill="#B9B592"
                stroke="#7D7959"
                strokeWidth="3"
              />
              <Villager
                x={1470}
                y={470}
                scale={0.37}
                kind="worker"
                crouch={tween(t, 8, 9, 0.15, 1.5)}
                upper={0}
                forearm={0}
                head={7}
              />
              <FamilyWalk
                x={1690 + tween(t, 8, 11.6, 0, 32)}
                y={450}
                scale={0.34}
                step={Math.sin(t * 2) * 2}
              />
            </g>
          </g>
        </g>
        {door > 0 ? (
          <g
            transform={`translate(${(hand.x - pan) * (1 - door) + 960 * door} ${(hand.y + 7) * (1 - door) + 560 * door}) scale(${0.02 + 0.98 * door}) translate(-960 -560)`}
          >
            <DoorPanel />
          </g>
        ) : null}
      </svg>
    </Act04Frame>
  );
};
