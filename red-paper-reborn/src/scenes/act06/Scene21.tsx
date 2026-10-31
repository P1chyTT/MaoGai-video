import { useId } from "react";
import {
  AbsoluteFill,
  Freeze,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Act06Frame } from "../../components/act06/Act06Frame";
import { PhotoPair, MemoryObjects } from "../../components/act06/Photos";
import { ScrollBackdrop } from "../../components/act06/Scroll";
import { ArtDefs } from "../../components/act01/art";
import { Hand } from "../../components/act01/Puppet";
import { Scene20 } from "../act05/Scene20";
import { tween } from "../../shared/styleTokens";

export const Scene21 = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps,
    id = useId().replace(/:/g, "");
  const enter = tween(t, 0, 1.2),
    out = tween(t, 11, 11.9667),
    push = tween(t, 8, 11, 1, 1.03);
  const release = tween(t, 1.6, 3.2);
  return (
    <AbsoluteFill>
      {t < 1.2 ? (
        <Freeze frame={15 * fps - 1}>
          <Scene20 />
        </Freeze>
      ) : null}
      <AbsoluteFill
        style={{
          clipPath:
            enter < 1
              ? `inset(${tween(enter, 0, 1, 409, 0)}px ${tween(enter, 0, 1, 913, 0)}px ${tween(enter, 0, 1, 426, 0)}px ${tween(enter, 0, 1, 537, 0)}px)`
              : undefined,
          opacity: t === 0 ? 0 : 1,
        }}
      >
        <Act06Frame
          scene="Scene21"
          label="从开采资源，到保护生态、绿色发展"
          labelOpacity={tween(t, 1, 1.35) * (1 - tween(t, 10.8, 11))}
        >
          <svg
            width="1920"
            height="1080"
            viewBox="0 0 1920 1080"
            style={{ position: "absolute", inset: 0 }}
          >
            <ArtDefs id={id} />
            <path
              d="M84 191H1836V956H84Z"
              fill="#BEA474"
              stroke="#82623F"
              strokeWidth="5"
            />
            <path
              d="M100 210H1820V935H100Z"
              fill={`url(#${id}-wood)`}
              opacity=".22"
            />
            <path
              d="M106 221H1814M106 915H1814"
              stroke="#E0C99A"
              strokeWidth="2"
            />
            <g
              transform={`translate(960 550) scale(${push}) translate(-960 -550)`}
            >
              <PhotoPair />
              <MemoryObjects time={t} />
              <g opacity={1 - release}>
                <path
                  d={`M722 ${tween(release, 0, 1, 750, 1000)}L740 622L774 614L761 ${tween(release, 0, 1, 750, 1000)}Z`}
                  fill="#76583B"
                  stroke="#C4A36B"
                  strokeWidth="3"
                />
                <g transform="translate(752 617) rotate(176) scale(1.5)">
                  <Hand id={id} />
                </g>
                <path
                  d={`M1170 ${tween(release, 0, 1, 755, 1000)}L1166 624L1135 615L1128 ${tween(release, 0, 1, 755, 1000)}Z`}
                  fill="#4B6D42"
                  stroke="#C4A36B"
                  strokeWidth="3"
                />
                <g transform="translate(1155 619) rotate(180) scale(1.5)">
                  <Hand id={id} />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id={`${id}-river`}>
                <ellipse
                  cx="1410"
                  cy="792"
                  rx={out * 2100}
                  ry={out * 1300 + 1}
                />
              </clipPath>
            </defs>
            <g clipPath={`url(#${id}-river)`}>
              <ScrollBackdrop expand={0} time={0} />
            </g>
            <path
              d="M1380 832Q1570 753 1820 822"
              fill="none"
              stroke="#89AFA3"
              strokeWidth={out * 35}
              opacity={1 - out}
            />
          </svg>
        </Act06Frame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
