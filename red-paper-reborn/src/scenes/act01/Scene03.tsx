import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CameraLayer } from "../../components/CameraLayer";
import { SceneFrame } from "../../components/act01/SceneFrame";
import { ArtDefs, ink } from "../../components/act01/art";
import {
  OldHouseStage,
  OldPrint,
  OldTable,
} from "../../components/act01/StageProps";
import { Puppet, WorkHat } from "../../components/act01/Puppet";
import { tween } from "../../shared/styleTokens";

export const Phone = ({
  x,
  y,
  scale = 1,
  angle = 0,
  reveal = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  angle?: number;
  reveal?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <rect
      x="-64"
      y="-145"
      width="128"
      height="213"
      rx="13"
      fill="#302A23"
      stroke="#AE925C"
      strokeWidth="4"
    />
    <rect x="-54" y="-128" width="108" height="169" rx="3" fill="#E5DFC4" />
    <path d="M-15-136H15" stroke="#96815C" strokeWidth="3" />
    <text x="0" y="-107" fontSize="15" fill={ink} textAnchor="middle">
      我的家乡
    </text>
    <text x="0" y="-88" fontSize="15" fill={ink} textAnchor="middle">
      拍摄计划
    </text>
    <rect x="-45" y="-77" width="90" height="66" fill="#AAC8BA" />
    <path d="M-45-22L-26-59L-12-43L8-65L35-27L45-32V-11H-45Z" fill="#608B76" />
    <path d="M-45-15L-25-36L-10-26L8-42L34-18L45-21V-11H-45Z" fill="#315D45" />
    <rect x="-44" y="0" width={88 * reveal} height="8" rx="2" fill="#C4B99C" />
    <rect
      x="-44"
      y="19"
      width={88 * Math.max(0, (reveal - 0.45) / 0.55)}
      height="8"
      rx="2"
      fill="#C4B99C"
    />
    <circle cy="54" r="6" fill="none" stroke="#C4AA75" strokeWidth="2" />
  </g>
);

export const PresentRoom = ({
  t = 10,
  question = false,
}: {
  t?: number;
  question?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  const u = question
    ? -12
    : tween(t, 1.8, 3.4, -14, -26) + tween(t, 5, 7.5, 0, 5);
  const a = question ? -8 : tween(t, 1.8, 3.4, -40, -72);
  const rad = Math.PI / 180;
  const hx = 190 - Math.sin(u * rad) * 104 - Math.sin((u + a) * rad) * 113;
  const hy = 275 + Math.cos(u * rad) * 104 + Math.cos((u + a) * rad) * 113;
  const phoneX = 1280 + (300 - hx) * 0.82;
  const phoneY = 205 + hy * 0.82;
  const phoneScale = tween(t, 1.8, 3.4, 0.48, 0.84) - tween(t, 5, 7, 0, 0.23);
  return (
    <g>
      <ArtDefs id={id} />
      <OldHouseStage
        sway={Math.sin(t * 0.5) * 0.6}
        shutter={1 - tween(t, 0, 1.5)}
      />
      <Puppet
        x={478}
        y={205}
        scale={0.82}
        variant="elder"
        hat={false}
        head={
          question
            ? Math.sin(Math.min(t - 10, 2) * 1.2) * 2
            : tween(t, 2.5, 6.5, 1, -3)
        }
        upper={tween(t, 0, 2, -60, -18)}
        forearm={tween(t, 0, 2, -30, -70)}
        backUpper={8}
        backForearm={-12}
      />
      <g
        transform={`translate(${tween(t, 0.2, 1.8, 478, 700)} ${tween(t, 0.2, 1.8, 205, 565)}) scale(${tween(t, 0.2, 1.8, 0.82, 0.44)})`}
      >
        <WorkHat id={id} />
      </g>
      {!question ? (
        <Phone
          x={phoneX - 52 * phoneScale}
          y={phoneY - 8}
          scale={phoneScale}
          angle={tween(t, 5, 7.5, 3, -10)}
          reveal={tween(t, 2.4, 4.4)}
        />
      ) : null}
      <Puppet
        x={question ? 1080 : 1280}
        y={205}
        scale={0.82}
        variant="xiaohe"
        facing="left"
        upper={u}
        forearm={a}
        backUpper={-2}
        backForearm={-47}
        lean={0}
        head={question ? tween(t - 10, 0, 2, 5, -2) : tween(t, 8.6, 10, -2, 5)}
        smile={!question}
        point={question}
        armLayer={question ? "body" : "all"}
        thumb={tween(t, 2.6, 3.1, 0, -18) + tween(t, 3.2, 3.7, 0, 18)}
      />
      <OldTable />
      <g transform="translate(843 616) skewX(-24) scale(1 .29)">
        <OldPrint x={0} y={0} width={278} height={170} />
      </g>
      {question ? <Phone x={1220} y={626} scale={0.33} angle={78} /> : null}
      {question ? (
        <Puppet
          x={1080}
          y={205}
          scale={0.82}
          variant="xiaohe"
          facing="left"
          upper={u}
          forearm={a}
          point
          armLayer="front"
        />
      ) : null}
      <g
        transform="translate(1170 631)"
        fill="#D9C197"
        stroke="#795B3A"
        strokeWidth="2"
      >
        <path d="M0-36H40L35 0H5Z" />
        <path d="M40-31Q67-31 58-10H38" fill="none" strokeWidth="5" />
        <ellipse cx="20" cy="1" rx="31" ry="6" />
      </g>
    </g>
  );
};

export const Scene03 = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  return (
    <SceneFrame
      scene="Scene03"
      label="今天｜浙江省湖州市安吉县余村"
      labelOpacity={1 - tween(t, 3.7, 4.1)}
    >
      <CameraLayer
        fromScale={1.08}
        toScale={1}
        fromX={-120}
        toX={0}
        duration={4.5}
        origin="50% 55%"
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0 }}
        >
          <PresentRoom t={t} />
        </svg>
      </CameraLayer>
    </SceneFrame>
  );
};
