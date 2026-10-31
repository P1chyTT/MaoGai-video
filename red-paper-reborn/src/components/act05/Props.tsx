import { useId } from "react";
import type { ReactNode } from "react";
import { ArtDefs, ink, MountainScene, RIDGE } from "../act01/art";
import { OldPrint } from "../act01/StageProps";
import { ValleyBackground } from "../act04/Valley";
import { colors, tween } from "../../shared/styleTokens";
import { Phone } from "../../scenes/act01/Scene03";

export const ROUTE = "M72 232Q109 167 159 196T257 157Q319 95 385 119T474 72";
export const RouteSketch = ({ progress = 1 }: { progress?: number }) => (
  <g>
    <path
      d="M18 245L96 139L159 175L254 58L344 153L436 82L516 203"
      fill="none"
      stroke="#9DA98A"
      strokeWidth="5"
    />
    <path
      d="M23 266Q165 218 294 254T519 233"
      fill="none"
      stroke="#7DA69A"
      strokeWidth="15"
    />
    <path
      d={ROUTE}
      fill="none"
      stroke={colors.gold}
      strokeWidth="5"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
    {[
      [72, 232],
      [257, 157],
      [474, 72],
    ].map(([x, y], i) => (
      <g key={i} opacity={tween(progress, i * 0.27, 0.18 + i * 0.27)}>
        <circle
          cx={x}
          cy={y}
          r="9"
          fill={colors.forest}
          stroke="#E9D8AF"
          strokeWidth="4"
        />
      </g>
    ))}
  </g>
);

export const PlanBook = ({
  time = 10,
  open = 1,
}: {
  time?: number;
  open?: number;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <ArtDefs id={id} />
      <path
        d="M-480-240L0-250L480-240L480 240L0 231L-480 240Z"
        fill="#A08050"
        stroke="#665033"
        strokeWidth="5"
      />
      <path
        d="M-464-225L-8-233V215L-464 224ZM8-233L464-225V224L8 215Z"
        fill="#F0E3C6"
        stroke="#C3A874"
        strokeWidth="2"
      />
      <path d="M0-228V217" stroke="#BCA476" strokeWidth="3" />
      <g opacity={open}>
        <text x="-422" y="-161" fontSize="42" fill={ink}>
          热门打卡
        </text>
        <path
          d="M-429-177L-250-153"
          stroke="#9B4735"
          strokeWidth="5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - tween(time, 2.1, 3.7)}
        />
        <text
          x="-422"
          y="-94"
          fontSize="42"
          fill={colors.forest}
          opacity={tween(time, 3.8, 4.35)}
        >
          山水与生活
        </text>
        {["山坡修复", "村民经营", "日常管护"].map((text, i) => {
          const p = tween(time, 4.3 + i * 1.5, 5.15 + i * 1.5);
          return (
            <g key={text}>
              <defs>
                <clipPath id={`${id}-item${i}`}>
                  <rect x="-420" y={-65 + i * 73} width={260 * p} height="65" />
                </clipPath>
              </defs>
              <text
                x="-415"
                y={-13 + i * 73}
                fontSize="37"
                fill={ink}
                clipPath={`url(#${id}-item${i})`}
              >
                {text}
              </text>
              <rect
                x="-176"
                y={-43 + i * 73}
                width="32"
                height="32"
                fill="none"
                stroke="#A88D58"
                strokeWidth="2"
              />
              <path
                d={`M-172 ${-27 + i * 73}L-163 ${-17 + i * 73}L-146 ${-38 + i * 73}`}
                fill="none"
                stroke={colors.forest}
                strokeWidth="4"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - tween(time, 5.1 + i * 1.5, 5.5 + i * 1.5)}
              />
            </g>
          );
        })}
        <g transform="translate(33 -150) scale(.8)">
          <RouteSketch progress={tween(time, 5.2, 8.7)} />
        </g>
        <g opacity={tween(time, 8.7, 9.45)}>
          <path
            d="M43 95H427V198H43Z"
            fill="#D9DDBB"
            stroke="#8D9A6E"
            strokeWidth="2"
          />
          <text
            x="235"
            y="138"
            textAnchor="middle"
            fontSize="29"
            fill={colors.forest}
          >
            绿色出游步行路线
          </text>
          <text
            x="235"
            y="177"
            textAnchor="middle"
            fontSize="25"
            fill="#736248"
          >
            课程创作示意
          </text>
        </g>
      </g>
      <g
        opacity={1 - open}
        transform={`translate(-480 -240) scale(${1 - open} 1)`}
      >
        <rect
          width="960"
          height="480"
          fill="#A88A59"
          stroke="#665033"
          strokeWidth="5"
        />
        <rect
          x="22"
          y="22"
          width="916"
          height="436"
          fill="none"
          stroke="#D9BF88"
          strokeWidth="3"
        />
        <text x="480" y="225" fontSize="66" textAnchor="middle" fill={ink}>
          行记
        </text>
        <text x="480" y="296" fontSize="35" textAnchor="middle" fill="#E5D2A5">
          山水与生活
        </text>
      </g>
    </g>
  );
};

