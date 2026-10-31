import type { PropsWithChildren } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { tween } from "../shared/styleTokens";
type Props = PropsWithChildren<{
  fromScale?: number;
  toScale?: number;
  fromX?: number;
  toX?: number;
  duration?: number;
  delay?: number;
  origin?: string;
}>;
export const CameraLayer = ({
  children,
  fromScale = 1,
  toScale = 1.035,
  fromX = 0,
  toX = -16,
  duration = 4,
  delay = 0,
  origin = "50% 65%",
}: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        scale: tween(
          frame,
          delay * fps,
          (delay + duration) * fps,
          fromScale,
          toScale,
        ),
        translate: `${tween(frame, delay * fps, (delay + duration) * fps, fromX, toX)}px 0`,
        transformOrigin: origin,
      }}
    >
      {children}
    </div>
  );
};
