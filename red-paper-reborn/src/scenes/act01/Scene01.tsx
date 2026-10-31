import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CameraLayer } from "../../components/CameraLayer";
import { SceneFrame } from "../../components/act01/SceneFrame";
import { ArtDefs, ink, MountainScene } from "../../components/act01/art";
import { Factory, MineCart } from "../../components/act01/StageProps";
import { Hand, Puppet } from "../../components/act01/Puppet";
import { tween } from "../../shared/styleTokens";

export const Scene01 = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const id = useId().replace(/:/g, "");
  const expansion = tween(t, 6, 9.4);
  const px = 236 - 296 * expansion;
  const py = 220 - 300 * expansion;
  const pw = 1448 + 592 * expansion;
  const ph = 590 + 520 * expansion;
  const drop = tween(t, 0, 1.35, -96, 0);
  const hand = 1 - tween(t, 5.2, 6.1);
  return (
    <SceneFrame scene="Scene01" label="往日余村｜历史场景示意" fiction={t >= 2}>
      <CameraLayer
        fromScale={1}
        toScale={1.08}
        toX={0}
        delay={2}
        duration={6}
        origin="50% 55%"
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <ArtDefs id={id} />
          <defs>
            <clipPath id={`${id}-photo`}>
              <rect x={px} y={py} width={pw} height={ph} />
            </clipPath>
          </defs>
          <g opacity={1 - expansion}>
            <rect x="0" y="145" width="1920" height="810" fill="#B4976D" />
            <rect
              x="0"
              y="145"
              width="1920"
              height="810"
              fill={`url(#${id}-wood)`}
              opacity=".2"
            />
            <path
              d="M0 420H1920M0 713H1920"
              stroke="#93704D"
              strokeWidth="3"
              opacity=".25"
            />
          </g>
          <g
            transform={`translate(0 ${drop}) rotate(${tween(t, 0, 1.35, -2.5, 0)} 960 520)`}
            opacity={tween(t, 0, 0.4)}
          >
            <rect
              x={px - 31}
              y={py - 27}
              width={pw + 68}
              height={ph + 67}
              fill={ink}
              opacity=".16"
            />
            <rect
              x={px - 35}
              y={py - 35}
              width={pw + 70}
              height={ph + 70}
              fill="#B99A6C"
              stroke="#76573B"
              strokeWidth="3"
            />
            <rect
              x={px - 18}
              y={py - 18}
              width={pw + 36}
              height={ph + 36}
              fill="#E9D8B4"
              stroke="#C6AB7C"
              strokeWidth="2"
            />
            <g clipPath={`url(#${id}-photo)`}>
              <rect x="-80" y="-80" width="2100" height="1200" fill="#EADBBF" />
              <g opacity={tween(t, 2, 2.8)}>
                <MountainScene
                  detail={tween(t, 2.8, 4.4)}
                  roadOpacity={tween(t, 4, 5.8)}
                />
              </g>
              <g opacity={tween(t, 5.8, 7.3)}>
                <Factory />
              </g>
              <g opacity={tween(t, 6.1, 7)}>
                <Puppet
                  x={564}
                  y={413}
                  scale={0.52}
                  variant="middle"
                  head={tween(t, 7.4, 8.7, 0, -4)}
                  upper={4}
                  forearm={-10}
                  backUpper={-5}
                  backForearm={0}
                />
              </g>
              {t >= 9 ? (
                <MineCart
                  x={tween(t, 9, 10, 910, 1000)}
                  turn={tween(t, 9, 10, 0, 210)}
                />
              ) : null}
            </g>
            <path
              d={`M${px - 18} ${py - 18}l48 0m-48 0v48M${px + pw + 18} ${py - 18}h-48m48 0v48M${px - 18} ${py + ph + 18}h48m-48 0v-48M${px + pw + 18} ${py + ph + 18}h-48m48 0v-48`}
              fill="none"
              stroke="#927245"
              strokeWidth="2"
            />
          </g>
          <g
            opacity={hand * tween(t, 0.7, 1.5)}
            transform={`translate(307 ${808 + tween(t, 5.2, 6.1, 0, 100)}) rotate(210) scale(2.1)`}
          >
            <path
              d="M-22-82H21V-7H-22Z"
              fill={`url(#${id}-leather)`}
              stroke={ink}
              strokeWidth="2"
            />
            <path d="M-22-23H21V-7H-22Z" fill="#AE8B55" />
            <Hand id={id} point />
          </g>
        </svg>
      </CameraLayer>
    </SceneFrame>
  );
};
