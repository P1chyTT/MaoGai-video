import { useCurrentFrame, useVideoConfig } from "remotion";
import { useId } from "react";
import { Act04Frame } from "../../components/act04/Act04Frame";
import {
  ApronVillager,
  FamilyWalk,
  Leaf,
  PhoneView,
} from "../../components/act04/Props";
import { ValleyBackground } from "../../components/act04/Valley";
import { FarmHouse, Broom, Sapling } from "../../components/act02/Props";
import { Villager, handPoint } from "../../components/act02/Villager";
import { Puppet } from "../../components/act01/Puppet";
import { colors, tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";

const loopCoords = [
  350, 530, 640, 280, 960, 480, 1540, 540, 1560, 800, 960, 820, 350, 530,
];
const routeCoords = [
  920, 640, 932, 565, 972, 602, 1015, 560, 1030, 662, 971, 680, 920, 640,
];
export const cyclePath = (p: number) => {
  const n = loopCoords.map((v, i) => v + (routeCoords[i] - v) * p);
  return `M${n[0]} ${n[1]}Q${n[2]} ${n[3]} ${n[4]} ${n[5]}T${n[6]} ${n[7]}Q${n[8]} ${n[9]} ${n[10]} ${n[11]}T${n[12]} ${n[13]}Z`;
};
export const Scene16 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const reveal = tween(t, 0, 1.35),
    out = tween(t, 11.8, 13);
  const u = tween(t, 1.4, 4.5, -12, -43),
    f = tween(t, 1.4, 4.5, -45, -48);
  const hand = handPoint({ x: 795, y: 531, scale: 0.42, upper: u, forearm: f });
  return (
    <Act04Frame scene="Scene16">
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id={`${id}-eco`}>
            <path d="M128 630Q118 405 334 388Q498 388 564 496Q575 625 390 664Q231 687 128 630Z" />
          </clipPath>
        </defs>
        <g opacity={reveal}>
          <g opacity={1 - 0.35 * out}>
            <g clipPath={`url(#${id}-eco)`}>
              <svg
                x={120 - tween(t, 0, 3, 0, 18)}
                y="385"
                width="445"
                height="282"
                viewBox="160 230 1550 710"
                preserveAspectRatio="none"
              >
                <ValleyBackground />
              </svg>
            </g>
            <svg
              x="733"
              y="394"
              width="410"
              height="282"
              viewBox="2100 280 810 620"
            >
              <FarmHouse />
            </svg>
            <path
              d="M1275 643Q1520 550 1788 632L1802 698Q1540 620 1292 712Z"
              fill="#D4BD8E"
              stroke="#A48E63"
              strokeWidth="3"
            />
            <path
              d="M1445 562H1685V585H1445ZM1467 585V651M1658 585V643M1510 595H1625"
              stroke="#765B3D"
              strokeWidth="8"
              fill="none"
            />
            {["生态环境改善", "绿色经营增收", "生活条件改善"].map((s, i) => (
              <g key={s} opacity={tween(t, i * 0.6, 0.5 + i * 0.6)}>
                <text
                  x={340 + i * 610}
                  y="340"
                  textAnchor="middle"
                  fontSize="34"
                  fill={ink}
                >
                  {s}
                </text>
              </g>
            ))}
            <g opacity={tween(t, 4, 4.6)}>
              <g transform="translate(315 663) scale(.54)">
                <Sapling x={0} y={0} leaves={0.6} />
              </g>
              <Villager
                x={205}
                y={474}
                scale={0.25}
                kind="farmer"
                upper={-30}
                forearm={-22}
                head={4}
              />
            </g>
            <g opacity={tween(t, 5.2, 5.8)}>
              <Villager
                x={1010}
                y={520}
                scale={0.29}
                kind="worker"
                upper={-12 + Math.sin(t * 2) * 4}
                forearm={-20}
                held={<Broom angle={Math.sin(t * 2) * 7} />}
              />
            </g>
            <g opacity={tween(t, 6.6, 7.2)}>
              <Villager
                x={1650}
                y={493}
                scale={0.25}
                kind="worker"
                facing="left"
                crouch={0.6}
                upper={-24}
                forearm={-18}
              />
            </g>
            <FamilyWalk
              x={1390 + tween(t, 6, 11.4, 0, 45)}
              y={459}
              scale={0.28}
              step={Math.sin(t * 2) * 1.5}
            />
            <Puppet
              x={625}
              y={539}
              scale={0.4}
              variant="elder"
              upper={tween(t, 4.2, 5.7, -5, -53)}
              forearm={tween(t, 4.2, 5.7, -12, -85)}
              head={1}
            />
            <ApronVillager
              x={1140}
              y={474}
              scale={0.34}
              kind="worker"
              facing="left"
              upper={tween(t, 5, 6.2, -12, -53)}
              forearm={tween(t, 5, 6.2, -20, -75)}
              head={-2}
            />
            <Puppet
              x={795}
              y={531}
              scale={0.42}
              variant="xiaohe"
              head={tween(t, 1.5, 4.5, -4, 3)}
              upper={u}
              forearm={f}
            />
          </g>
          <PhoneView
            x={tween(t, 11.8, 13, hand.x, 960)}
            y={tween(t, 11.8, 13, hand.y, 650)}
            scale={tween(t, 11.8, 13, 0.39, 1.8)}
            angle={tween(t, 1.6, 4.5, -14, 12) * (1 - out)}
            route={out > 0}
            view={
              <>
                <rect width="1920" height="1080" fill="#E9DABB" />
                <g transform="translate(500 100) scale(1.5)">
                  <ApronVillager
                    x={0}
                    y={0}
                    scale={1}
                    kind="worker"
                    upper={-43}
                    forearm={-45}
                  />
                </g>
              </>
            }
          />
          <path
            d={cyclePath(out)}
            fill="none"
            stroke={colors.gold}
            strokeWidth={3 - out}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={
              1 - (t < 4 ? tween(t, 0.6, 4, 0, 0.5) : tween(t, 4, 8.7, 0.5, 1))
            }
            strokeLinecap="round"
          />
          <text
            x="1710"
            y="873"
            textAnchor="end"
            fontSize="24"
            fill="#796145"
            opacity={1 - out}
          >
            保护与经营机制示意 · 无金额或比例
          </text>
          <g transform={`translate(120 140) scale(${tween(t, 4.6, 5)} 1)`}>
            <path
              d="M0 0L620 2V162L0 160Z"
              fill="#EADCB9"
              stroke="#BA9C61"
              strokeWidth="2"
            />
            <text x="24" y="42" fontSize="29" fill={ink}>
              2021年12月
            </text>
            <text x="24" y="88" fontSize="29" fill={ink}>
              余村入选联合国世界旅游组织
            </text>
            <text x="24" y="132" fontSize="29" fill={ink}>
              首批“最佳旅游乡村”。
            </text>
          </g>
        </g>
        {t < 1.35 ? (
          <g
            transform={`translate(${tween(t, 0, 1.35, 1185, 340)} ${tween(t, 0, 1.35, 640, 520)}) scale(${tween(t, 0, 1.35, 40, 0.95)})`}
          >
            <Leaf />
          </g>
        ) : (
          <g
            transform="translate(340 520) scale(.95)"
            opacity={1 - tween(t, 1.35, 2)}
          >
            <Leaf />
          </g>
        )}
      </svg>
    </Act04Frame>
  );
};
