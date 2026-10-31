import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act04Frame } from "../../components/act04/Act04Frame";
import {
  ApronVillager,
  DoorPanel,
  KeyCard,
  PhoneView,
  Platter,
  RouteSheet,
} from "../../components/act04/Props";
import { OldHouseStage, OldTable } from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { Villager } from "../../components/act02/Villager";
import { armTo } from "../../components/act03/Notebook";
import { tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";

export const Scene14 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pass = tween(t, 3.2, 4.8),
    out = tween(t, 11.5, 13);
  const trayX = 1030 + tween(t, 4.3, 9.2, 0, 235),
    trayY = 646 + tween(t, 9.2, 10.5, 0, 43);
  const host = armTo({
    x: 560,
    y: 330,
    scale: 0.6,
    targetX: 730 + pass * 30,
    targetY: 572,
  });
  const guest = armTo({
    x: 810,
    y: 330,
    scale: 0.6,
    facing: "left",
    targetX: 790 - pass * 30,
    targetY: 572,
  });
  const girl = armTo({
    x: 1640,
    y: 330,
    scale: 0.61,
    facing: "left",
    targetX: 1680,
    targetY: 546,
  });
  const server = armTo({
    x: trayX - 180,
    y: 400,
    scale: 0.56,
    targetX: trayX - tween(t, 9.2, 10.5, 0, 20),
    targetY: 646 - tween(t, 9.2, 10.5, 0, 30),
  });
  const guide = armTo({
    x: 1180,
    y: 330,
    scale: 0.61,
    targetX: 1340 + 30 * tween(t, 5.7, 7),
    targetY: 580,
  });
  const routeGuest = armTo({
    x: 1370,
    y: 330,
    scale: 0.61,
    facing: "left",
    targetX: 1370,
    targetY: 580,
  });
  return (
    <Act04Frame
      scene="Scene14"
      label="乡村旅游与休闲经营"
      labelOpacity={tween(t, 1, 1.3) * (1 - tween(t, 11.6, 12))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g opacity={1 - out}>
          <OldHouseStage />
          <g
            opacity={tween(t, 0.6, 1.3)}
            transform="translate(650 400) scale(.48)"
          >
            <OldTable />
          </g>
          <g opacity={tween(t, 2, 2.5)}>
            <ApronVillager {...host} kind="worker" head={3} />
            <Villager {...guest} kind="farmer" head={2} />
            <g
              transform={`translate(${tween(t, 3.2, 4.8, host.hand.x, guest.hand.x)} 572)`}
            >
              <KeyCard />
            </g>
            <path
              d="M364 607H730V641H364ZM386 641H707V820H386Z"
              fill="#84613E"
              stroke="#4A3829"
              strokeWidth="4"
            />
            <rect
              x="444"
              y="658"
              width="210"
              height="58"
              fill="#E2CCA0"
              stroke="#AF8A4E"
              strokeWidth="3"
            />
            <text x="549" y="699" fontSize="32" textAnchor="middle" fill={ink}>
              入住接待
            </text>
            <ApronVillager
              {...server}
              kind="woman"
              walk={t > 4.3 && t < 10.5 ? Math.sin(t * 2.5) * 2 : 0}
            />
            <Villager {...guide} kind="worker" />
            <Villager {...routeGuest} kind="woman" />
            <g transform={`translate(${tween(t, 5.7, 7, 1340, 1370)} 580)`}>
              <RouteSheet />
            </g>
            <path
              d="M1267 705H1474V762H1267Z"
              fill="#DECEA7"
              stroke="#A3824F"
              strokeWidth="3"
            />
            <text x="1370" y="745" fontSize="29" textAnchor="middle" fill={ink}>
              步行游览
            </text>
            <Puppet
              x={170 - tween(t, 2.5, 4.2, 0, 32)}
              y={369}
              scale={0.56}
              variant="elder"
              head={-3}
              upper={-3}
              forearm={-12}
            />
            <Puppet
              {...girl}
              variant="xiaohe"
              head={4}
              upper={girl.upper}
              forearm={girl.forearm}
            />
            <PhoneView
              x={girl.hand.x - 5}
              y={girl.hand.y}
              scale={0.48}
              angle={13}
              view={
                <>
                  <rect width="1920" height="1080" fill="#DFCCA3" />
                  <g transform="translate(360 180) scale(2)">
                    <KeyCard />
                  </g>
                  <Platter x={1150} y={620} r={220} />
                </>
              }
            />
            <Platter x={trayX} y={trayY} r={47} />
            <text
              x="1530"
              y="864"
              fontSize="24"
              textAnchor="end"
              fill="#745E43"
            >
              综合性职业示意
            </text>
          </g>
        </g>
        {t < 3.2 ? (
          <g
            transform={`translate(960 560) scale(${tween(t, 0, 3.2, 1, 2.75)}) translate(-960 -560)`}
            opacity={1 - tween(t, 2.8, 3.2)}
          >
            <DoorPanel open={tween(t, 0.2, 2.5)} />
          </g>
        ) : null}
        {out > 0 ? (
          <Platter
            x={tween(t, 11.5, 13, trayX, 960)}
            y={tween(t, 11.5, 13, trayY, 550)}
            r={tween(t, 11.5, 13, 47, 270)}
          />
        ) : null}
      </svg>
    </Act04Frame>
  );
};
