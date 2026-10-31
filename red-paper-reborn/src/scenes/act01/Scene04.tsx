import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../../components/act01/SceneFrame";
import { ArtDefs, ink, MountainScene } from "../../components/act01/art";
import { Hand } from "../../components/act01/Puppet";
import { OldPrint } from "../../components/act01/StageProps";
import { PresentRoom } from "./Scene03";
import { colors, tween } from "../../shared/styleTokens";

export const Scene04 = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const id = useId().replace(/:/g, "");
  const compare = tween(t, 1.8, 3);
  const turn = tween(t, 7, 8.1);
  const back = t >= 8.1;
  const grow = tween(t, 8.1, 9.75);
  const paperWidth = back ? 24 + 2016 * grow : 810 * (1 - turn) + 24 * turn;
  const paperHeight = 690 + 430 * grow;
  const cx = back ? 960 : 555 + 405 * turn;
  const cy = 515 + 25 * grow;
  return (
    <SceneFrame scene="Scene04" label="" fiction={t < 9}>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <ArtDefs id={id} />
        <defs>
          <clipPath id={`${id}-left`}>
            <rect x="150" y="172" width="810" height="690" />
          </clipPath>
          <clipPath id={`${id}-right`}>
            <rect x="960" y="172" width="810" height="690" />
          </clipPath>
        </defs>
        <g opacity={1 - compare} transform="translate(-170 -210) scale(1.26)">
          <PresentRoom t={10 + t} question />
        </g>
        <g opacity={compare * (1 - tween(t, 7.7, 8.3))}>
          <rect
            x="146"
            y="168"
            width="1634"
            height="704"
            fill={ink}
            opacity=".14"
          />
          <rect
            x="140"
            y="162"
            width="1640"
            height="710"
            fill="#C6AA7C"
            stroke="#826444"
            strokeWidth="3"
          />
          <rect x="150" y="172" width="1620" height="690" fill={colors.paper} />
          <g clipPath={`url(#${id}-left)`}>
            <MountainScene />
          </g>
          <g clipPath={`url(#${id}-right)`}>
            <MountainScene era="present" sway={Math.sin(t) * 0.4} />
          </g>
          <path d="M960 173V860" stroke="#E7D7B6" strokeWidth="10" />
          <path d="M960 173V860" stroke="#A88450" strokeWidth="2" />
          <g fill="#654D34" fontSize="25">
            <text x="183" y="214">
              往日余村｜历史场景示意
            </text>
            <text x="1728" y="214" textAnchor="end">
              今天的山水
            </text>
          </g>
        </g>
        {t >= 7 ? (
          <g>
            <g
              transform={`translate(${cx - paperWidth / 2} ${cy - paperHeight / 2})`}
            >
              {back ? (
                <>
                  <rect
                    width={paperWidth}
                    height={paperHeight}
                    fill={colors.paper}
                    stroke="#B99B6C"
                    strokeWidth={3 * (1 - grow)}
                  />
                  <path
                    d={`M${paperWidth * 0.5} 10V${paperHeight - 10}`}
                    stroke="#D2BF9B"
                    strokeWidth="1.5"
                    opacity={0.35 * (1 - grow)}
                  />
                </>
              ) : (
                <OldPrint x={0} y={0} width={paperWidth} height={paperHeight} />
              )}
            </g>
            <g opacity={1 - tween(t, 9, 9.7)}>
              <g
                transform={`translate(${cx - paperWidth * 0.39} ${cy + paperHeight * 0.38}) rotate(205) scale(2.3)`}
              >
                <path
                  d="M-25-100H25V0H-25Z"
                  fill={`url(#${id}-leather)`}
                  stroke={ink}
                  strokeWidth="2"
                />
                <path d="M-25-25H25V-5H-25Z" fill="#B59966" />
                <Hand id={id} />
              </g>
              <g
                transform={`translate(${cx + paperWidth * 0.39} ${cy + paperHeight * 0.38}) rotate(155) scale(2.3)`}
              >
                <path
                  d="M-25-100H25V0H-25Z"
                  fill={`url(#${id}-leather)`}
                  stroke={ink}
                  strokeWidth="2"
                />
                <path d="M-25-25H25V-5H-25Z" fill="#B59966" />
                <Hand id={id} />
              </g>
            </g>
          </g>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 119,
          left: 200,
          right: 200,
          textAlign: "center",
          color: ink,
          fontSize: 36,
          letterSpacing: 5,
          opacity: tween(t, 3, 3.3) * (1 - tween(t, 8.7, 9)),
        }}
      >
        山的账，也是生活的账。
      </div>
    </SceneFrame>
  );
};
