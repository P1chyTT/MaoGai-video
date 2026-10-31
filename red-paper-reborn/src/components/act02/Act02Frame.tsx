import type { PropsWithChildren } from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import { ink } from "../act01/art";
import captions from "../../scenes/act02/captions.json";

const timing = {
  Scene05: { start: 0, duration: 12 },
  Scene06: { start: 12, duration: 12 },
  Scene07: { start: 24, duration: 13 },
  Scene08: { start: 37, duration: 13 },
};
export const Act02Frame = ({
  children,
  scene,
  label = "",
  subline = "",
  labelOpacity = 1,
  fiction = true,
}: PropsWithChildren<{
  scene: keyof typeof captions;
  label?: string;
  subline?: string;
  labelOpacity?: number;
  fiction?: boolean;
}>) => {
  const { fps } = useVideoConfig();
  const shot = timing[scene];
  return (
    <ShadowStage formal>
      {children}
      {label ? (
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 77,
            opacity: labelOpacity,
            color: ink,
            background: "rgba(242,229,203,.94)",
            padding: "4px 12px 6px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 6, height: 30, background: "#A15436" }} />
            <span style={{ fontSize: 28, letterSpacing: 2 }}>{label}</span>
          </div>
          {subline ? (
            <div
              style={{
                fontSize: 24,
                marginLeft: 24,
                marginTop: 8,
                color: "#725A40",
              }}
            >
              {subline}
            </div>
          ) : null}
        </div>
      ) : null}
      {fiction ? (
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 82,
            fontSize: 24,
            color: "#725A40",
            background: "rgba(242,229,203,.94)",
            padding: "4px 0 5px 10px",
            letterSpacing: 1,
          }}
        >
          人物与家庭故事为艺术虚构
        </div>
      ) : null}
      <Dialogue formal captions={captions[scene]} />
      <Sequence
        name="Act02 original foley · no recorded voices"
        durationInFrames={shot.duration * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act02-foley.wav")}
          startFrom={shot.start * fps}
          endAt={(shot.start + shot.duration) * fps}
          volume={0.8}
        />
      </Sequence>
    </ShadowStage>
  );
};
