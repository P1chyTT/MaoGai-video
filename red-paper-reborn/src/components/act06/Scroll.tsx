import { useId } from "react";
import { ArtDefs, Bamboo, Cloud, ink } from "../act01/art";
import { ValleyBackground } from "../act04/Valley";
import { Villager } from "../act02/Villager";
import { FamilyWalk, Basket, ApronVillager } from "../act04/Props";
import { Spade, Sapling } from "../act02/Props";
import { colors, tween } from "../../shared/styleTokens";

export const SCROLL_RIVER =
  "M70 820Q350 742 660 793T1230 791Q1510 722 1850 806L1850 869Q1510 788 1230 858T660 858Q350 809 70 889Z";
const Fields = () => (
  <g stroke="#A2AE78" strokeWidth="3" fill="#8D9B64">
    <path d="M105 660Q305 542 534 617L556 751L123 770Z" />
    <path
      d="M115 695Q290 588 542 651M120 731Q312 626 549 685M165 756Q330 671 552 721"
      fill="none"
      stroke="#D8C88D"
      strokeWidth="11"
    />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <path
        key={i}
        d={`M${150 + i * 45} 703l-7-44m4 29l-10-13m11 2l9-14`}
        fill="none"
        stroke="#E0CE91"
        strokeWidth="2"
      />
    ))}
  </g>
);
const CityGarden = () => (
  <g stroke="#6D7052" strokeWidth="3">
    <path
      d="M1395 679V470H1465V679M1485 681V433H1555V683M1575 683V500H1632V687"
      fill="#C9C8A3"
    />
    {[0, 1, 2].map((i) => (
      <g key={i} stroke="#93A894" strokeWidth="8">
        <path d={`M${1411 + i * 89} 503v106m20-110v110`} />
      </g>
    ))}
    <path
      d="M1373 694Q1485 623 1660 686L1648 727Q1490 681 1373 738Z"
      fill="#8DA87A"
    />
    <path
      d="M1425 682V569M1410 609Q1370 563 1403 548Q1421 537 1430 566Q1465 520 1482 548Q1491 581 1432 613"
      fill="#567D59"
      stroke="#55734A"
    />
    <path
      d="M1540 698H1631M1552 698V726M1615 698V726M1547 679H1622V696H1547Z"
      fill="#A08656"
      stroke="#795D3C"
    />
  </g>
);
const CleanWorks = () => (
  <g stroke="#5F6B50" strokeWidth="3" strokeLinejoin="round">
    <path d="M1690 688V581H1822V688Z" fill="#C0C3A0" />
    <path d="M1678 583L1742 539L1776 566L1810 540L1840 582Z" fill="#64816A" />
    <path d="M1704 604H1747V643H1704ZM1762 604H1808V643H1762Z" fill="#94B8A3" />
    <path d="M1751 688V649H1780V688M1691 692H1830" fill="#8B8D65" />
    <path
      d="M1707 570L1741 546L1759 561M1785 561L1809 546L1821 563"
      fill="none"
      stroke="#C0CFB0"
      strokeWidth="3"
    />
    <path
      d="M1681 706Q1757 675 1846 712"
      fill="none"
      stroke="#7E9B68"
      strokeWidth="15"
    />
  </g>
);

