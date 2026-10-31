import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act03Frame } from "../../components/act03/Act03Frame";
import {
  DateCard,
  MeetingExterior,
  ZhejiangLocator,
} from "../../components/act03/History";
import { Puppet } from "../../components/act01/Puppet";
import { FarmSign } from "../../components/act02/Props";
import { Pen } from "../../components/act03/Notebook";
import { handPoint } from "../../components/act02/Villager";
import { colors, tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";

export const Scene09 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const unfold = tween(t, 0, 0.6);
  const last = tween(t, 11.4, 12);
  const cardX = tween(t, 5.2, 6, 1040, 310) + (160 - 310) * last;
  const writer = handPoint({
    x: 301,
    y: 596,
    scale: 0.27,
    upper: -43 + Math.sin(t * 1.7) * 2,
    forearm: -73,
  });
  return (
    <Act03Frame
      scene="Scene09"
      label="2005年8月15日｜习近平同志在余村考察"
      labelOpacity={tween(t, 3, 3.3) * (1 - last)}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g opacity={1 - unfold}>
          <FarmSign x={1248} y={490} scale={1.02} />
        </g>
        <g opacity={unfold * (1 - last)}>
          <path
            d={`M${1106 - 926 * unfold} ${445 - 245 * unfold}H${1390 + 350 * unfold}V${535 + 325 * unfold}H${1106 - 926 * unfold}Z`}
            fill={colors.paper}
            stroke="#B89B64"
            strokeWidth="2"
          />
          <g opacity={1 - tween(t, 2.8, 3.4)}>
            <ZhejiangLocator time={t} />
          </g>
        </g>
        <g opacity={tween(t, 3, 3.4) * (1 - tween(t, 5.2, 5.8))}>
          <text x="310" y="395" fontSize="41" fill={ink}>
            2003—2005年
          </text>
          <text x="310" y="448" fontSize="32" fill="#796244">
            关停与探索
          </text>
          <path
            d="M310 498H1100"
            fill="none"
            stroke="#C79540"
            strokeWidth="4"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(t, 3.2, 4.8)}
          />
          <circle cx="310" cy="498" r="7" fill="#8A6849" />
        </g>
        <DateCard
          x={cardX}
          y={300 - 115 * last}
          compact={last}
          opacity={tween(t, 3.9, 4.4)}
        />
        <g opacity={tween(t, 6.5, 7.2) * (1 - last)}>
          <MeetingExterior x={1085} y={340} scale={0.9} />
        </g>
        <g opacity={tween(t, 7, 7.5) * (1 - last)}>
          <path d="M134 844H780" stroke="#BAA374" strokeWidth="2" />
          <Puppet
            x={175}
            y={596}
            scale={0.27}
            variant="elder"
            upper={-4}
            forearm={-10}
          />
          <Puppet
            x={301}
            y={596}
            scale={0.27}
            variant="xiaohe"
            upper={-43 + Math.sin(t * 1.7) * 2}
            forearm={-73}
            head={4}
          />
          <path
            d="M358 701L395 696L402 740L364 744Z"
            fill="#E7D6B1"
            stroke="#8B704A"
            strokeWidth="2"
          />
          <Pen x={writer.x} y={writer.y} angle={25} />
          <text x="430" y="817" fontSize="23" fill="#7C6547">
            现实人物 · 观看与记录资料
          </text>
        </g>
        <text
          x="1698"
          y="838"
          textAnchor="end"
          fontSize="25"
          fill="#796244"
          opacity={tween(t, 3, 3.3) * (1 - last)}
        >
          资料依据 S3
        </text>
      </svg>
    </Act03Frame>
  );
};
