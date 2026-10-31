import { useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { ArtDefs, ink, Rivet } from "../act01/art";
import { Villager } from "../act02/Villager";
import { Phone } from "../../scenes/act01/Scene03";
import { colors } from "../../shared/styleTokens";

export const LEAF =
  "M-80 45Q-85-60 40-65Q80-70 91-92Q112 22 20 61Q-29 82-80 45Z";
export const Leaf = () => (
  <g>
    <path d={LEAF} fill={colors.forest} stroke="#B6AC71" strokeWidth="3" />
    <path
      d="M-59 35L64-51M-24 10L-30-22M3-8L-2-43M7-11L40 1"
      fill="none"
      stroke="#D4C28D"
      strokeWidth="3"
    />
  </g>
);

export const PhoneView = ({
  x,
  y,
  scale = 0.5,
  angle = 0,
  view,
  route = false,
}: {
  x: number;
  y: number;
  scale?: number;
  angle?: number;
  view?: ReactNode;
  route?: boolean;
}) => (
  <g>
    <Phone x={x} y={y} scale={scale} angle={angle} reveal={0} />
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <rect x="-54" y="-128" width="108" height="169" fill="#E6DFC3" />
      {route ? (
        <g>
          <text y="-108" fontSize="13" fill={ink} textAnchor="middle">
            步行路线草图
          </text>
          <path
            d="M-38-12L-17-47L6-28L31-62M-36 11Q0-1 37 9"
            fill="none"
            stroke="#8BA18A"
            strokeWidth="3"
          />
        </g>
      ) : (
        <svg
          x="-54"
          y="-128"
          width="108"
          height="169"
          viewBox="650 270 1100 720"
          preserveAspectRatio="none"
        >
          {view}
        </svg>
      )}
      <path
        d="M-44-116H-30M-44-116V-102M44-116H30M44-116V-102M-44 28H-30M-44 28V14M44 28H30M44 28V14"
        fill="none"
        stroke="#EEE4BF"
        strokeWidth="2"
      />
    </g>
  </g>
);

export const ApronVillager = (props: ComponentProps<typeof Villager>) => (
  <g>
    <Villager {...props} />
    <g
      transform={`translate(${props.x} ${props.y}) scale(${props.scale ?? 0.65})`}
    >
      <g
        transform={
          props.facing === "left" ? "translate(300 0) scale(-1 1)" : ""
        }
      >
        <path
          d="M126 306H172L190 452Q150 467 104 449L119 324Z"
          fill="#D9C79E"
          stroke="#92754A"
          strokeWidth="2.5"
        />
        <path
          d="M127 307L139 269L159 270L173 308M113 368Q155 380 185 367"
          fill="none"
          stroke="#B69661"
          strokeWidth="4"
        />
        <path
          d="M130 385H171V422Q150 432 130 422Z"
          fill="#C0AE7F"
          stroke="#967D50"
          strokeWidth="2"
        />
      </g>
    </g>
  </g>
);

export const FamilyWalk = ({
  x,
  y,
  scale = 0.35,
  step = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  step?: number;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g transform={`translate(${x} ${y})`}>
      <Villager
        x={0}
        y={0}
        scale={scale}
        kind="farmer"
        upper={8}
        forearm={-25}
        walk={step}
      />
      <g
        transform={`translate(${scale * 300} ${scale * 370}) scale(${scale * 0.8})`}
      >
        <ArtDefs id={id} />
        <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
          <path d="M14 345L6 490H37L45 365L60 490H91L80 344Z" fill="#4A654B" />
          <path
            d="M6 482L38 483L42 506H-4Q-15 499 6 482ZM60 482L89 483L112 500Q114 508 60 506Z"
            fill="#3E3025"
          />
          <path d="M17 206Q45 192 72 208L89 345Q42 366 0 345Z" fill="#9A5840" />
          <path
            d="M25 216H65L75 335H13Z"
            fill={`url(#${id}-vine)`}
            opacity=".65"
          />
          <path
            d="M12 221L-2 301L-30 300L-16 220M79 225L100 294L87 306L63 235"
            fill="#718257"
          />
          <path
            d="M23 170L19 210L47 222L68 207L62 169Z"
            fill={`url(#${id}-skin)`}
          />
          <path
            d="M12 90Q48 64 80 87L93 112L91 128L111 141L99 148L99 164L87 177Q60 199 31 172L9 143Z"
            fill={`url(#${id}-skin)`}
          />
          <path
            d="M12 137Q-5 99 18 78Q65 55 89 96L68 97L52 85L32 112L26 144Z"
            fill="#30291E"
          />
          <path d="M74 119L89 118M86 157L97 158" strokeWidth="3" />
          <circle
            cx="72"
            cy="143"
            r="7"
            fill="#BA7138"
            stroke="none"
            opacity=".4"
          />
          <Rivet x={11} y={230} r={8} id={id} />
          <Rivet x={77} y={230} r={8} id={id} />
          <Rivet x={26} y={410} r={7} id={id} />
          <Rivet x={72} y={410} r={7} id={id} />
        </g>
      </g>
    </g>
  );
};

/** Shared closed view makes the phone-door cut independent of scene timing. */
export const DoorPanel = ({ open = 0 }: { open?: number }) => {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <ArtDefs id={id} />
      <path
        d="M0 0H1920V1080H0Z M600 200V950H1320V200Z"
        fillRule="evenodd"
        fill="#DCCBA7"
      />
      <path
        d="M564 172H1356V211H564ZM564 211H603V966H564ZM1317 211H1356V966H1317Z"
        fill={`url(#${id}-wood)`}
        stroke={ink}
        strokeWidth="5"
      />
      {[false, true].map((right) => (
        <g
          key={String(right)}
          transform={`translate(${right ? 1320 : 600} 204) scale(${(right ? -1 : 1) * (1 - 0.94 * open)} 1)`}
        >
          <rect
            width="360"
            height="746"
            fill={`url(#${id}-wood)`}
            stroke="#4B3828"
            strokeWidth="5"
          />
          <rect
            x="24"
            y="27"
            width="310"
            height="686"
            fill="none"
            stroke="#C6A777"
            strokeWidth="3"
          />
          <path
            d="M48 74H310V295H48ZM48 419H310V674H48Z"
            fill={`url(#${id}-vine)`}
            opacity=".38"
          />
          <path
            d="M54 342L181 216L307 342L180 470Z"
            fill="#BC9A60"
            stroke="#E0C48B"
            strokeWidth="3"
          />
          <g transform="translate(180 350) scale(.56)">
            <Leaf />
          </g>
          <circle
            cx="320"
            cy="398"
            r="14"
            fill="#B58946"
            stroke="#E4C88D"
            strokeWidth="4"
          />
        </g>
      ))}
      <path
        d="M555 953H1363V982H555Z"
        fill="#8F7754"
        stroke="#5D4934"
        strokeWidth="4"
      />
    </g>
  );
};

