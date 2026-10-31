import { OldPrint } from "../act01/StageProps";
import { AlignedLandscape } from "../act05/Props";
import { ToolBag, Spade } from "../act02/Props";
import { KeyCard } from "../act04/Props";
import { Phone } from "../../scenes/act01/Scene03";
import { Villager, handPoint } from "../act02/Villager";
import { colors, tween } from "../../shared/styleTokens";
import { ink } from "../act01/art";

export const PhotoPair = () => (
  <g>
    <OldPrint x={200} y={270} width={650} height={365} />
    <OldPrint x={1070} y={270} width={650} height={365} back />
    <svg
      x="1087"
      y="285"
      width="616"
      height="323"
      viewBox="160 210 1600 660"
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform="translate(18 -130)">
        <AlignedLandscape time={14.9667} />
      </g>
    </svg>
    <text x="525" y="678" fontSize="31" fill={ink} textAnchor="middle">
      历史场景示意
    </text>
    <text x="1395" y="678" fontSize="31" fill={ink} textAnchor="middle">
      剧情画面
    </text>
  </g>
);
export const MemoryObjects = ({ time }: { time: number }) => {
  const join = tween(time, 8, 10.8);
  return (
    <g>
      <style>{`.act06-memory [stroke] {stroke-width:2.5px;vector-effect:non-scaling-stroke}`}</style>
      {[0, 1, 2, 3].map((i) => {
        const x = 350 + i * 398,
          pose = { x: x - 48, y: 699, scale: 0.21, upper: -39, forearm: -35 };
        const hand = handPoint(pose);
        const px = tween(join, 0, 1, x, hand.x + 8),
          py = tween(join, 0, 1, 755, hand.y);
        return (
          <g key={i} opacity={tween(time, 4 + i, 4.55 + i)}>
            <g opacity={join}>
              <path
                d={`M${x - 96} 875Q${x} 845 ${x + 95} 875`}
                fill="none"
                stroke="#B8A676"
                strokeWidth="3"
              />
              <Villager
                {...pose}
                kind={i === 2 ? "woman" : i === 0 ? "worker" : "farmer"}
              />
            </g>
            <g className="act06-memory" transform={`translate(${px} ${py})`}>
              {i === 0 ? (
                <ToolBag x={0} y={0} scale={0.42 - 0.15 * join} />
              ) : i === 1 ? (
                <g transform="scale(.38)">
                  <Spade />
                </g>
              ) : i === 2 ? (
                <g transform={`scale(${1.8 - 0.7 * join})`}>
                  <KeyCard />
                </g>
              ) : (
                <Phone x={0} y={25} scale={0.43} reveal={1} />
              )}
            </g>
          </g>
        );
      })}
      <path
        d="M300 900H1620"
        stroke={colors.gold}
        strokeWidth="2"
        opacity={join * 0.65}
      />
    </g>
  );
};
