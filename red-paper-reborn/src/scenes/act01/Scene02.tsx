import { useCurrentFrame, useVideoConfig } from "remotion";
import { CameraLayer } from "../../components/CameraLayer";
import { SceneFrame } from "../../components/act01/SceneFrame";
import { MountainScene, ochre } from "../../components/act01/art";
import {
  CementBag,
  Dust,
  Factory,
  MineCart,
  OldHouseStage,
  OldPrint,
  OldTable,
} from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { tween } from "../../shared/styleTokens";

export const Scene02 = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const intoHouse = tween(t, 5.8, 7.3);
  const pollution = tween(t, 2.8, 6.5);
  return (
    <SceneFrame scene="Scene02" label="石矿开采与水泥生产">
      <CameraLayer
        fromScale={1.08}
        toScale={1.08}
        toX={-120}
        duration={6}
        origin="50% 55%"
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <MountainScene />
          <Factory />
          <MineCart x={tween(t, 0, 4.7, 1000, 1460)} turn={210 + f * 5.2} />
          <Dust amount={pollution} drift={tween(t, 2.8, 8, 0, -55)} />
          <path
            d="M1110 928Q1350 817 1625 851Q1740 884 1930 886L1930 925Q1748 921 1619 888Q1364 860 1189 955Z"
            fill="#7F7259"
            opacity={pollution * 0.65}
          />
          <path
            d="M1403 674Q1340 701 1260 660T1077 638"
            fill="none"
            stroke={ochre}
            strokeWidth="4"
            strokeDasharray="7 7"
            pathLength="1"
            strokeDashoffset={tween(t, 1, 3, 1, 0)}
            opacity={tween(t, 1, 2) * (1 - tween(t, 4.8, 6))}
          />
          <CementBag
            x={tween(t, 1.5, 3.6, 1200, 990)}
            y={tween(t, 1.5, 3.6, 603, 595)}
            opacity={tween(t, 0.7, 1.4) * (1 - tween(t, 3.2, 4.4))}
          />
          <g opacity={1 - intoHouse}>
            <Puppet
              x={tween(t, 1.9, 3.6, 564, 755)}
              y={tween(t, 1.9, 3.6, 413, 318)}
              scale={tween(t, 1.9, 3.6, 0.52, 0.66)}
              variant="middle"
              upper={tween(t, 1.9, 4.3, 4, -30)}
              forearm={tween(t, 1.9, 3.6, -10, -75)}
              backUpper={tween(t, 1.9, 3.6, -5, 12)}
              backForearm={tween(t, 1.9, 3.6, 0, -12)}
              envelope={tween(t, 3.4, 4.2)}
              head={tween(t, 0, 1.5, -4, 0) + tween(t, 4.9, 6.3, 0, -5)}
              smile={t < 5}
            />
          </g>
          <g
            opacity={intoHouse}
            transform={`translate(${tween(t, 5.8, 7.3, 210, 0)} 0)`}
          >
            <OldHouseStage
              era="past"
              dust={pollution}
              shutter={tween(t, 8.4, 9.65)}
              sway={t * 0.4}
            />
            <Puppet
              x={780}
              y={205}
              scale={0.82}
              variant="middle"
              upper={tween(t, 7.5, 9.3, -30, -68)}
              forearm={tween(t, 7.5, 9.3, -75, -25)}
              head={tween(t, 7.2, 8.4, 0, -5)}
              smile={false}
              envelope={1 - tween(t, 7.6, 8.2)}
            />
            <OldTable />
            <g transform="translate(843 616) skewX(-24) scale(1 .29)">
              <OldPrint x={0} y={0} width={278} height={170} />
            </g>
          </g>
        </svg>
      </CameraLayer>
    </SceneFrame>
  );
};
