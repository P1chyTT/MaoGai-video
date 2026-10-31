import { useId } from "react";
import { ArtDefs, Bamboo, Cloud, RIDGE } from "../act01/art";
import { CREEK } from "../act03/Restoration";
import { FarmHouse } from "../act02/Props";
import { colors } from "../../shared/styleTokens";

/** Exactly the same ridge and creek coordinates as the Scene12 handoff. */
export const ValleyBackground = ({ time = 0 }: { time?: number }) => {
  const id = useId().replace(/:/g, "");
  return (
    <g transform="translate(-18 0)">
      <ArtDefs id={id} />
      <defs>
        <clipPath id={`${id}-water`}>
          <path d={CREEK} />
        </clipPath>
        <clipPath id={`${id}-grove`}>
          <path d={RIDGE} />
        </clipPath>
      </defs>
      <Cloud x={350} y={231} />
      <Cloud x={1550} y={215} scale={0.85} />
      <path
        d="M-80 590L180 389L321 459L539 265L762 449L935 312L1120 493L1360 304L1580 446L1770 329L2000 570V900H-80Z"
        fill="#BFCDB9"
      />
      <path d={RIDGE} fill={colors.jade} stroke="#5E8370" strokeWidth="3" />
      <path
        d="M94 588L274 414L421 489M491 420L590 315L748 458M777 426L878 340L995 504M1096 452L1192 385L1333 525M1473 463L1559 526"
        fill="none"
        stroke="#DDCBA1"
        strokeWidth="3"
      />
      <g clipPath={`url(#${id}-grove)`}>
        {[240, 390, 560, 720, 880, 1060, 1260, 1450, 1670, 1820].map((x, i) => (
          <Bamboo
            key={x}
            x={x}
            y={690 + (i % 3) * 23}
            scale={0.54 + (i % 3) * 0.13}
            tone={i % 2 ? "#52774E" : "#315D45"}
            sway={Math.sin(time * 0.7 + i) * 0.4}
          />
        ))}
      </g>
      <path
        d="M-80 754Q240 655 445 759Q820 657 1091 743Q1430 629 2000 741V1000H-80Z"
        fill="#587B52"
      />
      <g transform="translate(355 257) scale(.42)">
        <FarmHouse />
      </g>
      <g transform="translate(245 301) scale(.37)">
        <FarmHouse />
      </g>
      <path d={CREEK} fill="#83ABA2" stroke="#D4D2AC" strokeWidth="6" />
      <g clipPath={`url(#${id}-water)`} opacity=".16">
        <g transform="translate(0 910) scale(1 -.12)">
          <path d={RIDGE} fill="#315D45" />
        </g>
        <path d="M1274 837L1350 821L1434 839L1434 864H1274Z" fill="#D7CA9F" />
      </g>
      <path
        d={`M90 ${842 + Math.sin(time * 0.8) * 3}Q620 ${795 + Math.sin(time * 0.8 + 1) * 3} 1030 860`}
        fill="none"
        stroke="#DADCC0"
        strokeWidth="3"
      />
      <path
        d={`M1130 ${850 + Math.sin(time * 0.8 + Math.PI) * 3}Q1480 780 1890 846`}
        fill="none"
        stroke="#DADCC0"
        strokeWidth="3"
      />
      <path
        d="M-40 787Q280 696 600 767Q935 840 1210 759Q1510 673 1950 787"
        fill="none"
        stroke="#D4BE8F"
        strokeWidth="30"
      />
      <path
        d="M-40 946Q530 876 1030 934Q1530 989 1970 916V1080H-40Z"
        fill="#B9A47D"
      />
      <path
        d="M690 1030L770 887Q920 821 1320 830L1450 858L1590 1030Z"
        fill="#B9A47D"
        stroke="#D8C391"
        strokeWidth="4"
      />
    </g>
  );
};
