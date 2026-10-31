import { useId } from "react";
import { ValleyBackground } from "../act04/Valley";
import { SalesShelf, ApronVillager } from "../act04/Props";
import { Puppet } from "../act01/Puppet";
import { Villager } from "../act02/Villager";
import { OldHouseStage } from "../act01/StageProps";
import { armTo } from "../act03/Notebook";
import { CollectionBag, Viewfinder } from "./Props";
import { colors, tween } from "../../shared/styleTokens";
import { ink, ArtDefs } from "../act01/art";

/** Three fixed lenses. A quiet greeting/nod precedes the single working action in each take. */
export const LaborView = ({
  kind = 0,
  time = 3,
  frame = true,
}: {
  kind?: number;
  time?: number;
  frame?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  const nod = Math.sin(tween(time, 0.3, 1.1) * Math.PI) * 5;
  const consent = tween(time, 0.05, 0.6) * (1 - tween(time, 0.85, 1.3));
  const take = tween(time, 1.3, 3.9);
  const pick = tween(time, 1.3, 2.2),
    place = tween(time, 2.4, 3.9);
  const tx =
    kind === 0 ? 1160 - 10 * place : kind === 1 ? 1120 + 130 * take : 1339;
  const ty = kind === 0 ? 782 - 145 * place : kind === 1 ? 600 : 600;
  const pose = armTo({
    x: kind === 2 ? 1100 : kind === 1 ? 970 + 80 * take : 900,
    y: kind === 0 ? 300 : kind === 1 ? 230 : 280,
    scale: 0.77,
    targetX: tx,
    targetY: ty,
  });
  const bodyY =
    kind === 0 ? 300 + 152 * pick * (1 - place) : kind === 1 ? 230 : 280;
  const workPose = armTo({ ...pose, y: bodyY, targetX: tx, targetY: ty });
  return (
    <g>
      <ArtDefs id={id} />
      {kind === 0 ? (
        <>
          <ValleyBackground time={time} />
          <path
            d="M700 914L800 750Q1090 706 1500 762L1770 930Z"
            fill="#BEAB83"
            stroke="#DCC99B"
            strokeWidth="4"
          />
          <path
            d="M1150 782L1170 772L1180 789L1158 798Z"
            fill="#EEDDB8"
            opacity={1 - tween(time, 2.05, 2.3)}
          />
          <CollectionBag x={1150} y={690} />
          <Villager
            {...workPose}
            y={300}
            kind="worker"
            crouch={pick * (1 - place) * 1.4}
            head={nod}
          />
          <path
            d={`M${tx - 8} ${ty + 11}l22-8l10 15l-27 9Z`}
            fill="#EBD9B1"
            opacity={tween(time, 2.05, 2.3) * (1 - tween(time, 3.6, 3.9))}
          />
        </>
      ) : kind === 1 ? (
        <>
          <OldHouseStage />
          <g stroke="#705338" strokeWidth="5">
            <path d="M1070 463H1670V768H1070Z" fill="#8D704B" />
            <path
              d="M1095 745H1120V872H1095ZM1620 745H1648V872H1620Z"
              fill="#765638"
            />
            <path d="M1102 531H1690L1640 762H1052Z" fill="#D4C9A4" />
            <path
              d="M1105 532H1686L1661 623H1085Z"
              fill="#EEE2C5"
              stroke="#B49D71"
            />
            <path
              d="M1103 553Q1220 536 1317 555T1667 549"
              fill="none"
              stroke="#CFBD90"
              strokeWidth="2"
            />
          </g>
          <ApronVillager {...pose} kind="woman" head={nod} />
          <path
            d={`M${1100 + 130 * take} ${600 + 20 * take}l420-8l-25 ${100 - 64 * take}l-420 8Z`}
            fill="#E7DEC2"
            stroke="#A6AB88"
            strokeWidth="3"
          />
          <path
            d={`M${1120 + 130 * take} ${623 + 20 * take}l360-6`}
            stroke="#879578"
            strokeWidth="3"
          />
          <path
            d={`M${tx - 18} ${ty + 12}h85v24h-85Z`}
            fill="#E7DEC2"
            stroke="#A6AB88"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <OldHouseStage />
          <SalesShelf />
          <ApronVillager {...pose} kind="woman" head={nod} />
          <g
            transform={`translate(${1340 - 36 * take} ${600 - 7 * take}) rotate(${-4 + 4 * take})`}
          >
            <path
              d="M-80-27H80V27H-80Z"
              fill="#EADCB7"
              stroke="#90724B"
              strokeWidth="2"
            />
            <text textAnchor="middle" y="9" fontSize="25" fill={ink}>
              产地：余村
            </text>
          </g>
          <path
            d="M1260 638H1450"
            stroke={colors.gold}
            strokeWidth="3"
            opacity={tween(time, 3.7, 4.1)}
          />
        </>
      )}
      <g opacity={consent}>
        <Puppet
          x={kind === 0 ? 500 : 490}
          y={kind === 0 ? 410 : 310}
          scale={0.55}
          variant="xiaohe"
          upper={-69}
          forearm={-51}
          head={-3}
          point
        />
      </g>
      {frame ? <Viewfinder recording={time > 1.15} /> : null}
    </g>
  );
};
