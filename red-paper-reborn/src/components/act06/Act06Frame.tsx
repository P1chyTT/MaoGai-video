import type { PropsWithChildren } from "react";
import {
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import { tween } from "../../shared/styleTokens";
import captions from "../../scenes/act06/captions.json";
export const Act06Frame = ({
  children,
  scene,
  label = "",
  labelOpacity = 1,
}: PropsWithChildren<{
  scene: keyof typeof captions;
  label?: string;
  labelOpacity?: number;
}>) => {
  const { fps } = useVideoConfig(),
    t = useCurrentFrame() / fps;
  const [start, duration] = {
    Scene21: [0, 12],
    Scene22: [12, 12],
    Scene23: [24, 13],
    Scene24: [37, 13],
  }[scene];
  const ending = scene === "Scene24" ? 1 - tween(t, 6.5, 6.9) : 1;
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
            alignItems: "center",
            gap: 18,
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
          opacity: ending,
        }}
      >
        人物与家庭故事为艺术虚构
      </div>
      <div style={{ opacity: ending }}>
        <Dialogue formal captions={captions[scene]} />
      </div>
      <Sequence
        name="Act06 original ambience · no recorded voices"
        durationInFrames={duration * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act06-foley.wav")}
          startFrom={start * fps}
          endAt={(start + duration) * fps}
          volume={0.8}
        />
      </Sequence>
    </ShadowStage>
  );
};
