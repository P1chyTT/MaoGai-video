import { useId } from "react";
import { ArtDefs, ink, Cloud } from "../act01/art";
import { tween, colors } from "../../shared/styleTokens";

/** Deliberately generalized location silhouette, not an administrative map. */
export const ZhejiangLocator = ({ time }: { time: number }) => {
  const p = tween(time, 0.2, 2.6);
  const labels = [
    ["浙江", 0.2],
    ["湖州", 0.65],
    ["安吉", 1.2],
    ["余村", 1.8],
  ] as const;
  return (
    <g>
      <g
        transform={`translate(${410 - p * 45} ${240 - p * 12}) scale(${1 + p * 0.13})`}
      >
        <path
          d="M90 14L162 35L199 25L240 54L268 44L288 79L250 103L276 130L253 160L283 189L262 217L238 233L231 275L202 288L203 330L169 348L140 394L104 383L94 345L55 331L46 295L20 283L35 243L12 217L35 186L25 152L55 137L44 99L69 70L60 38Z"
          fill="#CDC39D"
          stroke="#746443"
          strokeWidth="3"
        />
        <path
          d="M75 99Q150 170 168 275M43 215Q122 217 241 185"
          fill="none"
          stroke="#8DA08B"
          strokeWidth="7"
          opacity=".5"
        />
        {[0, 1, 2].map((i) => {
          const q = tween(time, 0.65 + i * 0.55, 1.1 + i * 0.55);
          return (
            <g key={i} opacity={q}>
              <circle
                cx={112 - i * 10}
                cy={61 + i * 13}
                r={24 - q * 14 - i * 2}
                fill="none"
                stroke={i === 2 ? "#A15436" : "#7F754B"}
                strokeWidth="2"
              />
              <circle cx={112 - i * 10} cy={61 + i * 13} r="4" fill="#A15436" />
            </g>
          );
        })}
        <path
          d="M-4 20V-12L-11 0M-4-12L3 0"
          stroke="#776544"
          strokeWidth="2"
          fill="none"
        />
        <text x="-4" y="-25" fontSize="22" textAnchor="middle" fill={ink}>
          北
        </text>
      </g>
      {labels.map(([label, start], i) => (
        <g
          key={label}
          opacity={tween(time, start, start + 0.3)}
          transform={`translate(1010 ${302 + i * 109})`}
        >
          <circle
            r={i === 3 ? 10 : 6}
            fill={i === 3 ? "#A15436" : colors.forest}
          />
          {i < 3 ? (
            <path
              d="M0 16V87"
              stroke="#B49861"
              strokeWidth="2"
              strokeDasharray="4 7"
            />
          ) : null}
          <text
            x="40"
            y="14"
            fontSize={i === 3 ? 50 : 40}
            fill={ink}
            letterSpacing="7"
          >
            {label}
          </text>
        </g>
      ))}
      <text x="600" y="790" fontSize="25" fill="#796446" textAnchor="middle">
        地理定位示意 · 不作精确行政边界
      </text>
    </g>
  );
};

export const DateCard = ({
  x,
  y,
  compact = 0,
  opacity = 1,
}: {
  x: number;
  y: number;
  compact?: number;
  opacity?: number;
}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect
      x="6"
      y="8"
      width="620"
      height={280 - 180 * compact}
      fill={ink}
      opacity=".12"
    />
    <path
      d={`M0 0L620 2L618 ${280 - 180 * compact}H0Z`}
      fill="#E9D9B7"
      stroke="#A68A53"
      strokeWidth="3"
    />
    <rect
      x="12"
      y="12"
      width="594"
      height={254 - 180 * compact}
      fill="none"
      stroke="#C3A66C"
      strokeWidth="1.5"
    />
    <text
      x="310"
      y={105 - 46 * compact}
      textAnchor="middle"
      fontSize={57 - 21 * compact}
      fill={ink}
      letterSpacing={3 - compact}
    >
      2005年8月15日{compact > 0.9 ? "｜余村" : ""}
    </text>
    <g opacity={1 - compact}>
      <path d="M90 139H530" stroke="#C79540" strokeWidth="2" />
      <text x="310" y="190" textAnchor="middle" fontSize="35" fill={ink}>
        习近平同志在余村考察
      </text>
      <text x="310" y="235" textAnchor="middle" fontSize="26" fill="#775E40">
        时任浙江省委书记
      </text>
    </g>
  </g>
);

export const MeetingExterior = ({
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
      <Cloud x={350} y={20} scale={0.5} />
      <path
        d="M0 130L270 24L540 130V340H0Z"
        fill="#DDCEAD"
        stroke="#7B6444"
        strokeWidth="4"
      />
      <path
        d="M-18 135L270 13L558 135L530 152L270 49L8 152Z"
        fill="#52624C"
        stroke="#4B4935"
        strokeWidth="4"
      />
      <path d="M30 164H509M32 177H510" stroke="#B89A64" strokeWidth="4" />
      {[35, 355].map((a) => (
        <g key={a}>
          <rect
            x={a}
            y="198"
            width="150"
            height="102"
            fill="#9BAA93"
            stroke="#866D47"
            strokeWidth="7"
          />
          <path
            d={`M${a + 50} 198V300M${a + 100} 198V300M${a} 249H${a + 150}`}
            stroke="#866D47"
            strokeWidth="4"
          />
        </g>
      ))}
      <path
        d="M222 340V186H316V340"
        fill={`url(#${id}-wood)`}
        stroke="#7A6241"
        strokeWidth="4"
      />
      <path d="M269 189V336" stroke="#C1A370" strokeWidth="2" />
      <path
        d="M-20 341H558L579 362H-40Z"
        fill="#A38D67"
        stroke="#7B674A"
        strokeWidth="3"
      />
      <text x="270" y="418" textAnchor="middle" fontSize="29" fill={ink}>
        村会议室外观示意
      </text>
      <text x="270" y="460" textAnchor="middle" fontSize="23" fill="#80694B">
        非历史现场复原
      </text>
    </g>
  );
};
