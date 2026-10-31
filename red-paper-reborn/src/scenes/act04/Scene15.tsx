import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act04Frame } from "../../components/act04/Act04Frame";
import {
  ApronVillager,
  Basket,
  Leaf,
  PaperBag,
  Platter,
  Product,
  SalesShelf,
} from "../../components/act04/Props";
import { OldHouseStage } from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { Villager } from "../../components/act02/Villager";
import { armTo, Pen } from "../../components/act03/Notebook";
import { tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";

export const Scene15 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const morph = tween(t, 0.3, 2.4),
    wide = tween(t, 3, 4.4),
    inside = tween(t, 6.7, 7.5),
    exit = tween(t, 11.1, 12);
  const bx = 960 - 480 * wide + 420 * inside,
    by = 550 + 150 * wide - 10 * inside,
    br = 270 - 155 * wide + 10 * inside;
  const pass = tween(t, 8.1, 10.4),
    bagX = 1110 + 75 * pass;
  const owner = armTo({
    x: 930,
    y: 380,
    scale: 0.62,
    targetX: bagX - 18,
    targetY: 610,
  });
  const guest = armTo({
    x: 1240,
    y: 370,
    scale: 0.6,
    facing: "left",
    targetX: 1210,
    targetY: 610,
  });
  const old = armTo({ x: 660, y: 350, scale: 0.6, targetX: 820, targetY: 635 });
  const girl = armTo({
    x: 1515,
    y: 345,
    scale: 0.59,
    facing: "left",
    targetX: 1510,
    targetY: 598,
  });
  return (
    <Act04Frame
      scene="Scene15"
      label="农产品销售与农旅融合"
      labelOpacity={tween(t, 1, 1.3) * (1 - tween(t, 10.8, 11))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g opacity={wide * (1 - inside)}>
          <path
            d="M125 625L248 361L424 431L621 283L873 521V794H125Z"
            fill="#839A69"
            stroke="#61784E"
            strokeWidth="3"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${170 + i * 22} ${537 + i * 43}Q454 ${387 + i * 49} 837 ${524 + i * 47}`}
              stroke={i % 2 ? "#3C6848" : "#C6C28A"}
              strokeWidth={i % 2 ? 19 : 7}
              fill="none"
            />
          ))}
          <path
            d="M125 776L374 637L536 703L416 822ZM453 831L562 719L831 670L865 820Z"
            fill="#C5AE6C"
            stroke="#E0C994"
            strokeWidth="5"
          />
          <SalesShelf />
          <path
            d="M330 638Q780 770 1490 637"
            fill="none"
            stroke="#B39661"
            strokeWidth="82"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(t, 3, 4.5)}
          />
          <path
            d="M330 638Q780 770 1490 637"
            fill="none"
            stroke="#E9DCBB"
            strokeWidth="74"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(t, 3, 4.5)}
          />
          {["种植", "展示", "消费"].map((label, i) => (
            <text
              key={label}
              x={320 + i * 600}
              y="245"
              textAnchor="middle"
              fontSize="34"
              fill={ink}
            >
              {label}
            </text>
          ))}
          {[0, 1, 2].map((i) => {
            const p = tween(t, 3.3 + i * 0.55, 5.2 + i * 0.55);
            return (
              <Product
                key={i}
                kind={i}
                x={350 + 1120 * p}
                y={640 + 65 * Math.sin(p * Math.PI)}
                scale={0.53}
              />
            );
          })}
          <text x="1540" y="861" fontSize="24" textAnchor="end" fill="#7A6546">
            田块与包装为产业示意
          </text>
        </g>
        <g opacity={inside}>
          <OldHouseStage />
          <SalesShelf />
          <PaperBag x={bagX} y={640} scale={0.65} />
          <ApronVillager {...owner} kind="woman" head={4} />
          <Villager {...guest} kind="farmer" head={3} />
          <Puppet {...old} variant="elder" head={4} hat={false} />
          <Puppet {...girl} variant="xiaohe" head={8} smile={false} />
          <path
            d="M1452 568L1566 576L1557 640L1445 632Z"
            fill="#E6D7B3"
            stroke="#8B704A"
            strokeWidth="2"
          />
          <text x="1505" y="608" fontSize="19" textAnchor="middle" fill={ink}>
            产地：余村
          </text>
          <Pen x={girl.hand.x} y={girl.hand.y} angle={35} />
        </g>
        <g opacity={1 - morph}>
          <Platter x={960} y={550} r={270} />
        </g>
        <g opacity={morph}>
          <Basket x={bx} y={by} r={br} products={0} />
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={tween(t, 0.5 + i * 0.55, 1 + i * 0.55)}>
              <Product
                kind={i}
                x={bx + (i - 1) * br * 0.5}
                y={by + (i % 2 ? -br * 0.12 : br * 0.12)}
                scale={br / 195}
              />
            </g>
          ))}
        </g>
        <g opacity={inside}>
          <Puppet {...old} variant="elder" armLayer="front" />
        </g>
        {exit > 0 ? (
          <g transform={`translate(${bagX} 640) scale(${0.15 + 39.85 * exit})`}>
            <Leaf />
          </g>
        ) : null}
      </svg>
    </Act04Frame>
  );
};
