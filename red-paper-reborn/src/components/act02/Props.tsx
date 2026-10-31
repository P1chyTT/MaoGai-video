import { useId } from "react";
import { ArtDefs, Bamboo, ink, MountainScene, Cloud } from "../act01/art";
import { OldHouseStage, OldTable, OldPrint } from "../act01/StageProps";
import { Puppet, WorkHat } from "../act01/Puppet";
import { Phone } from "../../scenes/act01/Scene03";
import { tween } from "../../shared/styleTokens";
import { handPoint } from "./Villager";

export const DROP =
  "M0-70C-10-48-44-13-44 15A44 44 0 0 0 44 15C44-13 10-48 0-70Z";
export const ToolBag = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ArtDefs id={id} />
      <path
        d="M-35 32V4Q0-27 35 4V32"
        stroke="#523B28"
        strokeWidth="11"
        fill="none"
      />
      <path
        d="M-34 28V6Q0-17 34 6V28"
        stroke="#BC9861"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M-86 28Q0 13 86 28L102 126Q0 146-101 126Z"
        fill={`url(#${id}-leather)`}
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M-85 29L-71 58H73L86 29"
        fill="#A38353"
        stroke="#D1AF75"
        strokeWidth="2"
      />
      <path
        d="M-62 65V119H-15V65ZM18 65V119H65V65Z"
        fill="#705038"
        stroke="#BC9B62"
        strokeWidth="2"
      />
      <path
        d="M-74 35L-86 119M76 35L87 118"
        stroke="#D7BA86"
        strokeWidth="2"
        strokeDasharray="3 5"
      />
      <path
        d="M-8 48H8V77H-8Z"
        fill="#C2A465"
        stroke="#533C27"
        strokeWidth="2"
      />
      <circle cy="67" r="3" fill="#493421" />
      <path d="M-45 77l25 0m42 0h28" stroke="#C8AD79" strokeWidth="1.5" />
    </g>
  );
};

