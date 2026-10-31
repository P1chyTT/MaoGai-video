import { useId } from "react";
import type { ReactNode } from "react";
import { ArtDefs, ink, Rivet } from "../act01/art";
import { Hand } from "../act01/Puppet";

export type JointPose = {
  x: number;
  y: number;
  scale: number;
  upper: number;
  forearm: number;
  facing?: "left" | "right";
};
/** Same bone coordinates as Act01 Puppet; props can bind without altering that component. */
export const handPoint = ({
  x,
  y,
  scale,
  upper,
  forearm,
  facing = "right",
}: JointPose) => {
  const r = Math.PI / 180;
  const hx =
    190 - Math.sin(upper * r) * 104 - Math.sin((upper + forearm) * r) * 113;
  const hy =
    275 + Math.cos(upper * r) * 104 + Math.cos((upper + forearm) * r) * 113;
  return {
    x: x + scale * (facing === "left" ? 300 - hx : hx),
    y: y + scale * hy,
  };
};

/** Three unnamed adult derivatives of the supplied group reference, using Act01 materials. */
export const Villager = ({
  x,
  y,
  scale = 0.65,
  kind = "worker",
  facing = "right",
  head = 0,
  upper = -8,
  forearm = -12,
  backUpper = 9,
  backForearm = -8,
  walk = 0,
  crouch = 0,
  held,
  ask = false,
}: {
  x: number;
  y: number;
  scale?: number;
  kind?: "worker" | "farmer" | "woman";
  facing?: "left" | "right";
  head?: number;
  upper?: number;
  forearm?: number;
  backUpper?: number;
  backForearm?: number;
  walk?: number;
  crouch?: number;
  held?: ReactNode;
  ask?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  const woman = kind === "woman";
  const fabric = woman ? "#874333" : kind === "farmer" ? "#446658" : "#4F5741";
  const arm = (u: number, f: number, front: boolean) => (
    <g transform={`translate(${front ? 190 : 111} 275) rotate(${u})`}>
      <path
        d="M-24 0Q0-19 23 0L22 107H-23Z"
        fill={fabric}
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M-17 12H16V95H-17Z" fill={`url(#${id}-vine)`} opacity=".7" />
      <g transform={`translate(0 104) rotate(${f})`}>
        <path
          d="M-22 0Q0-17 21 0L23 104H-23Z"
          fill={fabric}
          stroke={ink}
          strokeWidth="3"
        />
        <path d="M-16 12H15V86H-16Z" fill={`url(#${id}-vine)`} opacity=".8" />
        <path
          d="M-23 87H23V107H-23Z"
          fill="#B09867"
          stroke="#DFC593"
          strokeWidth="2"
        />
        <g transform="translate(0 113)">
          {front && held ? <g transform={`rotate(${-u - f})`}>{held}</g> : null}
          <Hand id={id} point={front && ask} />
        </g>
        <Rivet x={0} y={0} r={9} id={id} />
      </g>
      <Rivet x={0} y={0} r={11} id={id} />
    </g>
  );
  const leg = (front: boolean) => {
    const shift = front ? 0 : 60;
    const kneeX = 130 + shift + crouch * 54;
    const kneeY = 610 - crouch * 94;
    const footY = 735 - crouch * 140;
    return (
      <g transform={`rotate(${(front ? 1 : -1) * walk} ${140 + shift} 490)`}>
        <path
          d={`M${109 + shift} 482H${164 + shift}L${kneeX + 25} ${kneeY}L${kneeX + 19} ${footY}H${kneeX - 27}L${kneeX - 22} ${kneeY}Z`}
          fill={woman ? "#62503B" : fabric}
          stroke={ink}
          strokeWidth="3"
        />
        <path
          d={`M${118 + shift} 508H${151 + shift}L${kneeX + 14} ${kneeY}L${kneeX + 10} ${footY - 15}H${kneeX - 18}L${kneeX - 12} ${kneeY}Z`}
          fill={`url(#${id}-vine)`}
          opacity=".8"
        />
        <path
          d={`M${kneeX - 28} ${footY - 8}Q${kneeX} ${footY + 4} ${kneeX + 18} ${footY - 7}L${kneeX + 58} ${footY + 22}Q${kneeX + 68} ${footY + 39} ${kneeX + 35} ${footY + 39}H${kneeX - 29}Z`}
          fill="#382D24"
          stroke={ink}
          strokeWidth="3"
        />
        <path
          d={`M${kneeX - 24} ${footY + 27}H${kneeX + 53}`}
          stroke="#B1945A"
          strokeWidth="3"
        />
        <Rivet x={kneeX} y={kneeY} r={10} id={id} />
        <Rivet x={kneeX - 4} y={footY + 9} r={7} id={id} />
      </g>
    );
  };
  return (
    <g
      transform={`translate(${x} ${y + crouch * 140 * scale}) scale(${scale})`}
      style={{ filter: "drop-shadow(4px 5px 1px rgba(45,30,27,.16))" }}
    >
      <ArtDefs id={id} />
      <g
        transform={facing === "left" ? "translate(300 0) scale(-1 1)" : ""}
        strokeLinejoin="round"
      >
        {leg(false)}
        {leg(true)}
        {arm(backUpper, backForearm, false)}
        <path
          d="M109 247Q154 227 199 242L220 265L239 482Q159 506 80 482L94 284Z"
          fill={fabric}
          stroke={ink}
          strokeWidth="3.5"
        />
        <path
          d="M92 298L132 271L127 476L87 476ZM180 271L216 296L231 478L177 489Z"
          fill={`url(#${id}-vine)`}
          opacity=".8"
        />
        <path
          d="M140 242L158 267L180 242L193 260L173 280V487H155V280L127 261Z"
          fill="#AF986A"
          stroke="#E5C895"
          strokeWidth="2"
        />
        {[301, 341, 381, 421].map((n) => (
          <path key={n} d={`M146 ${n}H184`} stroke="#D0AF70" strokeWidth="6" />
        ))}
        <path
          d="M87 454L114 421L138 440L169 404L200 440L221 428L235 479H84Z"
          fill="#C4C29A"
        />
        <path
          d="M86 479L116 450L141 469L170 439L207 466L230 449L239 485Z"
          fill="#637B58"
        />
        <path
          d="M106 481V462L121 452L138 462V481M172 482V462L189 451L208 462V482"
          fill="#E3D1A8"
        />
        <path d="M107 249L198 244L235 481L82 483Z" fill={`url(#${id}-grain)`} />
        <g transform={`rotate(${head} 156 239)`}>
          <path
            d="M140 202L134 246L157 267L180 244L177 205Z"
            fill={`url(#${id}-skin)`}
            stroke="#7D542F"
            strokeWidth="2"
          />
          <path
            d="M115 101Q145 71 182 92Q212 104 215 131L213 146L232 163Q241 171 223 175L216 178L222 188L216 195Q223 202 217 209L207 214Q201 235 184 232L156 220L137 205Q105 190 104 159Q100 123 115 101Z"
            fill={`url(#${id}-skin)`}
            stroke="#76532D"
            strokeWidth="2.5"
          />
          <path
            d="M108 158Q94 112 121 88Q160 65 196 92L209 120Q182 119 168 101Q153 125 136 137L131 176L118 180Z"
            fill="#302920"
          />
          <path
            d="M110 126Q135 104 147 97M110 146L132 128"
            stroke="#C2A96D"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M133 170Q116 151 119 174Q120 193 135 190"
            fill="#D0A257"
            stroke="#7E582F"
            strokeWidth="2"
          />
          <path
            d="M184 141Q197 130 207 142L199 147Q191 141 184 146Z"
            fill={ink}
          />
          <path
            d="M182 131Q196 122 208 133"
            fill="none"
            stroke={ink}
            strokeWidth={woman ? 4 : 5}
          />
          <path
            d="M200 201Q211 205 219 198"
            fill="none"
            stroke="#88432E"
            strokeWidth="3"
          />
          {woman ? (
            <g fill="#8E3F2C" stroke="#C5A061" strokeWidth="2">
              <path d="M104 121Q88 72 126 63Q177 48 205 93L185 103Q155 87 140 126Z" />
              <path d="M113 132Q81 127 72 152L93 156L69 183L94 187L122 157Z" />
              <path
                d="M107 89l24-9m15 10l18-13m6 21l17-8"
                stroke="#E5CF9E"
                strokeWidth="3"
              />
            </g>
          ) : kind === "farmer" ? (
            <g fill="#A17D44" stroke={ink} strokeWidth="3">
              <path d="M107 107Q112 50 154 46Q194 47 216 103Z" />
              <path d="M58 105Q132 92 238 107L262 128Q186 157 63 128Q46 120 58 105Z" />
              <path
                d="M89 111L220 129M113 79L194 97M122 62L132 100M152 53L165 101M181 61L196 105"
                fill="none"
                stroke="#D7BD82"
                strokeWidth="3"
              />
            </g>
          ) : (
            <g fill="#454532" stroke={ink} strokeWidth="3">
              <path d="M105 105Q109 48 157 44Q196 43 216 96Z" />
              <path d="M96 108Q154 117 237 84L251 87Q213 127 103 126Z" />
              <path
                d="M119 79Q155 63 200 75"
                stroke="#B89A5B"
                strokeWidth="2"
                strokeDasharray="5 5"
                fill="none"
              />
            </g>
          )}
        </g>
        {arm(upper, forearm, true)}
      </g>
    </g>
  );
};
