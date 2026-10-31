import { useId } from "react";
import { ArtDefs, Bamboo, ink, MountainScene, ochre, rust } from "./art";
import { colors } from "../../shared/styleTokens";

export const Factory = () => (
  <g
    transform="translate(1330 458)"
    stroke={ink}
    strokeWidth="3"
    strokeLinejoin="round"
  >
    <path
      d="M92 93L105-110H142L155 97M223 96L230-62H261L272 96"
      fill="#8E6B50"
    />
    <path d="M105-110H142V-96H104ZM230-62H261V-49H229Z" fill="#4F4135" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path
        key={i}
        d={`M${105 - i} ${-72 + i * 26}H${144 + i}`}
        stroke="#C0A176"
        strokeWidth="2"
      />
    ))}
    <path
      d="M-15 85L62 32L125 83L188 39L247 88L305 55L359 93V240H-15Z"
      fill="#9E7952"
    />
    <path
      d="M-29 86L61 22L126 76L188 30L249 79L304 45L370 92"
      fill="none"
      stroke="#5E4733"
      strokeWidth="12"
    />
    <path d="M-10 224H360M-10 232H360" stroke="#D7B177" strokeWidth="4" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${18 + i * 66} 119)`}>
        <path
          d="M0 0H39V55H0Z"
          fill="#504A3D"
          stroke="#D4B581"
          strokeWidth="3"
        />
        <path d="M20 0V55M0 27H39" stroke="#AF8E5C" strokeWidth="2" />
      </g>
    ))}
    <path
      d="M139 240V173Q164 156 190 173V240"
      fill="#4E4439"
      stroke="#D4B581"
      strokeWidth="4"
    />
  </g>
);

export const Dust = ({
  amount = 1,
  drift = 0,
}: {
  amount?: number;
  drift?: number;
}) => (
  <g opacity={amount} fill="#887C66">
    <path
      transform={`translate(${drift} 0)`}
      d="M1282 288Q1328 223 1397 269Q1440 217 1508 260Q1564 222 1622 284Q1684 261 1751 326Q1807 307 1878 360L1878 431Q1771 381 1684 402Q1598 358 1507 381Q1413 326 1282 362Z"
      opacity=".26"
    />
    <path
      transform={`translate(${-drift * 0.4} 0)`}
      d="M1354 344Q1422 293 1508 334Q1593 297 1660 349Q1752 316 1856 407V455Q1730 405 1647 431Q1514 390 1354 408Z"
      opacity=".32"
    />
  </g>
);

export const MineCart = ({
  x,
  y = 743,
  turn = 0,
}: {
  x: number;
  y?: number;
  turn?: number;
}) => (
  <g transform={`translate(${x} ${y})`} stroke={ink} strokeWidth="3">
    <path
      d="M-80-72L-61-110L-35-104L-9-135L17-116L40-122L74-72Z"
      fill="#8A7051"
      stroke="#CFB389"
    />
    <path d="M-75-79H78L62-5H-61Z" fill="#73543A" />
    <path d="M-77-79H80V-64H-77ZM-65-21H65V-9H-65Z" fill="#B79253" />
    <path d="M-47-61V-23M0-61V-23M46-61V-23" stroke="#BA9555" strokeWidth="5" />
    {[-46, 46].map((v) => (
      <g key={v} transform={`translate(${v} 3) rotate(${turn})`}>
        <circle r="24" fill="#382B21" stroke="#B99658" strokeWidth="4" />
        <path
          d="M-17 0H17M0-17V17M-12-12L12 12M-12 12L12-12"
          stroke="#AC8B4F"
          strokeWidth="2"
        />
        <circle r="6" fill="#C6A25D" />
      </g>
    ))}
    <path d="M85-11H108" stroke="#59412C" strokeWidth="6" />
  </g>
);

export const CementBag = ({
  x,
  y,
  opacity = 1,
}: {
  x: number;
  y: number;
  opacity?: number;
}) => (
  <g
    transform={`translate(${x} ${y})`}
    opacity={opacity}
    stroke="#765A39"
    strokeWidth="3"
  >
    <path d="M-54-66L49-66L62 72Q0 85-62 72Z" fill="#D8C6A0" />
    <path d="M-55-61H51M-59 59H60" stroke="#A18151" strokeWidth="5" />
    <path d="M-37-25H37V30H-37Z" fill="none" stroke="#9B8056" />
    <text y="10" fontSize="27" textAnchor="middle" fill="#715436" stroke="none">
      水泥
    </text>
  </g>
);

export const OldPrint = ({
  x,
  y,
  width = 360,
  height = 220,
  back = false,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  back?: boolean;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="6" y="9" width={width} height={height} fill={ink} opacity=".18" />
    <path
      d={`M0 0L${width * 0.29} 2L${width * 0.63} 0L${width} 3L${width - 1} ${height}L${width * 0.6} ${height - 2}L0 ${height}Z`}
      fill="#C7A777"
      stroke="#725135"
      strokeWidth="3"
    />
    <rect
      x="10"
      y="10"
      width={width - 20}
      height={height - 20}
      fill={colors.paper}
    />
    {!back && width > 40 ? (
      <>
        <svg
          x="17"
          y="15"
          width={width - 34}
          height={height - 42}
          viewBox="160 210 1600 660"
          preserveAspectRatio="xMidYMid slice"
        >
          <MountainScene />
        </svg>
        <text
          x="17"
          y={height - 10}
          fontSize={Math.max(9, width / 34)}
          fill="#765A39"
        >
          往日余村 · 历史场景示意
        </text>
      </>
    ) : null}
    {back ? (
      <path
        d={`M20 24H${width - 20}M20 ${height - 24}H${width - 20}`}
        stroke="#CDB78B"
        strokeWidth="1"
      />
    ) : null}
  </g>
);

export const OldTable = () => {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <ArtDefs id={id} />
      <path d="M632 668H1390L1356 718H667Z" fill="#433126" opacity=".3" />
      <path
        d="M675 687H712L698 965H665ZM1312 686H1350L1360 965H1325Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="5"
      />
      <path
        d="M701 734H1325V774H701Z"
        fill="#735137"
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M734 743Q817 802 875 744M1144 744Q1208 802 1285 744"
        stroke={ochre}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M638 609L1318 609L1394 671H616Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="5"
      />
      <path
        d="M616 671H1394V691H616Z"
        fill="#5A3F2B"
        stroke={ink}
        strokeWidth="4"
      />
      <path d="M635 673H1375" stroke="#C19960" strokeWidth="3" />
      <path
        d="M699 628Q884 643 1113 623M750 654Q1017 639 1296 655"
        stroke="#C09C67"
        strokeWidth="1.5"
        fill="none"
        opacity=".6"
      />
    </g>
  );
};

/** Shared geometry makes the past/present window match exactly at the cut. */
export const OldHouseStage = ({
  era = "present",
  sway = 0,
  dust = 0,
  shutter = 0,
}: {
  era?: "past" | "present";
  sway?: number;
  dust?: number;
  shutter?: number;
}) => {
  const id = useId().replace(/:/g, "");
  const present = era === "present";
  return (
    <g>
      <ArtDefs id={id} />
      <defs>
        <clipPath id={`${id}-window`}>
          <rect x="1042" y="208" width="618" height="429" />
        </clipPath>
        <linearGradient id={`${id}-light`} x1="1" y1="0" x2="0" y2="1">
          <stop stopColor="#F5D998" stopOpacity=".2" />
          <stop offset="1" stopColor="#E8CF95" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 141H1920V970H0Z" fill={present ? "#E1D3B6" : "#D8C7A6"} />
      <path
        d="M196 139H233V927H196ZM1749 139H1788V927H1749Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M115 142H1818V184H115Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M255 214L343 213L359 229M279 240L337 239M1545 696L1515 715L1517 737M363 689L383 702L379 732"
        stroke="#AC9879"
        strokeWidth="1.5"
        fill="none"
      />
      <g clipPath={`url(#${id}-window)`}>
        <rect x="1042" y="208" width="618" height="429" fill={colors.paper} />
        <svg
          x="1042"
          y="208"
          width="618"
          height="429"
          viewBox="320 180 1420 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <MountainScene era={era} sway={sway} />
          {!present ? (
            <>
              <Factory />
              <Dust amount={dust} drift={sway * 8} />
            </>
          ) : null}
        </svg>
        {present ? <Bamboo x={1460} y={685} scale={1.12} sway={sway} /> : null}
        <rect
          x="1042"
          y="208"
          width={309 * shutter}
          height="429"
          fill="#DCCAA5"
          fillOpacity=".65"
          stroke="#6C5137"
          strokeWidth="7"
        />
        <rect
          x={1660 - 309 * shutter}
          y="208"
          width={309 * shutter}
          height="429"
          fill="#DCCAA5"
          fillOpacity=".65"
          stroke="#6C5137"
          strokeWidth="7"
        />
      </g>
      <rect
        x="1024"
        y="190"
        width="654"
        height="465"
        rx="1"
        stroke="#563F2E"
        strokeWidth="17"
        fill="none"
      />
      <rect
        x="1042"
        y="208"
        width="618"
        height="429"
        fill="none"
        stroke="#BD995E"
        strokeWidth="4"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g
          key={i}
          transform={`translate(${1066 + i * 123} 208)`}
          stroke="#79583A"
          fill="none"
          strokeWidth="5"
        >
          <path d="M0 0V64H98V0M0 64L49 105L98 64M49 105V183M0 247L49 208L98 247M49 208V183M0 247V337H98V247M0 337L49 386L98 337M49 386V429" />
        </g>
      ))}
      <path d="M1350 208V637" stroke="#61482F" strokeWidth="10" />
      <path
        d="M1009 647H1690V674H1009Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="5"
      />
      {dust > 0 ? (
        <path
          d="M1022 645Q1087 633 1167 645Q1252 636 1318 645Q1500 635 1678 644V651H1022Z"
          fill="#81765D"
          opacity={dust}
        />
      ) : null}
      <path
        d="M1658 218L1044 626L699 892H1297L1664 632Z"
        fill={`url(#${id}-light)`}
      />
      <path d="M236 815H1749L1920 980H0Z" fill="#BBA17A" />
      <path
        d="M428 831L256 968M774 831L714 968M1147 831L1223 968M1508 831L1713 968"
        stroke="#806446"
        strokeWidth="2"
        opacity=".5"
      />
      <g transform="translate(327 351)" fill="none" stroke="#8D724C">
        <path d="M0-42V139M-22-29L22 20M22-29L-22 20" strokeWidth="5" />
        <ellipse cy="126" rx="69" ry="17" fill="#9E8056" />
        <path d="M-68 124L-52 174H52L68 124" fill="#A1875F" strokeWidth="3" />
        {[-40, -20, 0, 20, 40].map((n) => (
          <path
            key={n}
            d={`M${n} 129L${n * 0.8} 171`}
            stroke="#D1B88B"
            strokeWidth="2"
          />
        ))}
      </g>
      <g
        transform="translate(1595 819)"
        fill={rust}
        stroke="#6A4930"
        strokeWidth="3"
      >
        <path d="M-25 0Q-49-45-30-67L-15-87H17L32-67Q53-43 27 0Z" />
        <path d="M-20-83H22V-94H-20Z" fill="#9B794A" />
      </g>
    </g>
  );
};