export const KeyCard = () => (
  <g>
    <rect
      x="-26"
      y="-17"
      width="52"
      height="34"
      rx="3"
      fill="#D3BE86"
      stroke="#6F573A"
      strokeWidth="2"
    />
    <circle cx="-12" r="5" fill="none" stroke="#8E713F" strokeWidth="2" />
    <path d="M-7 0H15M10 0V6M15 0V4" stroke="#8E713F" strokeWidth="2" />
  </g>
);
export const RouteSheet = () => (
  <g>
    <path
      d="M-29-35H28V34H-29Z"
      fill="#EBDDBB"
      stroke="#93794E"
      strokeWidth="2"
    />
    <path
      d="M-20 23L-3 4L-12-12L15-24M-20 25L21 22"
      fill="none"
      stroke="#608268"
      strokeWidth="3"
    />
  </g>
);
export const Platter = ({
  x = 0,
  y = 0,
  r = 70,
  food = 1,
}: {
  x?: number;
  y?: number;
  r?: number;
  food?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${r / 100})`}>
    <circle r="100" fill="#A68A51" stroke="#5E5137" strokeWidth="4" />
    <circle r="88" fill="#DBC598" stroke="#C8A969" strokeWidth="4" />
    <circle r="74" fill="none" stroke="#9F8856" strokeWidth="2" />
    <g opacity={food}>
      <path d="M-55 24Q-50-20-14-38Q-15 1 23 20Q-7 46-55 24Z" fill="#5E7C50" />
      <path d="M-10 30Q4-8 41-38Q71-9 45 31Z" fill="#B87E4A" />
      {[-20, 8, 35].map((v, i) => (
        <circle
          key={i}
          cx={v}
          cy={-15 + i * 15}
          r="16"
          fill="#D4B16B"
          stroke="#9C723E"
          strokeWidth="2"
        />
      ))}
    </g>
  </g>
);

export const Product = ({
  kind = 0,
  x = 0,
  y = 0,
  scale = 1,
}: {
  kind?: number;
  x?: number;
  y?: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M-44-66L42-66L49 56Q0 69-49 56Z"
      fill={["#A98557", "#526D48", "#C2A66D"][kind]}
      stroke="#624D32"
      strokeWidth="3"
    />
    <path d="M-42-56H41M-45 46H44" stroke="#E1C995" strokeWidth="3" />
    <rect
      x="-30"
      y="-32"
      width="60"
      height="66"
      fill="#E9D9B5"
      stroke="#BA9D64"
      strokeWidth="1.5"
    />
    <text textAnchor="middle" y="-3" fontSize="24" fill={ink} stroke="none">
      {["笋干", "茶叶", "稻米"][kind]}
    </text>
    <text textAnchor="middle" y="24" fontSize="13" fill="#80633E" stroke="none">
      余村
    </text>
  </g>
);
export const Basket = ({
  x = 0,
  y = 0,
  r = 150,
  products = 1,
}: {
  x?: number;
  y?: number;
  r?: number;
  products?: number;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <g transform={`translate(${x} ${y}) scale(${r / 100})`}>
      <defs>
        <pattern
          id={`${id}-weave`}
          width="17"
          height="17"
          patternUnits="userSpaceOnUse"
        >
          <rect width="17" height="17" fill="#A3824E" />
          <path d="M0 3H17M3 0V17" stroke="#D1B278" strokeWidth="5" />
          <path d="M0 15H17M15 0V17" stroke="#725731" strokeWidth="1.5" />
        </pattern>
      </defs>
      <circle
        r="100"
        fill={`url(#${id}-weave)`}
        stroke="#705334"
        strokeWidth="4"
      />
      <circle r="91" fill="none" stroke="#DBC48F" strokeWidth="4" />
      <g opacity={products}>
        <Product kind={0} x={-45} y={-5} scale={0.55} />
        <Product kind={1} x={4} y={-23} scale={0.55} />
        <Product kind={2} x={45} y={10} scale={0.52} />
      </g>
    </g>
  );
};
export const PaperBag = ({
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
      d="M-25-42V-65Q0-91 25-65V-42"
      fill="none"
      stroke="#8B6B42"
      strokeWidth="6"
    />
    <path
      d="M-57-43L56-43L63 83L-63 83Z"
      fill="#D2BB8A"
      stroke="#806341"
      strokeWidth="3"
    />
    <path
      d="M-46-35H45L50 70H-50Z"
      fill="none"
      stroke="#E8D6AC"
      strokeWidth="2"
    />
    <g transform="translate(0 1) scale(.23)">
      <Leaf />
    </g>
    <text x="0" y="54" fontSize="18" textAnchor="middle" fill={ink}>
      余村农产品
    </text>
  </g>
);
export const SalesShelf = () => (
  <g stroke="#634B33" strokeWidth="4">
    <path d="M1175 279H1775V820H1175Z" fill="#9D8055" />
    <path d="M1189 294H1761V805H1189Z" fill="#D9C49A" />
    <path d="M1180 469H1771V489H1180ZM1180 646H1771V666H1180Z" fill="#7A5C3C" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <Product kind={i} x={1280 + i * 172} y={410} scale={0.8} />
        <Product kind={i} x={1280 + i * 172} y={588} scale={0.8} />
      </g>
    ))}
  </g>
);