export const Viewfinder = ({
  children,
  recording = false,
  opacity = 1,
}: {
  children?: ReactNode;
  recording?: boolean;
  opacity?: number;
}) => (
  <g opacity={opacity}>
    {children}
    <path
      d="M180 255V184H268M1652 184H1740V255M180 740V820H268M1652 820H1740V740"
      fill="none"
      stroke="#A89360"
      strokeWidth="5"
    />
    <g transform="translate(1632 222)">
      <circle r="8" fill={recording ? "#A54232" : "#B7B18D"} />
      <text x="20" y="8" fontSize="24" fill="#6C6042">
        课程拍摄
      </text>
    </g>
  </g>
);

/** Existing phone shell turned sideways; the active image is a centered 16:9 crop. */
export const FilmingPhone = ({
  x,
  y,
  scale = 1,
  view,
}: {
  x: number;
  y: number;
  scale?: number;
  view: ReactNode;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform="translate(-43.5 0)">
      <Phone x={0} y={0} angle={90} reveal={0} />
    </g>
    <rect x="-84.5" y="-54" width="169" height="108" fill="#302A23" />
    <svg
      x="-84.5"
      y="-47.53125"
      width="169"
      height="95.0625"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    >
      <rect width="1920" height="1080" fill={colors.paper} />
      {view}
    </svg>
  </g>
);

export const CollectionBag = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d="M-43-54Q0-28 43-54L59 52Q5 75-60 52Z"
      fill="#9EAA7A"
      stroke="#536A48"
      strokeWidth="4"
    />
    <ellipse
      cy="-53"
      rx="43"
      ry="12"
      fill="#60724D"
      stroke="#D3C797"
      strokeWidth="4"
    />
    <path
      d="M-35-52Q0-76 34-52M-35-35L-43 40M34-37L44 40"
      fill="none"
      stroke="#CBD3A6"
      strokeWidth="3"
    />
  </g>
);
export const MousePointer = ({
  x,
  y,
  down = false,
}: {
  x: number;
  y: number;
  down?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${down ? 0.88 : 1})`}>
    <path
      d="M0 0L0 35L10 25L19 43L27 39L17 21H32Z"
      fill="#EADDBA"
      stroke={ink}
      strokeWidth="2.5"
    />
  </g>
);
export const GreenTips = ({ time = 12 }: { time?: number }) => (
  <g>
    <path
      d="M0 0H480V303L0 300Z"
      fill="#E8DEC0"
      stroke="#A99C6C"
      strokeWidth="3"
    />
    <path d="M0 0H480V59H0Z" fill="#365D45" />
    <text x="26" y="41" fontSize="32" fill="#F0E1BB">
      绿色出游提示
    </text>
    {["沿既有步道行走", "垃圾随身带走", "不进入养护区域"].map((text, i) => (
      <g key={text} opacity={tween(time, 4.2 + i * 1.85, 4.7 + i * 1.85)}>
        <path
          d={`M24 ${96 + i * 75}L33 ${105 + i * 75}L48 ${84 + i * 75}`}
          fill="none"
          stroke={colors.forest}
          strokeWidth="4"
        />
        <text x="67" y={108 + i * 75} fontSize="32" fill={ink}>
          {text}
        </text>
      </g>
    ))}
  </g>
);

/** Crop the same world-coordinate ridge through paper: every contour meets the landscape at its paper edge. */
export const AlignedLandscape = ({ time = 0 }: { time?: number }) => (
  <g>
    <rect width="1920" height="1080" fill={colors.paper} />
    <g transform="translate(0 130)">
      <ValleyBackground time={time} />
    </g>
    <path
      d="M-40 861Q430 771 960 839T1960 831V1080H-40Z"
      fill="#B5A17C"
      stroke="#D8C391"
      strokeWidth="4"
    />
    <path
      d="M1130 889Q1440 804 1940 909V1080H1130Z"
      fill="#85ABA1"
      stroke="#D1CFAB"
      strokeWidth="5"
    />
    <path
      d="M1330 928Q1550 865 1850 947"
      fill="none"
      stroke="#D6DABC"
      strokeWidth="3"
    />
  </g>
);
export const PRINT = { x: 510, y: 400, width: 500, height: 260 };
export const MatchedOldPrint = ({ angle = 0 }: { angle?: number }) => (
  <g transform={`rotate(${angle} 548 562)`}>
    <OldPrint {...PRINT} />
    <svg
      x={527}
      y={415}
      width={466}
      height={218}
      viewBox="527 415 466 218"
      preserveAspectRatio="none"
    >
      <g transform="translate(-18 130)">
        <MountainScene era="past" />
      </g>
      <path
        d={RIDGE}
        transform="translate(-18 130)"
        fill="none"
        stroke="#815A3B"
        strokeWidth="3"
      />
    </svg>
  </g>
);
