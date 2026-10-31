import { LaborView } from "./Labor";
import { AlignedLandscape, GreenTips, MousePointer } from "./Props";
import { colors, tween } from "../../shared/styleTokens";
import { ink } from "../act01/art";

export const Editor = ({ time = 0 }: { time?: number }) => {
  const title =
    time < 1.7
      ? "最火打卡"
      : time < 2.5
        ? ""
        : Array.from("山水与生活")
            .slice(0, Math.ceil(tween(time, 2.5, 3.8, 0, 5)))
            .join("");
  const preview = tween(time, 9.6, 10.3);
  const i = Math.min(2, Math.floor(Math.max(0, time - 4.2) / 1.85));
  const drag = tween(time, 4.1 + i * 1.85, 4.65 + i * 1.85);
  const mouseX = time < 4 ? 880 : time < 9 ? 1360 - 265 * drag : 1545;
  const mouseY = time < 4 ? 285 : time < 9 ? 425 + i * 65 + 220 * drag : 260;
  return (
    <g>
      <path
        d="M560 170H1760V834H560Z"
        fill="#675539"
        stroke={ink}
        strokeWidth="6"
      />
      <path
        d="M579 190H1741V809H579Z"
        fill="#D8CCAD"
        stroke="#C1A77B"
        strokeWidth="3"
      />
      <path
        d="M1050 837H1260L1295 886H1018Z"
        fill="#8A7050"
        stroke="#634D35"
        strokeWidth="4"
      />
      <path d="M1000 886H1320V900H1000Z" fill="#634D35" />
      <text x="617" y="255" fontSize="37" fill={ink}>
        {title}
      </text>
      <path d="M616 277H1105" stroke="#B7A277" strokeWidth="2" />
      <g transform="translate(1460 216)">
        <rect width="213" height="56" rx="3" fill="#365D45" />
        <text x="106" y="39" textAnchor="middle" fontSize="31" fill="#F1E3C4">
          预览
        </text>
      </g>
      <g opacity={1 - preview}>
        <svg
          x="618"
          y="302"
          width="510"
          height="281"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <AlignedLandscape />
        </svg>
        {["山水风景", "村民劳动", "农产品经营"].map((text, n) => (
          <g key={text}>
            <rect
              x={623 + n * 172}
              y="468"
              width="160"
              height="114"
              fill="#E5D8B8"
              stroke="#A99268"
              strokeWidth="2"
            />
            <svg
              x={627 + n * 172}
              y="472"
              width="152"
              height="76"
              viewBox={n ? "620 250 1180 620" : "0 0 1920 1080"}
              preserveAspectRatio="xMidYMid slice"
            >
              {n ? (
                <LaborView kind={n === 1 ? 0 : 2} time={3} frame={false} />
              ) : (
                <AlignedLandscape />
              )}
            </svg>
            <text
              x={703 + n * 172}
              y="572"
              textAnchor="middle"
              fontSize="23"
              fill={ink}
            >
              {text}
            </text>
          </g>
        ))}
        <g transform="translate(1175 302) scale(1.05)">
          <GreenTips time={time} />
        </g>
        {["山水风景", "村民劳动", "农产品经营"].map((text, n) => (
          <g key={text}>
            <path
              d={`M618 ${625 + n * 56}H1695V${671 + n * 56}H618Z`}
              fill={n === 2 ? "#B9C0A0" : "#BEB08D"}
            />
            <text x="637" y={658 + n * 56} fontSize="24" fill="#54452F">
              {text}
            </text>
            <rect
              x={805 + n * 120}
              y={633 + n * 56}
              width="260"
              height="30"
              fill={["#8CA698", "#9B956F", "#789073"][n]}
            />
            <path
              d={`M${940 + 45 * tween(time, 9.7, 13.7)} ${627 + n * 56}V${669 + n * 56}`}
              stroke="#B4783F"
              strokeWidth="3"
            />
          </g>
        ))}
        <g
          opacity={tween(time, 4, 4.3) * (1 - tween(time, 8.7, 9.2))}
          transform={`translate(${mouseX - 340} ${mouseY - 90}) scale(.52)`}
        >
          <GreenTips time={4.8 + i * 1.85} />
        </g>
      </g>
      <g opacity={preview}>
        <svg
          x="616"
          y="298"
          width="610"
          height="450"
          viewBox="90 160 1740 810"
          preserveAspectRatio="xMidYMid slice"
        >
          <AlignedLandscape time={time} />
        </svg>
        <svg
          x="616"
          y="544"
          width="610"
          height="247"
          viewBox="650 200 1200 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <LaborView kind={time < 11.8 ? 0 : 2} time={3} frame={false} />
        </svg>
        <g transform="translate(1217 385) scale(1.025)">
          <GreenTips time={12} />
        </g>
        <text x="1245" y="750" fontSize="27" fill="#716142">
          课程创作示意
        </text>
      </g>
      <MousePointer x={mouseX} y={mouseY} down={time > 9.5 && time < 9.9} />
      <path
        d="M575 849H845L882 899H551Z"
        fill="#BBA47A"
        stroke="#735B3F"
        strokeWidth="3"
      />
      <path
        d="M599 864H825M590 877H836M621 852L607 889M664 852L656 889M707 852L705 889M751 852L758 889M795 852L811 889"
        fill="none"
        stroke="#846E4B"
        strokeWidth="2"
      />
      <circle cx="1687" cy="199" r="3" fill={colors.gold} />
    </g>
  );
};
