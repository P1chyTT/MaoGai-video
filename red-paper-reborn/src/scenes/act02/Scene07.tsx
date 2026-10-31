import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CameraLayer } from "../../components/CameraLayer";
import { Act02Frame } from "../../components/act02/Act02Frame";
import {
  DROP,
  FoldedLandscape,
  VillageVignette,
} from "../../components/act02/Props";
import {
  OldHouseStage,
  OldPrint,
  OldTable,
} from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { ArtDefs, ink } from "../../components/act01/art";
import { colors, tween } from "../../shared/styleTokens";

export const Scene07 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const reveal = tween(t, 4, 8.8);
  const fold = tween(t, 9, 10.5);
  const exit = tween(t, 12.3, 13);
  const ribbon =
    "M805 503Q842 629 1025 677Q1235 756 1465 672Q1611 605 1740 621";
  return (
    <Act02Frame scene="Scene07">
      <CameraLayer
        fromScale={1}
        toScale={1.04}
        toX={0}
        duration={13}
        origin="50% 58%"
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <ArtDefs id={id} />
          <defs>
            <clipPath id={`${id}-picture`}>
              <rect
                x="1030"
                y="365"
                width={720 * tween(t, 9.6, 10.9)}
                height="450"
              />
            </clipPath>
          </defs>
          <OldHouseStage sway={Math.sin(t * 0.5) * 0.4} />
          <OldTable />
          <g transform="translate(843 616) skewX(-24) scale(1 .29)">
            <OldPrint x={0} y={0} width={278} height={170} />
          </g>
          <g
            opacity={tween(t, 4, 4.25) * (1 - fold)}
            transform={`translate(1300 610) scale(${1 - fold * 0.8} 1) translate(-1300 -610)`}
          >
            <path
              d={ribbon}
              fill="none"
              stroke="#AD9260"
              strokeWidth="104"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal}
            />
            <path
              d={ribbon}
              fill="none"
              stroke="#EDDFC1"
              strokeWidth="96"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal}
            />
            <g opacity={tween(t, 4.3, 4.8)} transform="translate(1040 677)">
              <path
                d="M-44 23L-20-30L14-38L49 19L24 43H-22Z"
                fill="#9C8564"
                stroke="#6B5138"
                strokeWidth="3"
              />
              <path
                d="M-20-30L-4 7L14-38M-4 7L49 19"
                stroke="#C7B28A"
                strokeWidth="2"
                fill="none"
              />
            </g>
            <g opacity={tween(t, 5, 5.5)} transform="translate(1190 716)">
              <rect
                x="-53"
                y="-34"
                width="106"
                height="68"
                fill="#D8C397"
                stroke="#7B5F3D"
                strokeWidth="3"
              />
              <path
                d="M-52-34L0 4L52-34"
                fill="none"
                stroke="#8E6F42"
                strokeWidth="2"
              />
              <text y="26" fontSize="25" textAnchor="middle" fill={ink}>
                收入
              </text>
            </g>
            <g
              opacity={tween(t, 5.9, 6.4)}
              transform="translate(1360 697) scale(.68)"
            >
              <path
                d={DROP}
                fill={colors.jade}
                stroke="#E9D9B7"
                strokeWidth="4"
              />
              <path
                d="M-25 26Q0 37 25 25"
                fill="none"
                stroke={colors.paper}
                strokeWidth="3"
              />
            </g>
            <g opacity={tween(t, 6.8, 7.3)} transform="translate(1510 653)">
              <path d="M-6 29V-28" stroke="#8A6849" strokeWidth="8" />
              <path
                d="M-6-18Q-70-13-46-54Q-22-82 2-58Q30-86 51-49Q65-14 12-14Z"
                fill="#6E8A59"
                stroke="#C2B77C"
                strokeWidth="3"
              />
              <path
                d="M-5-20L-28-48M-5-32L24-52"
                stroke="#DFD1A2"
                strokeWidth="2"
              />
            </g>
            <g opacity={tween(t, 7.7, 8.4)}>
              <VillageVignette x={1670} y={604} scale={0.47} />
            </g>
          </g>
          <g clipPath={`url(#${id}-picture)`} opacity={tween(t, 9.5, 10.6)}>
            <g transform="translate(40 0)">
              <FoldedLandscape />
            </g>
          </g>
          <Puppet
            x={478}
            y={205}
            scale={0.82}
            variant="elder"
            hat={false}
            upper={-62}
            forearm={tween(t, 3.8, 4.9, -20, -24)}
            head={-5}
            smile={false}
          />
          <Puppet
            x={830}
            y={227}
            scale={0.79}
            variant="xiaohe"
            facing="right"
            upper={3}
            forearm={-8}
            backUpper={10}
            head={tween(t, 4.2, 8.2, 4, -3)}
            smile={t > 7.7}
          />
          <text
            x="1690"
            y="851"
            textAnchor="end"
            fontSize="24"
            fill="#71583D"
            opacity={tween(t, 4, 4.5) * (1 - tween(t, 12, 12.4))}
          >
            叙事示意
          </text>
          {exit > 0 ? (
            <g transform={`translate(1490 640) scale(${exit * 60})`}>
              <path d={DROP} fill={colors.sky} />
            </g>
          ) : null}
        </svg>
      </CameraLayer>
      <div
        style={{
          position: "absolute",
          top: 175,
          left: 360,
          right: 360,
          background: "rgba(242,229,203,.94)",
          padding: "5px 14px",
          fontSize: 36,
          textAlign: "center",
          letterSpacing: 3,
          color: ink,
          opacity: tween(t, 3, 3.3) * (1 - tween(t, 11.7, 12)),
        }}
      >
        眼前的收入，也要经得起长远的检验。
      </div>
    </Act02Frame>
  );
};
