import type { PropsWithChildren } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, FONT } from "./styleTokens";
import "./font";
/** Reused paper-stage technique; contains no former story marks or character references. */
export const ShadowStage = ({
  children,
  formal = false,
}: PropsWithChildren<{ formal?: boolean }>) => (
  <AbsoluteFill
    style={{ background: colors.paper, fontFamily: FONT, overflow: "hidden" }}
  >
    {children}
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 66% 36%,transparent 30%,rgba(49,93,69,.13) 100%)",
      }}
    />
    <Img
      src={staticFile("assets/backgrounds/paper-grain.svg")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.065,
        mixBlendMode: "multiply",
      }}
    />
    <svg
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <path
        d={`M40 ${formal ? 1040 : 1000}V42H1880V${formal ? 1040 : 1000}H40`}
        fill="none"
        stroke={colors.forest}
        strokeWidth={formal ? 3 : 8}
      />
      <path
        d={`M58 ${formal ? 1022 : 982}V60H1862V${formal ? 1022 : 982}H58`}
        fill="none"
        stroke={colors.gold}
        strokeWidth="1.5"
        opacity=".65"
      />
      {formal
        ? [false, true].map((right) => (
            <g
              key={String(right)}
              transform={right ? "translate(1920 0) scale(-1 1)" : ""}
              stroke={colors.forest}
              fill="none"
              strokeWidth="3"
            >
              <path d="M58 96H82V72H106V60M71 96V84H94V72M58 1000H82V1010H106V1022" />
            </g>
          ))
        : null}
    </svg>
  </AbsoluteFill>
);
