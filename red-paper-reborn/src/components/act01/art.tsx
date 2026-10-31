import { useId } from "react";
import { colors } from "../../shared/styleTokens";

export const ink = "#2D1E1B";
export const ochre = "#B58950";
export const rust = "#A14F32";
export const RIDGE =
  "M-80 635Q70 561 153 531L271 398Q314 371 348 403L431 470L563 304Q600 263 638 308L758 414L849 329Q894 297 932 350L1021 465L1145 375Q1194 341 1237 387L1342 504L1454 441Q1500 415 1540 465L1662 536L1840 511L2000 625V975H-80Z";
export const SCAR =
  "M407 491L558 326L611 353L588 408L642 427L611 475L674 493L641 538L709 569L673 627L772 675L724 720L391 733L326 664L369 594L337 554Z";

/** Shared repeat ornaments; original character PNGs remain untouched. */
export const ArtDefs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={`${id}-leather`} x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#A98248" />
      <stop offset=".28" stopColor="#735032" />
      <stop offset=".7" stopColor="#513823" />
      <stop offset="1" stopColor="#A47A3F" />
    </linearGradient>
    <linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#76803C" />
      <stop offset=".35" stopColor="#43653B" />
      <stop offset=".8" stopColor="#274B38" />
      <stop offset="1" stopColor="#75935C" />
    </linearGradient>
    <linearGradient id={`${id}-skin`}>
      <stop stopColor="#B67A35" />
      <stop offset=".5" stopColor="#E1B768" />
      <stop offset="1" stopColor="#BA863E" />
    </linearGradient>
    <radialGradient id={`${id}-brass`} cx=".35" cy=".3">
      <stop stopColor="#F7E1A2" />
      <stop offset=".3" stopColor="#D4A853" />
      <stop offset=".65" stopColor="#A77325" />
      <stop offset=".82" stopColor="#553714" />
      <stop offset="1" stopColor="#E2B65F" />
    </radialGradient>
    <pattern
      id={`${id}-vine`}
      width="37"
      height="51.5"
      patternUnits="userSpaceOnUse"
    >
      <g transform="scale(.5)">
        <g fill="#F2DEAD" opacity=".85">
          <path d="M36 105Q53 54 35-4H39Q58 56 40 105Z" />
          {[13, 39, 67, 91].map((y, i) => (
            <g key={y} transform={`translate(40 ${y})`}>
              <path
                d={`M0 0Q${-26 - (i % 2) * 8} -31 -30 -9Q-16 2 0 0ZM0-8Q29-40 31-16Q16-4 0-8Z`}
              />
            </g>
          ))}
        </g>
        <circle cx="9" cy="85" r="2" fill="#D1AB69" />
        <path d="M7 37l6-8m48 56l6-8" stroke="#E6C58B" strokeWidth="1" />
      </g>
    </pattern>
    <pattern
      id={`${id}-grain`}
      width="63"
      height="71"
      patternUnits="userSpaceOnUse"
    >
      <g stroke="#F1DDB0" strokeWidth=".65" opacity=".26">
        <path d="M4 8l8 2m14 13l3 8m20-17l-7 7M10 48l6 8m35 0l-9 3m-8-15l-4-5M0 69l9-5" />
      </g>
      <g fill="#241B13" opacity=".18">
        <circle cx="23" cy="15" r=".7" />
        <circle cx="53" cy="44" r=".8" />
        <circle cx="31" cy="65" r="1" />
      </g>
    </pattern>
    <pattern
      id={`${id}-wood`}
      width="170"
      height="43"
      patternUnits="userSpaceOnUse"
    >
      <rect width="170" height="43" fill="#735137" />
      <path
        d="M-5 8Q38 21 87 10T179 10M0 32Q58 21 100 31T175 32"
        stroke="#B28D5E"
        strokeWidth="1.5"
        opacity=".4"
      />
      <path d="M0 41H170" stroke="#3F2A20" strokeWidth="2" />
    </pattern>
  </defs>
);

export const Rivet = ({
  x,
  y,
  r = 7,
  id,
}: {
  x: number;
  y: number;
  r?: number;
  id: string;
}) => (
  <g>
    <circle cx={x + 1} cy={y + 2} r={r + 1} fill={ink} opacity=".5" />
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={`url(#${id}-brass)`}
      stroke="#E6C273"
      strokeWidth=".8"
    />
    <circle cx={x - 1} cy={y - 2} r={r * 0.25} fill="#FAE7B0" opacity=".8" />
  </g>
);

export const Cloud = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill="none"
    stroke={ochre}
    strokeWidth="3"
    opacity=".44"
  >
    <path d="M-90 24H95Q115 12 95 7Q87-8 63 0Q57-27 35-18Q17-39-3-18Q-29-25-33-7Q-65-15-66 7Q-91 6-90 24Z" />
    <path d="M-63 22Q-40-8-17 7Q4 21 17 2Q29-13 46-1Q36 18 63 22M-89 32H132M-118 23H-95" />
  </g>
);

