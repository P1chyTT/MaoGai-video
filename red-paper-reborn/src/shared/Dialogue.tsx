import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, colors, tween } from "./styleTokens";

export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: null;
  confidence: null;
};
export const Dialogue: React.FC<{ captions: Caption[]; formal?: boolean }> = ({
  captions,
  formal = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const line = captions.find((c) => ms >= c.startMs && ms < c.endMs);
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: formal ? 160 : 90,
          left: 0,
          right: 0,
          background: formal
            ? "linear-gradient(0deg,#F2E5CB 65%,rgba(242,229,203,0))"
            : "linear-gradient(0deg,#ebdcc0 55%,rgba(242,229,203,.94))",
        }}
      />
      {line ? (
        <div
          style={{
            position: "absolute",
            bottom: formal ? 78 : 25,
            left: formal ? 120 : 170,
            right: formal ? 120 : 170,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: formal ? 44 : 36,
            lineHeight: 1.35,
            letterSpacing: formal ? 2 : 3,
            color: formal ? "#2D1E1B" : colors.ink,
            textShadow: "0 1px 0 #fff3da",
            WebkitTextStroke: ".25px #2d1e1b",
            opacity: tween(ms, line.startMs, line.startMs + 150),
          }}
        >
          {line.text}
        </div>
      ) : null}
    </>
  );
};