/** Five authored paper planes. The central village is reused; the side scenes are explicitly conceptual. */
export const ScrollBackdrop = ({
  time = 0,
  expand = 1,
  light = 0,
  notes = true,
  noteOpacity = 1,
}: {
  time?: number;
  expand?: number;
  light?: number;
  notes?: boolean;
  noteOpacity?: number;
}) => {
  const id = useId().replace(/:/g, "");
  const zoom = 1 - 0.1 * expand;
  return (
    <g>
      <ArtDefs id={id} />
      <rect width="1920" height="1080" fill={colors.paper} />
      <defs>
        <clipPath id={`${id}-unroll`}>
          <rect
            x={960 - 920 * expand}
            y="365"
            width={1840 * expand}
            height="580"
          />
        </clipPath>
        <clipPath id={`${id}-center`}>
          <path d="M530 663Q548 477 725 426Q929 350 1160 441Q1314 488 1355 677L1344 839H542Z" />
        </clipPath>
      </defs>
      <g transform={`translate(960 690) scale(${zoom}) translate(-960 -690)`}>
        <g opacity={tween(expand, 0, 0.15)}>
          <rect
            x={960 - 920 * expand}
            y="388"
            width={1840 * expand}
            height="565"
            fill="#E8DAB9"
            stroke="#BBA373"
            strokeWidth="2"
          />
          <path
            d={`M${960 - 920 * expand} 388V953M${960 + 920 * expand} 388V953`}
            stroke="#92734C"
            strokeWidth="13"
          />
          <path
            d={`M${960 - 920 * expand + 10} 405V935M${960 + 920 * expand - 10} 405V935`}
            stroke="#D6BF8E"
            strokeWidth="3"
          />
        </g>
        <path
          d={`M${530 - 460 * expand} 805Q960 766 ${1350 + 500 * expand} 805V945H${530 - 460 * expand}Z`}
          fill="#BCA87F"
        />
        <g clipPath={`url(#${id}-unroll)`}>
          <g transform={`translate(${-14 * expand} 0)`}>
            <Cloud x={360} y={398} scale={0.7} />
            <Cloud x={1555} y={393} scale={0.65} />
            <path
              d="M65 648L214 497L330 546L449 430L597 602L744 465L910 598L1100 461L1265 591L1400 481L1550 583L1710 473L1860 630V827H65Z"
              fill="#B9CBB6"
            />
            <path
              d="M70 716Q280 577 490 675T922 665Q1170 550 1410 666T1850 676V883H70Z"
              fill="#789979"
            />
          </g>
          <g transform={`translate(${-28 * expand} 0)`}>
            <Bamboo
              x={145}
              y={762}
              scale={0.45}
              sway={Math.sin(time * 0.6) * 0.35}
            />
            <Bamboo
              x={265}
              y={757}
              scale={0.38}
              sway={Math.sin(time * 0.6 + 1) * 0.35}
            />
            <Fields />
          </g>
          <g transform={`translate(${24 * expand} 0)`}>
            <CityGarden />
            <CleanWorks />
          </g>
        </g>
        <g clipPath={`url(#${id}-center)`}>
          <svg
            x="530"
            y="378"
            width="820"
            height="461"
            viewBox="80 180 1760 990"
            preserveAspectRatio="none"
          >
            <ValleyBackground time={time} />
          </svg>
        </g>
        <g opacity={expand}>
          <path
            d="M130 766Q490 705 832 761T1435 743Q1655 725 1820 769"
            fill="none"
            stroke="#CEB98F"
            strokeWidth="18"
          />
          <path
            d={SCROLL_RIVER}
            fill="#84ADA3"
            stroke="#D4D2AD"
            strokeWidth="4"
          />
          <path
            d={`M140 ${842 + Math.sin(time * 0.8) * 2}Q400 784 670 827M1220 ${823 - Math.sin(time * 0.8) * 2}Q1500 779 1780 825`}
            fill="none"
            stroke="#DDE0C0"
            strokeWidth="2.5"
          />
        </g>
        <path
          d="M505 897Q660 845 1010 876L1115 942H430Z"
          fill="#BCA87F"
          stroke="#D9C99E"
          strokeWidth="3"
        />
        <g opacity={light} fill="#E0BD73" stroke="#A78A50" strokeWidth="1.2">
          <rect x="1158" y="520" width="11" height="24" />
          <rect x="1173" y="520" width="11" height="24" />
          <rect x="1189" y="520" width="11" height="24" />
        </g>
        <g opacity={expand}>
          <text x="944" y="582" fill={ink} fontSize="27">
            余村
          </text>
          <path
            d="M936 578H917V624"
            fill="none"
            stroke="#9C7C43"
            strokeWidth="2"
          />
          <circle cx="917" cy="624" r="4" fill={colors.gold} />
        </g>
      </g>
      {notes ? (
        <g
          opacity={tween(expand, 0.28, 0.6) * noteOpacity}
          fill="#76664B"
          fontSize="24"
        >
          <text x="130" y="360">
            主题示意，不指向具体项目
          </text>
          <text x="1790" y="360" textAnchor="end">
            主题示意，不指向具体项目
          </text>
        </g>
      ) : null}
    </g>
  );
};

export const ScrollPeople = ({
  time = 0,
  opacity = 1,
}: {
  time?: number;
  opacity?: number;
}) => (
  <g opacity={opacity}>
    <Villager
      x={330}
      y={502}
      scale={0.27}
      kind="farmer"
      upper={-30 + Math.sin(time * 0.5) * 2}
      forearm={-25}
      crouch={0.45}
      head={4}
      held={
        <g transform="scale(.55)">
          <Spade angle={-7} />
        </g>
      }
    />
    <g transform="translate(224 758) scale(.26)">
      <Sapling x={0} y={0} leaves={0.65} />
    </g>
    <Villager
      x={442}
      y={580}
      scale={0.23}
      kind="woman"
      upper={-36}
      forearm={-20}
      head={2}
      held={<Basket r={55} />}
    />
    <Villager
      x={120}
      y={544}
      scale={0.27}
      kind="worker"
      upper={-32}
      forearm={-37}
      head={4}
    />
    <ApronVillager
      x={1120}
      y={532}
      scale={0.25}
      kind="worker"
      facing="left"
      upper={-49}
      forearm={-56}
      head={-2}
    />
    <Villager
      x={1242}
      y={590}
      scale={0.23}
      kind="woman"
      upper={-28}
      forearm={-43}
      head={2}
    />
    <FamilyWalk
      x={1453 + 25 * Math.sin(Math.min(time, 13) * 0.2)}
      y={570}
      scale={0.22}
      step={Math.sin(time * 2) * 2}
    />
    <Villager
      x={1735}
      y={564}
      scale={0.27}
      kind="worker"
      facing="left"
      upper={-35}
      forearm={-30}
    />
  </g>
);
