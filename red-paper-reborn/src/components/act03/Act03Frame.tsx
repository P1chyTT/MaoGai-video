import type { PropsWithChildren } from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import { ink } from "../act01/art";
import captions from "../../scenes/act03/captions.json";

const timing = {
  Scene09: [0, 12],
  Scene10: [12, 13],
  Scene11: [25, 12],
  Scene12: [37, 13],
};
export const Act03Frame = ({
  children,
  scene,
  label = "",
  labelOpacity = 1,
  fiction = false,
}: PropsWithChildren<{
  scene: keyof typeof captions;
  label?: string;
  labelOpacity?: number;
  fiction?: boolean;
}>) => {
  const { fps } = useVideoConfig();
  const [start, duration] = timing[scene];
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
            padding: "4px 14px 6px 0",
            fontSize: 28,
            letterSpacing: 2,
            display: "flex",
            gap: 18,
            alignItems: "center",
          }}
        >
          <span style={{ width: 6, height: 30, background: "#A15436" }} />
          {label}
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
          }}
        >
          人物与家庭故事为艺术虚构
        </div>
      ) : null}
      <Dialogue formal captions={captions[scene]} />
      <Sequence
        name="Act03 original ambience · no recorded voices"
        durationInFrames={duration * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act03-foley.wav")}
          startFrom={start * fps}
          endAt={(start + duration) * fps}
          volume={0.8}
        />
      </Sequence>
    </ShadowStage>
  );
};
