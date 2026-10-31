import type { PropsWithChildren } from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { ShadowStage } from "../../shared/ShadowStage";
import { Dialogue } from "../../shared/Dialogue";
import { ink } from "../act01/art";
import captions from "../../scenes/act04/captions.json";
const timing = {
  Scene13: [0, 12],
  Scene14: [12, 13],
  Scene15: [25, 12],
  Scene16: [37, 13],
};
export const Act04Frame = ({
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
        }}
      >
        人物与家庭故事为艺术虚构
      </div>
      <Dialogue formal captions={captions[scene]} />
      <Sequence
        name="Act04 original ambience · no recorded voices"
        durationInFrames={duration * fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("assets/audio/act04-foley.wav")}
          startFrom={start * fps}
          endAt={(start + duration) * fps}
          volume={0.8}
        />
      </Sequence>
    </ShadowStage>
  );
};
