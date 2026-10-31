import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act02Frame } from "../../components/act02/Act02Frame";
import { Villager, handPoint } from "../../components/act02/Villager";
import {
  Bench,
  Broom,
  DROP,
  FarmHouse,
  FarmSign,
  RuralBackdrop,
  Sapling,
  Spade,
} from "../../components/act02/Props";
import { OldTable } from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { ArtDefs, ink } from "../../components/act01/art";
import { colors, tween } from "../../shared/styleTokens";

export const Scene08 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const pan = -tween(t, 0, 11.2, 0, 1140);
  const giverU = tween(t, 5.8, 6.9, -33, -5);
  const giverF = tween(t, 5.8, 6.9, -48, -10);
  const takerU = tween(t, 6.1, 7.5, -28, -7);
  const takerF = tween(t, 6.1, 7.5, -62, -15);
  const giver = handPoint({
    x: 1230,
    y: 310,
    scale: 0.61,
    upper: -33,
    forearm: -48,
  });
  const taker = handPoint({
    x: 1479,
    y: 320,
    scale: 0.6,
    upper: takerU,
    forearm: takerF,
    facing: "left",
  });
  const pass = tween(t, 5.5, 6.1);
  const toolX = giver.x + (taker.x - giver.x) * pass;
  const toolY = giver.y + (taker.y - giver.y) * pass;
  const crouch = tween(t, 9.7, 10.4) - tween(t, 10.6, 11.4);
  const hostX =
    2310 + tween(t, 9.3, 10.2, 0, 160) + tween(t, 10.7, 12.2, 0, 230);
  const dropScale = tween(t, 0, 0.7, 60, 0.65);
  const dropX = tween(t, 0, 0.7, 1490, 960);
  const dropY = tween(t, 0, 0.7, 640, 210) + tween(t, 0.7, 1.25, 0, 550);
  return (
    <Act02Frame
      scene="Scene08"
      label="保护生态，探索新的生计"
      labelOpacity={tween(t, 1, 1.3) * (1 - tween(t, 11.7, 12))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <ArtDefs id={id} />
        <defs>
          <clipPath id={`${id}-clean`}>
            <rect x="0" y="200" width="1100" height="710" />
          </clipPath>
          <clipPath id={`${id}-plant`}>
            <rect
              x="1080"
              y="220"
              width={850 * tween(t, 3.8, 4.8)}
              height="690"
            />
          </clipPath>
          <clipPath id={`${id}-farm`}>
            <rect
              x="1980"
              y="260"
              width={1100 * tween(t, 7.8, 8.8)}
              height="660"
            />
          </clipPath>
        </defs>
        <g transform={`translate(${pan} 0)`}>
          <RuralBackdrop />
          <g clipPath={`url(#${id}-clean)`}>
            <path
              d="M818 652Q880 637 941 652L954 782Q885 799 806 782Z"
              fill="#9D855A"
              stroke="#5F4D33"
              strokeWidth="4"
            />
            <ellipse
              cx="880"
              cy="652"
              rx="61"
              ry="13"
              fill="#61583E"
              stroke="#B6A071"
              strokeWidth="3"
            />
            {[0, 1, 2].map((i) => {
              const p = tween(t, 1.4 + i * 0.65, 2.6 + i * 0.65);
              return (
                <g
                  key={i}
                  opacity={1 - tween(p, 0.85, 1)}
                  transform={`translate(${645 + i * 54 + (883 - 645 - i * 54) * p} ${753 + (i % 2) * 18 - 100 * p}) rotate(${i * 21 - 12})`}
                >
                  <path
                    d="M-19-9L17-14L22 9L-13 14Z"
                    fill={i === 1 ? "#9A6E4B" : "#D6C59D"}
                    stroke="#8B7753"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            <Villager
              x={480}
              y={305}
              scale={0.64}
              kind="worker"
              upper={-10 + Math.sin(t * 2) * 6}
              forearm={-14}
              head={5}
              held={<Broom angle={Math.sin(t * 2) * 10} />}
            />
            <Villager
              x={820}
              y={310}
              scale={0.58}
              kind="farmer"
              facing="left"
              crouch={0.6}
              upper={5}
              forearm={-10}
              head={5}
            />
            <path
              d="M125 893Q340 824 550 873"
              fill="none"
              stroke="#CFC49D"
              strokeWidth="3"
            />
          </g>
          <g clipPath={`url(#${id}-plant)`}>
            <path
              d="M1132 774Q1449 718 1829 780L1801 828Q1415 778 1158 821Z"
              fill="#8B7452"
              stroke="#AE956A"
              strokeWidth="3"
            />
            <Sapling x={1845} y={782} leaves={tween(t, 6.3, 7.7, 0, 0.72)} />
            <Sapling x={1755} y={786} leaves={0.25} />
            <g transform={`translate(${toolX} ${toolY}) scale(.61)`}>
              <Spade angle={tween(t, 6.8, 7.8, 0, -8)} />
            </g>
            <Villager
              x={1230}
              y={310}
              scale={0.61}
              kind="farmer"
              upper={giverU}
              forearm={giverF}
              head={3}
            />
            <Villager
              x={1479}
              y={320}
              scale={0.6}
              kind="worker"
              facing="left"
              upper={takerU}
              forearm={takerF}
              head={5}
            />
            <Puppet
              x={1640}
              y={300}
              scale={0.66}
              variant="middle"
              upper={tween(t, 4.7, 6.7, -20, -28)}
              forearm={tween(t, 4.7, 6.7, -14, -5)}
              head={5}
              smile={false}
              backUpper={-5}
              backForearm={-10}
            />
          </g>
          <g clipPath={`url(#${id}-farm)`}>
            <FarmHouse />
            <g
              transform={`translate(${tween(t, 9.3, 10.5, 2050, 2173)} 427) scale(.4)`}
            >
              <OldTable />
            </g>
            <Bench
              x={tween(t, 9.7, 10.8, 2606, 2570)}
              y={tween(t, 9.7, 10.4, 690, 708)}
              scale={0.85}
            />
            <FarmSign
              x={2388}
              y={tween(t, 8.1, 9.3, 590, 490)}
              scale={tween(t, 12.6, 13, 0.88, 1.02)}
            />
            <Villager
              x={hostX}
              y={321}
              scale={0.62}
              kind="woman"
              facing="left"
              crouch={crouch}
              upper={
                t < 9.3
                  ? tween(t, 8.1, 9.3, -10, -70)
                  : tween(t, 9.3, 10.2, -70, -15)
              }
              forearm={t < 9.3 ? -35 : tween(t, 9.3, 10.2, -35, -8)}
              head={tween(t, 11, 12.1, 5, -4)}
              walk={t > 10.7 && t < 12.2 ? Math.sin((t - 10.7) * 6) * 3 : 0}
            />
          </g>
        </g>
        <g
          opacity={tween(t, 1.1, 1.3) * (1 - tween(t, 1.6, 1.9))}
          fill="none"
          stroke="#E5D9B6"
          strokeWidth="4"
        >
          <ellipse
            cx={960 + pan}
            cy="793"
            rx={tween(t, 1.1, 1.9, 15, 105)}
            ry={tween(t, 1.1, 1.9, 4, 19)}
          />
        </g>
        {t < 1.28 ? (
          <g transform={`translate(${dropX} ${dropY}) scale(${dropScale})`}>
            <path d={DROP} fill={colors.sky} />
          </g>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          right: 124,
          bottom: 189,
          fontSize: 26,
          letterSpacing: 3,
          color: ink,
          borderBottom: "2px solid #C79540",
          paddingBottom: 6,
          opacity: tween(t, 4.1, 4.6),
        }}
      >
        持续探索
      </div>
    </Act02Frame>
  );
};