export const Ledger = ({
  x,
  y,
  open = 0,
}: {
  x: number;
  y: number;
  open?: number;
}) => (
  <g transform={`translate(${x} ${y}) skewX(-15) scale(1 .6)`}>
    <rect x="7" y="8" width="259" height="169" fill={ink} opacity=".15" />
    <rect
      width="260"
      height="165"
      fill="#7B5C3D"
      stroke="#3F3024"
      strokeWidth="3"
    />
    <rect x="13" y="12" width="235" height="139" fill="#DECDAD" />
    <path d="M130 12V152" stroke="#A98B5D" strokeWidth="3" />
    <g opacity={open}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M28 ${45 + i * 20}H113M146 ${45 + i * 20}H231`}
          stroke="#C6B490"
          strokeWidth="1"
        />
      ))}
    </g>
    <g transform={`translate(${130 * open} 0) scale(${1 - open * 0.92} 1)`}>
      <rect
        width="260"
        height="165"
        fill="#A28A60"
        stroke="#5B4530"
        strokeWidth="3"
      />
      <rect
        x="20"
        y="16"
        width="220"
        height="130"
        fill="none"
        stroke="#D1B783"
        strokeWidth="2"
      />
      <text
        x="130"
        y="98"
        textAnchor="middle"
        fill="#392B20"
        fontSize="38"
        letterSpacing="7"
      >
        生活账
      </text>
    </g>
    {open > 0.8 ? (
      <text
        x="-30"
        y="102"
        transform="rotate(-90 -30 102)"
        fill="#6A5135"
        fontSize="25"
      >
        生活账
      </text>
    ) : null}
  </g>
);

/** Time is relative to Scene06; negative values are the tail of Scene05. */
export const bagDropY = (time: number) => tween(time, -0.7, 0.55, 345, 526);
export const PastDesk = ({
  time,
  bag = true,
}: {
  time: number;
  bag?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <ArtDefs id={id} />
      <OldHouseStage era="past" dust={0.35} shutter={0.45} />
      <Puppet
        x={478}
        y={205}
        scale={0.82}
        variant="middle"
        hat={false}
        smile={false}
        head={tween(time, 0.6, 2.1, 1, 5)}
        upper={tween(time, 0.6, 2.3, -30, -22)}
        forearm={tween(time, 0.6, 2.3, -35, -20)}
        backUpper={8}
      />
      <OldTable />
      <Ledger x={1047} y={615} open={tween(time, 1.5, 2.6)} />
      <g
        transform={`translate(${tween(time, 0.2, 1.8, 478, 652)} ${tween(time, 0.2, 1.8, 205, 552)}) scale(${tween(time, 0.2, 1.8, 0.82, 0.52)})`}
      >
        <WorkHat id={id} />
      </g>
      {bag ? <ToolBag x={840} y={bagDropY(time)} scale={0.85} /> : null}
    </g>
  );
};

export const CurrentRoom = ({ time }: { time: number }) => {
  const lower = tween(time, 0.2, 2.5);
  const upper = -21 + 29 * lower;
  const forearm = -72 + 67 * lower;
  const p = handPoint({
    x: 1280,
    y: 205,
    scale: 0.82,
    upper,
    forearm,
    facing: "left",
  });
  return (
    <g>
      <OldHouseStage sway={Math.sin(time * 0.4) * 0.5} />
      <Puppet
        x={478}
        y={205}
        scale={0.82}
        variant="elder"
        hat={false}
        smile={false}
        head={tween(time, 2.9, 4, -3, -5)}
        upper={tween(time, 2.9, 4, -18, -62)}
        forearm={tween(time, 2.9, 4, -70, -20)}
      />
      <Puppet
        x={1280}
        y={205}
        scale={0.82}
        variant="xiaohe"
        facing="left"
        upper={upper}
        forearm={forearm}
        smile={false}
        head={tween(time, 0.3, 2, 3, -2)}
        backUpper={-2}
        backForearm={-47}
        armLayer="body"
      />
      <OldTable />
      <g transform="translate(843 616) skewX(-24) scale(1 .29)">
        <OldPrint x={0} y={0} width={278} height={170} />
      </g>
      <Phone
        x={p.x - 31}
        y={p.y - 8 + 92 * lower}
        scale={0.59}
        angle={-10 + 15 * lower}
      />
      <Puppet
        x={1280}
        y={205}
        scale={0.82}
        variant="xiaohe"
        facing="left"
        upper={upper}
        forearm={forearm}
        armLayer="front"
      />
    </g>
  );
};

export const Gear = ({
  x,
  y,
  angle,
  scale = 1,
}: {
  x: number;
  y: number;
  angle: number;
  scale?: number;
}) => {
  const points = Array.from({ length: 48 }, (_, i) => {
    const r = i % 4 < 2 ? 58 : 48;
    return `${Math.cos((i * Math.PI) / 24) * r},${Math.sin((i * Math.PI) / 24) * r}`;
  }).join(" ");
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) rotate(${angle})`}
      stroke={ink}
      strokeWidth="3"
      fill="#8B7757"
    >
      <polygon points={points} />
      <circle r="32" fill="#E4D5B8" stroke="#B69862" strokeWidth="4" />
      <path
        d="M-30 0H30M0-30V30M-21-21L21 21M-21 21L21-21"
        stroke="#806E51"
        strokeWidth="6"
      />
      <circle r="10" fill="#C1A05D" />
    </g>
  );
};

export const FactoryGate = ({ closed = 1 }: { closed?: number }) => (
  <g transform="translate(1070 329)" stroke={ink} strokeWidth="4">
    <path d="M-38 0H0V450H-38ZM577 0H615V450H577Z" fill="#8A7051" />
    <path d="M-51-17H12V5H-51ZM564-17H628V5H564Z" fill="#B29970" />
    <g transform={`translate(${-260 * (1 - closed)} 0)`}>
      <rect x="1" y="68" width="285" height="358" fill="#5F5948" />
      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
        <path
          key={n}
          d={`M${20 + n * 40} 76V415`}
          stroke="#B39C6F"
          strokeWidth="3"
        />
      ))}
    </g>
    <g transform={`translate(${260 * (1 - closed)} 0)`}>
      <rect x="287" y="68" width="285" height="358" fill="#5F5948" />
      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
        <path
          key={n}
          d={`M${306 + n * 40} 76V415`}
          stroke="#B39C6F"
          strokeWidth="3"
        />
      ))}
    </g>
    <path d="M284 82V426" stroke="#C3A365" strokeWidth="7" />
  </g>
);

