import type { PropsWithChildren } from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import captions from "../../scenes/act01/captions.json";
import { ink } from "./art";

export const SceneFrame = ({
  children,
  scene,
  label,
  fiction = true,
  labelOpacity = 1,
}: PropsWithChildren<{
  scene: keyof typeof captions;
  label: string;
  fiction?: boolean;
  labelOpacity?: number;
}>) => {
  const { fps } = useVideoConfig();
  const offset = Number(scene.slice(-2)) - 1;
  return (
    <ShadowStage formal>
      {children}
      {label ? (
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 77,
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: ink,
            opacity: labelOpacity,
            background: "rgba(242,229,203,.94)",
            padding: "4px 10px 5px 0",
          }}
        >
          <div style={{ width: 6, height: 30, background: "#A15436" }} />
          <div style={{ fontSize: 28, letterSpacing: 2 }}>{label}</div>
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
            letterSpacing: 1,
            background: "rgba(242,229,203,.94)",
            padding: "4px 0 5px 10px",
          }}
        >
          {scene === "Scene03"
            ? "人物故事为艺术虚构"
            : "人物与家庭故事为艺术虚构"}
        </div>
      ) : null}
      <Dialogue formal captions={captions[scene]} />
      <Sequence
        name="Original foley · no recorded dialogue"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act01-foley.wav")}
          startFrom={offset * 10 * fps}
          endAt={(offset + 1) * 10 * fps}
          volume={0.7}
        />
      </Sequence>
    </ShadowStage>
  );
};
