import { useId } from "react";
import {
  AbsoluteFill,
  Freeze,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Act05Frame } from "../../components/act05/Act05Frame";
import {
  PlanBook,
  RouteSketch,
  FilmingPhone,
} from "../../components/act05/Props";
import { LaborView } from "../../components/act05/Labor";
import { Puppet, Hand } from "../../components/act01/Puppet";
import { ArtDefs } from "../../components/act01/art";
import { OldPrint } from "../../components/act01/StageProps";
import { Bench } from "../../components/act02/Props";
import { Pen, armTo } from "../../components/act03/Notebook";
import { PhoneView } from "../../components/act04/Props";
import { ValleyBackground } from "../../components/act04/Valley";
import { Scene16 } from "../act04/Scene16";
import { tween } from "../../shared/styleTokens";

/** Rearticulates cropped original SVG limbs; no stretching or redrawn character. */
const RisingXiaohe = ({ rise }: { rise: number }) => {
  const id = useId().replace(/:/g, "");
  const angle = -65 * (1 - rise);
  return (
    <g transform={`translate(622 ${tween(rise, 0, 1, 300, 260)}) scale(.64)`}>
      <defs>
        <clipPath id={`${id}-body`}>
          <rect x="-30" y="-20" width="400" height="525" />
        </clipPath>
        <clipPath id={`${id}-thigh`}>
          <rect x="0" y="495" width="320" height="123" />
        </clipPath>
        <clipPath id={`${id}-shin`}>
          <rect x="0" y="610" width="320" height="190" />
        </clipPath>
      </defs>
      <g transform={`rotate(${angle} 150 490)`}>
        <g clipPath={`url(#${id}-thigh)`}>
          <Puppet variant="xiaohe" />
        </g>
        <g
          transform={`rotate(${-angle} 150 612)`}
          clipPath={`url(#${id}-shin)`}
        >
          <Puppet variant="xiaohe" />
        </g>
      </g>
      <g clipPath={`url(#${id}-body)`}>
        <Puppet
          variant="xiaohe"
          head={4 - 6 * rise}
          upper={-54}
          forearm={-72}
          smile
          armLayer="body"
        />
      </g>
    </g>
  );
};

export const Scene17 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const id = useId().replace(/:/g, "");
  const pull = tween(t, 8.9, 11.8),
    rise = tween(t, 10.4, 11.8),
    out = tween(t, 13.65, 14.9667);
  const bookX = tween(pull, 0, 1, 960, 860),
    bookY = tween(pull, 0, 1, 548, 565),
    bookScale = tween(pull, 0, 1, 1.25, 0.31);
  const close = 1 - tween(t, 10.15, 10.65) + tween(t, 11.8, 12.25);
  const transfer = tween(t, 12.15, 13.15);
  const oldX = 990 - 100 * transfer,
    oldY = 465;
  const elder = armTo({
    x: 900,
    y: 260,
    scale: 0.64,
    facing: "left",
    targetX: oldX + 54,
    targetY: oldY + 36,
  });
  const xh = armTo({
    x: 622,
    y: 260,
    scale: 0.64,
    targetX: oldX - 60,
    targetY: oldY + 36,
  });
  const phone = armTo({
    x: 622,
    y: 260,
    scale: 0.64,
    targetX: 850,
    targetY: 480,
  });
  const writer = armTo({
    x: 622,
    y: tween(rise, 0, 1, 300, 260),
    scale: 0.64,
    targetX: 860,
    targetY: 520,
  });
  const handoff = tween(t, 11.6, 12.1),
    lift = tween(t, 13.1, 13.6);
  const front = {
    ...writer,
    upper: tween(
      lift,
      0,
      1,
      tween(handoff, 0, 1, writer.upper, xh.upper),
      phone.upper,
    ),
    forearm: tween(
      lift,
      0,
      1,
      tween(handoff, 0, 1, writer.forearm, xh.forearm),
      phone.forearm,
    ),
  };
  const penX =
    t < 4
      ? tween(t, 2.1, 3.7, -424, -245)
      : -415 + tween((t - 4.3) % 1.5, 0, 1, 0, 200);
  const penY =
    t < 4
      ? -178
      : -13 + 73 * Math.min(2, Math.floor(Math.max(0, t - 4.3) / 1.5));
  return (
    <AbsoluteFill>
      <Act05Frame
        scene="Scene17"
        label="把计划改成行动"
        labelOpacity={tween(t, 0.8, 1.4)}
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <g opacity={tween(t, 0, 1.2)}>
            <ValleyBackground time={t} />
          </g>
          <g opacity={pull}>
            <Bench x={770} y={622} scale={1.1} />
            <Puppet
              {...elder}
              variant="elder"
              head={
                t < 11.6 ? 5 : 2 + Math.sin(tween(t, 11.6, 12.65) * Math.PI) * 5
              }
              smile={t > 11.8}
            />
            <RisingXiaohe rise={rise} />
          </g>
          <g transform={`translate(${bookX} ${bookY}) scale(${bookScale})`}>
            <PlanBook time={t} open={Math.min(1, close)} />
            <g opacity={1 - pull}>
              <ArtDefs id={id} />
              <PhoneView x={-590} y={-30} scale={1.05} angle={-7} route />
              <g
                transform={`translate(${penX - 10} ${penY - 13}) rotate(-55) scale(1.4)`}
              >
                <Hand id={id} />
              </g>
              <Pen x={penX} y={penY} angle={-28} length={34} />
            </g>
          </g>
          <g opacity={tween(t, 11.6, 11.9) * (1 - out)}>
            <g transform={`translate(${oldX} ${oldY})`}>
              <OldPrint x={-85} y={-53} width={170} height={106} />
            </g>
            <Puppet {...elder} variant="elder" armLayer="front" />
          </g>
          <g opacity={pull}>
            <Puppet {...front} variant="xiaohe" armLayer="front" />
          </g>
          <g opacity={tween(t, 13.2, 13.65)}>
            <FilmingPhone
              x={tween(out, 0, 1, phone.hand.x, 960)}
              y={tween(out, 0, 1, phone.hand.y + 18, 540)}
              scale={tween(out, 0, 1, 0.55, 1920 / 169)}
              view={<LaborView kind={0} time={0} />}
            />
          </g>
          <g
            opacity={(1 - pull) * tween(t, 0.1, 1.25)}
            transform="translate(1130 320) scale(.22)"
          >
            <RouteSketch progress={tween(t, 0.2, 1.5)} />
          </g>
        </svg>
      </Act05Frame>
      {t < 1.25 ? (
        <AbsoluteFill
          style={{ opacity: 1 - tween(t, 0, 1.25), pointerEvents: "none" }}
        >
          <Freeze frame={13 * fps - 1}>
            <Scene16 />
          </Freeze>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
