import type { PropsWithChildren } from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import captions from "../../scenes/act05/captions.json";

export const Act05Frame = ({
  children,
  scene,
  label = "",
  labelOpacity = 1,
}: PropsWithChildren<{
  scene: keyof typeof captions;
  label?: string;
  labelOpacity?: number;
}>) => {
  const { fps } = useVideoConfig();
  const start = { Scene17: 0, Scene18: 15, Scene19: 30, Scene20: 45 }[scene];
  return (
    <ShadowStage formal>
      {children}
      {label ? (
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 77,
            color: "#2D1E1B",
            fontSize: 28,
            letterSpacing: 2,
            padding: "4px 14px 6px 0",
            background: "rgba(242,229,203,.94)",
            opacity: labelOpacity,
            display: "flex",
            gap: 18,
            alignItems: "center",
          }}
        >
          <span style={{ width: 6, height: 30, background: "#A15436" }} />
          {label}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 82,
          fontSize: 24,
          color: "#725A40",
          background: "rgba(242,229,203,.94)",
          padding: "4px 0 5px 10px",
        }}
      >
        人物与家庭故事为艺术虚构
      </div>
      <Dialogue formal captions={captions[scene]} />
      <Sequence
        name="Act05 original ambience · no recorded voices"
        durationInFrames={15 * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act05-foley.wav")}
          startFrom={start * fps}
          endAt={(start + 15) * fps}
          volume={0.8}
        />
      </Sequence>
    </ShadowStage>
  );
};
