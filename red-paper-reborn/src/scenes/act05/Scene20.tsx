import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act05Frame } from "../../components/act05/Act05Frame";
import {
  AlignedLandscape,
  MatchedOldPrint,
  Viewfinder,
} from "../../components/act05/Props";
import { Puppet } from "../../components/act01/Puppet";
import { Villager, handPoint } from "../../components/act02/Villager";
import { PhoneView } from "../../components/act04/Props";
import { armTo } from "../../components/act03/Notebook";
import { tween } from "../../shared/styleTokens";

export const Scene20 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const enter = tween(t, 0, 0.65),
    correct = tween(t, 1.3, 3.4),
    back = tween(t, 3.6, 4.7),
    review = tween(t, 10, 11.2),
    look = tween(t, 11.4, 12.7);
  const camera = tween(t, 0.8, 13, 1, 0.94);
  const wind = Math.sin(t * 1.3) * 0.5 * tween(t, 13, 13.5);
  const oldAngle = -180 * (1 - correct) + wind;
  const elderBase = armTo({
    x: 400,
    y: 200,
    scale: 0.82,
    targetX: 548,
    targetY: 562,
  });
  // The prop stays attached to this stable hand. The front forearm is unchanged throughout the turn.
  const elder = { ...elderBase };
  const xx = 1015 + 85 * back - 150 * review;
  const base = armTo({
    x: 1015,
    y: 220,
    scale: 0.78,
    facing: "left",
    targetX: 1007,
    targetY: 562,
  });
  const xh = {
    ...base,
    x: xx,
    y: 220 - 16 * tween(t, 4.7, 5.8) + 16 * review,
    upper: base.upper - 8 * tween(t, 4.7, 5.8) + 8 * review,
    forearm: base.forearm + 10 * tween(t, 4.7, 5.8) - 10 * review,
  };
  const hand = handPoint(xh);
  const phoneX = hand.x - 14,
    phoneY = hand.y + 30;
  return (
    <Act05Frame
      scene="Scene20"
      label="守护山水，一代接着一代"
      labelOpacity={tween(t, 2, 2.3) * (1 - tween(t, 13.8, 14))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g
          transform={`translate(960 550) scale(${camera}) translate(-960 -550)`}
        >
          <AlignedLandscape time={t} />
          <g opacity={enter}>
            <g opacity={tween(t, 4.4, 4.8) * (1 - tween(t, 8.6, 9.2))}>
              <Villager
                x={150 + 132 * tween(t, 4.5, 9)}
                y={410}
                scale={0.42}
                kind="farmer"
                walk={Math.sin(t * 3) * 3}
              />
              <Villager
                x={276 + 132 * tween(t, 4.5, 9)}
                y={410}
                scale={0.42}
                kind="woman"
                walk={Math.sin(t * 3 + 1) * 3}
              />
            </g>
            <g opacity={tween(t, 7.2, 7.6) * (1 - tween(t, 10.8, 11.2))}>
              <Villager
                x={1470 + 125 * tween(t, 7.3, 11)}
                y={405}
                scale={0.43}
                kind="worker"
                walk={Math.sin(t * 3) * 3}
              />
            </g>
            <MatchedOldPrint angle={oldAngle} />
            <Puppet
              {...elder}
              variant="elder"
              head={t < 10 ? -2 : 3 - 7 * look}
              smile
            />
            <Puppet
              {...xh}
              variant="xiaohe"
              head={t < 3.5 ? 3 : t < 10 ? -3 : 4 - 8 * look}
              smile
              armLayer="body"
            />
            <Puppet {...elder} variant="elder" armLayer="front" />
            <Puppet {...xh} variant="xiaohe" armLayer="front" />
            <g opacity={tween(t, 3.5, 4.1)}>
              <PhoneView
                x={phoneX}
                y={phoneY}
                scale={0.68}
                angle={-5 + 5 * review}
                view={
                  <>
                    <AlignedLandscape time={t} />
                    <Puppet {...elderBase} variant="elder" />
                    <MatchedOldPrint angle={wind} />
                  </>
                }
              />
              <text
                x={phoneX - 30}
                y={phoneY - 112}
                fontSize="24"
                fill="#5A4D35"
              >
                课程拍摄
              </text>
            </g>
            <Viewfinder
              recording={t > 5.8 && t < 10}
              opacity={tween(t, 4.7, 5.6) * (1 - tween(t, 9.7, 10.4))}
            />
            <circle
              cx={phoneX + 23}
              cy={phoneY - 55}
              r="4"
              fill="#A13E2D"
              opacity={tween(t, 5.6, 5.9) * (1 - tween(t, 9.7, 10.1))}
            />
          </g>
        </g>
      </svg>
    </Act05Frame>
  );
};
