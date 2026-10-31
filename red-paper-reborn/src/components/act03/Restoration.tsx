import { useId } from "react";
import { ArtDefs, Cloud, RIDGE, SCAR, ink } from "../act01/art";
import { Puppet } from "../act01/Puppet";
import { Villager } from "../act02/Villager";
import { Broom, Sapling, Spade } from "../act02/Props";
import { colors, tween } from "../../shared/styleTokens";

/** Fixed ridge/creek geometry is the handoff contract for Scene13. */
export const CREEK =
  "M-80 802Q280 710 601 782Q925 856 1210 773Q1520 687 2000 800V1000H-80Z";
export const Restoration = ({ time }: { time: number }) => {
  const id = useId().replace(/:/g, "");
  const drift = -tween(time, 0, 13, 0, 18);
  return (
    <g>
      <ArtDefs id={id} />
      <defs>
        <clipPath id={`${id}-scar`}>
          <path d={SCAR} />
        </clipPath>
      </defs>
      <g transform={`translate(${drift} 0)`}>
        <Cloud x={350} y={231} />
        <Cloud x={1550} y={215} scale={0.85} />
        <path
          d="M-80 590L180 389L321 459L539 265L762 449L935 312L1120 493L1360 304L1580 446L1770 329L2000 570V900H-80Z"
          fill="#BFC5AA"
        />
        <path d={RIDGE} fill="#8D9F80" stroke="#6D8065" strokeWidth="3" />
        <path
          d="M94 588L274 414L421 489M491 420L590 315L748 458M777 426L878 340L995 504M1096 452L1192 385L1333 525M1473 463L1559 526"
          fill="none"
          stroke="#DDCBA1"
          strokeWidth="3"
        />
        <path d={SCAR} fill="#CBA877" stroke="#8A6C46" strokeWidth="3" />
        <path
          d="M412 492L593 360M358 553L631 460M349 626L691 562M387 695L740 664"
          stroke="#A18155"
          strokeWidth="2.5"
          fill="none"
        />
        <g clipPath={`url(#${id}-scar)`}>
          {[0, 1, 2].map((i) => {
            const soil = tween(time, 4 + i * 1.4, 5.1 + i * 1.4);
            const grass = tween(time, 5.1 + i * 1.4, 6.4 + i * 1.4);
            return (
              <g key={i}>
                <rect
                  x={325 + i * 73}
                  y={443 + i * 85}
                  width={350 * soil}
                  height="92"
                  fill="#9D8054"
                />
                <path
                  d={`M${330 + i * 73} ${510 + i * 85}q102-49 310-4v31H${330 + i * 73}Z`}
                  fill="#6D895A"
                  opacity={grass * 0.82}
                />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
                  <path
                    key={j}
                    d={`M${360 + i * 73 + j * 31} ${513 + i * 85}l-7-11m7 11l6-17m-6 17l12-8`}
                    fill="none"
                    stroke="#C6C18A"
                    strokeWidth="2"
                    opacity={grass}
                  />
                ))}
              </g>
            );
          })}
        </g>
        <path
          d="M-80 754Q240 655 445 759Q820 657 1091 743Q1430 629 2000 741V1000H-80Z"
          fill="#82936D"
        />
        <path d={CREEK} fill="#9EA897" stroke="#C6C3A0" strokeWidth="6" />
        <path d={CREEK} fill="#86AAA0" opacity={tween(time, 2, 10, 0, 0.56)} />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${130 + i * 360} ${834 + (i % 2) * 35}q120-31 250-7`}
            fill="none"
            stroke="#E4D8B6"
            strokeWidth={2 + tween(time, 2, 10)}
            opacity={0.25 + tween(time, 2, 10, 0, 0.6)}
          />
        ))}
        <path
          d="M-40 787Q280 696 600 767Q935 840 1210 759Q1510 673 1950 787"
          fill="none"
          stroke="#D4BE8F"
          strokeWidth="30"
        />
        <path
          d="M-40 946Q530 876 1030 934Q1530 989 1970 916V1080H-40Z"
          fill="#B9A47D"
        />
      </g>
      {[0, 1, 2].map((i) => {
        const p = tween(time, 1.5 + i * 0.85, 2.8 + i * 0.85);
        return (
          <path
            key={i}
            d="M-14-8L17-13L23 9L-12 14Z"
            transform={`translate(${280 + i * 52 + 90 * p} ${780 + (i % 2) * 14 - 62 * p}) rotate(${i * 25})`}
            fill={i === 1 ? "#9D7751" : "#D4C39D"}
            stroke="#86724F"
            strokeWidth="2"
            opacity={1 - tween(p, 0.85, 1)}
          />
        );
      })}
      <g opacity={tween(time, 0.8, 1.4)}>
        <Villager
          x={180}
          y={449}
          scale={0.38}
          kind="worker"
          upper={-8 + Math.sin(time * 2) * 5}
          forearm={-16}
          held={<Broom angle={Math.sin(time * 2) * 8} />}
        />
        <Villager
          x={370}
          y={442}
          scale={0.36}
          kind="farmer"
          facing="left"
          crouch={0.5}
          head={5}
          upper={-24}
          forearm={-25}
        />
        <path
          d="M356 722L405 714L419 772H348Z"
          fill="#9B8358"
          stroke="#6D573A"
          strokeWidth="3"
        />
      </g>
      <g opacity={tween(time, 4, 4.6)}>
        <g transform="translate(697 707) scale(.57)">
          <Sapling x={0} y={0} leaves={tween(time, 5.5, 10, 0.15, 0.48)} />
        </g>
        <Villager
          x={510}
          y={407}
          scale={0.38}
          kind="woman"
          upper={-33 + Math.sin(time * 1.7) * 2}
          forearm={-29}
          head={5}
        />
        <Villager
          x={735}
          y={430}
          scale={0.35}
          kind="farmer"
          facing="left"
          upper={-25}
          forearm={-24}
          head={4}
          held={<Spade angle={Math.sin(time * 1.8) * 5} />}
        />
      </g>
      <g opacity={tween(time, 6.5, 7.1)}>
        <path
          d="M1340 690V751M1460 677V731M1340 699L1460 686M1340 721L1460 708"
          stroke="#795E40"
          strokeWidth="7"
        />
        <Villager
          x={1250 + tween(time, 7.4, 12, 0, 35)}
          y={416}
          scale={0.38}
          kind="worker"
          upper={-38}
          forearm={-33}
          head={4}
          walk={Math.sin(time * 2) * 2}
        />
        <Villager
          x={1450}
          y={405}
          scale={0.39}
          kind="woman"
          facing="left"
          upper={-38 + Math.sin(time * 1.5) * 3}
          forearm={-23}
          head={4}
        />
      </g>
      <g transform="translate(1744 850) scale(1.05)">
        <Sapling x={0} y={0} leaves={tween(time, 7, 12, 0.22, 0.47)} />
      </g>
      <g transform="translate(1820 807) scale(.62)">
        <Spade angle={14} />
      </g>
      <path
        d="M1685 858Q1742 818 1801 858L1792 868H1695Z"
        fill="#91774F"
        stroke="#C6AE7E"
        strokeWidth="2"
      />
      <g opacity={tween(time, 1.3, 2)}>
        <Puppet
          x={900 + tween(time, 1.3, 12, 0, 52)}
          y={463 + Math.sin(time * 2) * 1.2}
          scale={0.49}
          variant="elder"
          upper={-5}
          forearm={-12}
          head={-3}
          lean={Math.sin(time * 2) * 0.4}
        />
        <Puppet
          x={1093 + tween(time, 1.3, 12, 0, 58)}
          y={479 + Math.sin(time * 2 + 0.8) * 1.2}
          scale={0.47}
          variant="xiaohe"
          upper={-18}
          forearm={-45}
          head={3}
          lean={Math.sin(time * 2 + 0.8) * 0.4}
        />
      </g>
      {["治理污染", "修复生态", "日常管护"].map((s, i) => (
        <g key={s} opacity={tween(time, 1 + i * 3.3, 1.5 + i * 3.3)}>
          <rect
            x={150 + i * 565}
            y="196"
            width="230"
            height="55"
            fill={colors.paper}
            opacity=".94"
          />
          <path
            d={`M${150 + i * 565} 251H${380 + i * 565}`}
            stroke="#C79540"
            strokeWidth="2"
          />
          <text
            x={265 + i * 565}
            y="234"
            textAnchor="middle"
            fontSize="32"
            fill={ink}
          >
            {s}
          </text>
        </g>
      ))}
      <text x="1780" y="895" textAnchor="end" fontSize="24" fill="#6C5E43">
        修复工序概括示意 · 仍需养护
      </text>
    </g>
  );
};

export const SeasonTab = ({ time }: { time: number }) => {
  const n = time < 5.3 ? 0 : time < 8 ? 1 : 2;
  const start = [2.6, 5.3, 8][n];
  const turn = Math.sin(Math.PI * tween(time, start, start + 0.55));
  return (
    <g
      transform={`translate(1600 294) scale(1 ${1 - turn * 0.72})`}
      opacity={tween(time, 2.4, 2.8)}
    >
      <path
        d="M-90-28H90V45L68 34L45 45L23 34L0 45L-23 34L-45 45L-67 34L-90 45Z"
        fill="#DFCEA8"
        stroke="#A78A54"
        strokeWidth="2"
      />
      <path d="M-65-19V-34M65-19V-34" stroke="#72593C" strokeWidth="4" />
      <text y="14" textAnchor="middle" fontSize="30" fill={ink}>
        {["春 · 复种", "秋 · 管护", "又一春"][n]}
      </text>
    </g>
  );
};
