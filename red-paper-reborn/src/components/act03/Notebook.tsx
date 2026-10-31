import { useId } from "react";
import { ArtDefs, ink } from "../act01/art";
import { handPoint } from "../act02/Villager";

export const RIDGE_POINTS = [
  [440, 754],
  [585, 615],
  [690, 698],
  [830, 532],
  [960, 650],
  [1100, 550],
  [1260, 711],
  [1375, 638],
  [1500, 754],
];
export const NOTE_POINTS = [
  [885, 749],
  [940, 725],
  [989, 739],
  [1038, 714],
  [1086, 733],
  [1134, 719],
  [1194, 743],
  [1246, 728],
  [1295, 749],
];
export const ridgePath = (progress = 0) =>
  RIDGE_POINTS.map(
    ([x, y], i) =>
      `${i ? "L" : "M"}${x + (NOTE_POINTS[i][0] - x) * progress} ${y + (NOTE_POINTS[i][1] - y) * progress}`,
  ).join("");

/** Inverse kinematics matches Puppet's existing 104/113-unit arm, without altering its source. */
export const armTo = ({
  x,
  y,
  scale,
  facing = "right",
  targetX,
  targetY,
}: {
  x: number;
  y: number;
  scale: number;
  facing?: "left" | "right";
  targetX: number;
  targetY: number;
}) => {
  const mirror = facing === "left" ? -1 : 1;
  let dx =
    ((targetX - (x + (facing === "left" ? 110 : 190) * scale)) / scale) *
    mirror;
  let dy = (targetY - y) / scale - 275;
  const length = Math.hypot(dx, dy);
  const limit = Math.min(215, Math.max(14, length));
  dx *= limit / length;
  dy *= limit / length;
  const f = -Math.acos(
    Math.max(
      -1,
      Math.min(
        1,
        (dx * dx + dy * dy - 104 * 104 - 113 * 113) / (2 * 104 * 113),
      ),
    ),
  );
  const u =
    Math.atan2(-dx, dy) -
    Math.atan2(113 * Math.sin(f), 104 + 113 * Math.cos(f));
  const pose = {
    x,
    y,
    scale,
    facing,
    upper: (u * 180) / Math.PI,
    forearm: (f * 180) / Math.PI,
  };
  return { ...pose, hand: handPoint(pose) };
};
export const Pen = ({
  x,
  y,
  angle = -27,
  length = 34,
}: {
  x: number;
  y: number;
  angle?: number;
  length?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path
      d={`M-3-43H3L3 ${length - 12}L0 ${length}L-3 ${length - 12}Z`}
      fill="#57452F"
      stroke="#C8AC76"
      strokeWidth="1.5"
    />
    <path
      d={`M-3 ${length - 12}L0 ${length}L3 ${length - 12}`}
      fill="#32271D"
    />
  </g>
);
export const Cup = ({
  x,
  y,
  ripple = 0,
}: {
  x: number;
  y: number;
  ripple?: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cy="40" rx="43" ry="8" fill={ink} opacity=".15" />
    <path
      d="M-31-14L-27 34Q0 45 27 34L32-14"
      fill="#BBC0A2"
      stroke="#596C55"
      strokeWidth="3"
    />
    <path
      d="M31-5Q62-14 56 13Q52 30 30 21"
      fill="none"
      stroke="#687A5E"
      strokeWidth="7"
    />
    <ellipse
      cy="-14"
      rx="32"
      ry="10"
      fill="#758F7C"
      stroke="#D7CFAB"
      strokeWidth="3"
    />
    <ellipse
      cy="-14"
      rx={6 + 20 * ripple}
      ry={2 + 6 * ripple}
      fill="none"
      stroke="#E5D7B3"
      strokeWidth="1.5"
      opacity={ripple}
    />
    <path
      d="M-18 6Q-5-2 8 8T25 8"
      fill="none"
      stroke="#E8D8B5"
      strokeWidth="2"
    />
  </g>
);

export const Notebook = ({
  open = 1,
  strike = 0,
  rewrite = 0,
  icons = 0,
  line = true,
}: {
  open?: number;
  strike?: number;
  rewrite?: number;
  icons?: number;
  line?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <ArtDefs id={id} />
      <defs>
        <clipPath id={`${id}-write`}>
          <rect x="1021" y="651" width={85 * rewrite} height="49" />
        </clipPath>
      </defs>
      <path
        d="M850 555L1090 550L1330 555L1333 802L1090 795L847 802Z"
        fill="#AA8A53"
        stroke="#6D563A"
        strokeWidth="3"
      />
      <path
        d="M858 563L1087 559L1090 783L858 790ZM1094 560L1320 563V790L1094 783Z"
        fill="#F0E3C6"
        stroke="#B49A6C"
        strokeWidth="1.5"
      />
      <path d="M1090 559V786" stroke="#C4AC7C" strokeWidth="2" opacity=".6" />
      {line ? (
        <path d={ridgePath(1)} fill="none" stroke="#6D8B68" strokeWidth="2.4" />
      ) : null}
      <g opacity={open}>
        <text x="885" y="625" fontSize="34" fill={ink} letterSpacing="0">
          家乡如何出圈
        </text>
        <path
          d={`M1019 614L${1019 + 74 * strike} 628`}
          stroke="#A05234"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={strike > 0 ? 1 : 0}
        />
        <g opacity={rewrite > 0 ? 1 : 0}>
          <text x="885" y="687" fontSize="34" fill={ink}>
            家乡如何
          </text>
          <g clipPath={`url(#${id}-write)`}>
            <text x="1021" y="687" fontSize="35" fill="#315D45">
              走远
            </text>
          </g>
        </g>
        <g opacity={icons} transform={`translate(0 ${-12 + 12 * icons})`}>
          <path
            d="M942 748V702M942 728Q902 717 916 694Q930 680 944 696Q963 676 977 696Q988 719 949 726Z"
            fill="#64815C"
            stroke="#C7B986"
            strokeWidth="1.6"
          />
          <path
            d="M1200 742V688H1260V742Z"
            fill="#9E8258"
            stroke="#594B35"
            strokeWidth="2"
          />
          <path
            d="M1190 690L1230 670L1270 690M1210 687V739M1250 687V739"
            fill="none"
            stroke="#45634A"
            strokeWidth="5"
          />
          <path d="M1230 694V737" stroke="#D8BD88" strokeWidth="2" />
        </g>
      </g>
      <g
        transform={`translate(850 555) scale(${1 - open} 1)`}
        opacity={1 - open}
      >
        <path
          d="M0 0H480V247H0Z"
          fill="#B89D69"
          stroke="#6D563A"
          strokeWidth="3"
        />
        <path
          d="M13 13H467V234H13Z"
          fill="none"
          stroke="#E2C895"
          strokeWidth="2"
        />
        <text
          x="240"
          y="105"
          fontSize="43"
          textAnchor="middle"
          fill={ink}
          letterSpacing="12"
        >
          行记
        </text>
      </g>
      {line && open < 1 ? (
        <path
          d={ridgePath(1)}
          fill="none"
          stroke="#6D8B68"
          strokeWidth="2.4"
          opacity={1 - open}
        />
      ) : null}
    </g>
  );
};