export const Bamboo = ({
  x,
  y,
  scale = 1,
  sway = 0,
  tone = colors.forest,
}: {
  x: number;
  y: number;
  scale?: number;
  sway?: number;
  tone?: string;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale}) rotate(${sway})`}
    stroke={tone}
    fill={tone}
  >
    {[0, 1, 2].map((i) => (
      <g
        key={i}
        transform={`translate(${i * 43} ${-i * 15}) rotate(${i * 7 - 9})`}
      >
        <path d="M0 35Q-15-120 7-340" strokeWidth="9" fill="none" />
        {[0, 1, 2, 3, 4].map((j) => (
          <g key={j} transform={`translate(0 ${-j * 66})`}>
            <path
              d="M0 0Q-55-68-105-59Q-67-21 0 0ZM0-12Q43-84 96-92Q58-27 0-12Z"
              strokeWidth="1"
            />
            <path d="M-8 11L9 7" stroke={colors.paper} strokeWidth="3" />
          </g>
        ))}
      </g>
    ))}
  </g>
);

export const MountainScene = ({
  era = "past",
  detail = 1,
  scar = 1,
  sway = 0,
  roadOpacity = 1,
}: {
  era?: "past" | "present";
  detail?: number;
  scar?: number;
  sway?: number;
  roadOpacity?: number;
}) => {
  const id = useId().replace(/:/g, "");
  const past = era === "past";
  return (
    <g>
      <defs>
        <pattern
          id={`${id}-stone`}
          width="65"
          height="39"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M2 35l17-22 16 6 12-16 16 35M19 13l5 20"
            stroke="#5C4638"
            strokeWidth="1.5"
            fill="none"
            opacity=".5"
          />
        </pattern>
      </defs>
      <circle cx="1262" cy="306" r="110" fill="#D7B368" opacity=".2" />
      <Cloud x={394} y={220} scale={1.3} />
      <Cloud x={1515} y={212} />
      <path
        d="M-40 590L106 416L252 475L408 271Q454 222 495 276L618 411L784 243Q823 205 862 244L1082 492L1230 284Q1279 223 1323 283L1539 482L1740 311L1970 591V960H-40Z"
        fill={past ? "#C9B99D" : "#B5CCC0"}
      />
      <path
        d={RIDGE}
        fill={past ? "#A58B68" : colors.jade}
        stroke={past ? "#7E664A" : "#5E8370"}
        strokeWidth="3"
      />
      <path
        d="M94 588L274 414L421 489M491 420L590 315L748 458M777 426L878 340L995 504M1096 452L1192 385L1333 525M1473 463L1559 526"
        fill="none"
        stroke="#E2CE9E"
        strokeWidth="3"
        opacity=".62"
      />
      {past ? (
        <g opacity={detail}>
          <path
            d={SCAR}
            fill="#D3B17E"
            stroke="#72553C"
            strokeWidth="4"
            opacity={scar}
          />
          <path d={SCAR} fill={`url(#${id}-stone)`} opacity={scar} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${389 + i * 23} ${543 + i * 37}l190 24-17 24-185-21`}
              fill={i % 2 ? "#B78F5D" : "#9B7752"}
              stroke="#D8B77B"
              strokeWidth="2"
            />
          ))}
          <path
            d="M267 733l39-33 53 9 17 31-61 13ZM694 723l36-23 37 15 15 24-67 4ZM790 744l22-24 30 4 18 30Z"
            fill="#775D44"
            stroke="#D2B17C"
            strokeWidth="3"
          />
        </g>
      ) : (
        <g>
          <path
            d="M-40 721Q127 588 340 694Q551 521 747 682Q960 563 1114 674Q1360 514 1530 671Q1712 575 1970 699V940H-40Z"
            fill={colors.forest}
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Bamboo
              key={i}
              x={230 + i * 184}
              y={704 + (i % 3) * 16}
              scale={0.38 + (i % 3) * 0.045}
              sway={sway + (i % 2)}
              tone={i % 2 ? "#8DA47D" : "#78976F"}
            />
          ))}
        </g>
      )}
      <path
        d="M-40 795Q271 728 594 797Q1031 886 1390 770Q1722 721 1960 799V1050H-40Z"
        fill={past ? "#8C775A" : "#789274"}
      />
      <path
        d="M-40 790Q396 697 710 753Q1050 816 1403 709Q1691 648 1960 722L1960 754Q1709 685 1412 743Q1048 853 695 792Q339 733-40 834Z"
        fill={past ? "#D2B283" : "#E1D9B5"}
        stroke={past ? "#5F4935" : "#66866D"}
        strokeWidth="4"
        opacity={roadOpacity}
      />
      <path
        d="M787 1080Q1130 840 1365 820Q1570 803 1945 858V1080H787Z"
        fill={past ? "#9BA49A" : colors.sky}
      />
      <path
        d="M1098 937Q1380 835 1695 877M1320 960Q1552 883 1840 907"
        fill="none"
        stroke={colors.paper}
        strokeWidth="4"
        opacity=".5"
      />
      {past ? <Bamboo x={1790} y={755} scale={1.05} tone="#67705A" /> : null}
      <Bamboo
        x={95}
        y={896}
        scale={0.62}
        sway={sway}
        tone={past ? "#67705A" : "#315D45"}
      />
    </g>
  );
};