export const Spade = ({ angle = 0 }: { angle?: number }) => (
  <g transform={`rotate(${angle})`} stroke={ink} strokeWidth="3">
    <path
      d="M-10-63H10V-40H-10Z"
      fill="none"
      stroke="#8A6849"
      strokeWidth="7"
    />
    <path d="M0-40V174" stroke="#8A6849" strokeWidth="9" />
    <path d="M-28 157H28L24 209Q0 239-24 209Z" fill="#6E6D54" />
    <path d="M0 165V212" stroke="#C2B487" strokeWidth="2" />
  </g>
);
export const Broom = ({ angle = 0 }: { angle?: number }) => (
  <g transform={`rotate(${angle})`}>
    <path d="M0-58V162" stroke="#826642" strokeWidth="8" />
    <path
      d="M-11 144L-40 207Q0 221 40 207L11 144Z"
      fill="#B89B61"
      stroke="#715A36"
      strokeWidth="3"
    />
    {[-22, -11, 0, 11, 22].map((i) => (
      <path
        key={i}
        d={`M${i * 0.3} 159L${i} 209`}
        stroke="#E0C998"
        strokeWidth="2"
      />
    ))}
  </g>
);

export const Sapling = ({
  x,
  y,
  leaves = 0,
}: {
  x: number;
  y: number;
  leaves?: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d="M-49 6Q0-25 49 6L28 15H-33Z"
      fill="#8A6849"
      stroke="#654B32"
      strokeWidth="3"
    />
    <path d="M0 0Q-11-76 3-165" stroke="#8A6849" strokeWidth="7" fill="none" />
    <path
      d="M1-129Q-55-178-65-139Q-34-116 1-129ZM0-93Q48-137 62-107Q41-88 0-93Z"
      fill="#637D4F"
      stroke="#C4BB85"
      strokeWidth="2"
    />
    <path
      d="M-2-52Q-41-91-50-64Q-22-46-2-52ZM1-145Q26-189 40-173Q37-149 1-145Z"
      fill="#8EAA6A"
      opacity={leaves}
    />
  </g>
);

export const FarmSign = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-102-46V-79M102-46V-79" stroke="#7D6844" strokeWidth="4" />
    <path
      d="M-139-44H139V44H-139Z"
      fill="#815E3B"
      stroke={ink}
      strokeWidth="5"
    />
    <path
      d="M-130-35H130V35H-130Z"
      fill="none"
      stroke="#C2A05F"
      strokeWidth="2"
    />
    <path
      d="M-119-21H-103V-31M119-21H103V-31M-119 21H-103V31M119 21H103V31"
      fill="none"
      stroke="#E4C58B"
      strokeWidth="2"
    />
    <text
      y="15"
      textAnchor="middle"
      fontSize="40"
      fill="#F0D7A2"
      letterSpacing="9"
    >
      农家乐
    </text>
  </g>
);
export const Bench = ({
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
    fill="#806043"
    stroke={ink}
    strokeWidth="3"
  >
    <path d="M-90 0H90V15H-90Z" />
    <path d="M-72 14H-51L-63 110H-84ZM51 14H72L84 110H63Z" />
    <path d="M-65 50H65" stroke="#B08B55" strokeWidth="7" />
    <path d="M-84 2H84" stroke="#C1A06A" strokeWidth="2" />
  </g>
);

export const FarmHouse = () => (
  <g transform="translate(2150 298)" strokeLinejoin="round">
    <path
      d="M0 185H689V503H0Z"
      fill="#DCC9A5"
      stroke="#70563A"
      strokeWidth="5"
    />
    <path
      d="M-25 189L340 12L715 189L690 204L340 51L0 205Z"
      fill="#555C49"
      stroke={ink}
      strokeWidth="5"
    />
    <path
      d="M25 182L340 43L663 182"
      stroke="#BDBB8A"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M145 221H337V503H145Z"
      fill="#514737"
      stroke="#AF8F5E"
      strokeWidth="7"
    />
    <path
      d="M151 225L212 245V498H151Z"
      fill="#876D49"
      stroke="#352A20"
      strokeWidth="4"
    />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${399 + i * 78} 244)`}>
        <rect
          width="61"
          height="121"
          fill="#AAB9A0"
          stroke="#806341"
          strokeWidth="6"
        />
        <path
          d="M30 0V121M0 38H61M0 79H61M0 0L61 121M61 0L0 121"
          stroke="#806341"
          strokeWidth="3"
        />
      </g>
    ))}
    <path
      d="M-12 506H700V530H-12Z"
      fill="#A48E68"
      stroke="#725C40"
      strokeWidth="4"
    />
    <path
      d="M70 529H624L690 575H8Z"
      fill="#C2AD88"
      stroke="#8F7755"
      strokeWidth="3"
    />
  </g>
);

export const VillageVignette = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M-117 60L-114-31L-53-79L10-31V60ZM19 60V-20L71-61L120-20V60Z"
      fill="#E6D8B7"
      stroke="#77613F"
      strokeWidth="3"
    />
    <path
      d="M-128-31L-53-91L22-31M10-20L71-73L131-20"
      fill="none"
      stroke="#45654C"
      strokeWidth="9"
    />
    <path d="M-71 59V3H-39V59M53 60V5H84V60" fill="#8B7955" />
    <path
      d="M-101-14H-80V11H-101ZM-26-14H-5V11H-26Z"
      fill="#9EB5A0"
      stroke="#8A6849"
      strokeWidth="2"
    />
    <g fill="#6A6749" stroke="#E0C895" strokeWidth="1.5">
      <path d="M-45 89Q-37 60-26 60Q-13 62-7 90L-15 94L-14 123H-26L-30 99L-34 123H-46L-42 94Z" />
      <circle cx="-27" cy="45" r="13" />
      <path d="M7 94Q16 75 24 76Q36 77 44 96L37 101L40 127H29L25 107L21 127H10L13 100Z" />
      <circle cx="25" cy="64" r="10" />
      <path d="M-15 81L13 90" fill="none" stroke="#6A6749" strokeWidth="6" />
    </g>
    <path
      d="M-140 138Q-40 112 139 133"
      fill="none"
      stroke="#839F92"
      strokeWidth="12"
    />
    <path
      d="M-131 138Q-23 121 127 137"
      fill="none"
      stroke="#E4DBBA"
      strokeWidth="2"
    />
  </g>
);

export const RuralBackdrop = () => (
  <g>
    <Cloud x={600} y={249} />
    <Cloud x={2290} y={216} scale={1.4} />
    <path
      d="M-100 629L242 389L503 492L761 283L1013 488L1300 345L1585 510L1880 311L2154 517L2460 375L2760 493L3070 347V1030H-100Z"
      fill="#BEB397"
    />
    <path
      d="M-100 771Q241 498 561 658Q879 486 1165 639Q1451 515 1783 660Q2012 520 2348 632Q2688 525 3100 673V1050H-100Z"
      fill="#9C9C7A"
    />
    <path
      d="M-100 854Q470 712 920 798Q1390 876 1810 774Q2300 688 3100 797V1080H-100Z"
      fill="#B5A17B"
    />
    <path
      d="M-100 849Q327 727 795 823Q1272 921 1811 819Q2357 708 3100 864V1080H-100Z"
      fill="#91AEA3"
      stroke="#D5CEAC"
      strokeWidth="6"
    />
    <path
      d="M40 925Q550 800 1020 938M1200 979Q1590 868 1990 894M2160 951Q2520 871 2930 972"
      fill="none"
      stroke="#DFD5B5"
      strokeWidth="4"
    />
    <path
      d="M66 833Q563 711 993 757M1050 781Q1423 762 1777 767M1848 775Q2361 645 3070 772"
      fill="none"
      stroke="#D8C397"
      strokeWidth="35"
    />
    <Bamboo x={130} y={809} scale={0.6} tone="#697B56" />
    <Bamboo x={2850} y={837} scale={0.66} tone="#637B51" />
  </g>
);

export const FoldedLandscape = () => (
  <g>
    <rect
      x="1010"
      y="377"
      width="695"
      height="423"
      fill="#DDCBA5"
      stroke="#95794B"
      strokeWidth="3"
    />
    <svg
      x="1023"
      y="390"
      width="669"
      height="394"
      viewBox="80 180 1770 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <MountainScene era="present" />
    </svg>
    <path d="M1355 380V797" stroke="#A98E5C" strokeWidth="1" opacity=".35" />
    <text
      x="1355"
      y="447"
      fontSize="46"
      textAnchor="middle"
      fill={ink}
      letterSpacing="12"
    >
      以后
    </text>
  </g>
);
