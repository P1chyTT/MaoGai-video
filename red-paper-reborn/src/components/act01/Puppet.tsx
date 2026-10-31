import type { ReactNode } from "react";
import { useId } from "react";
import { ArtDefs, ink, Rivet } from "./art";

export const Hand = ({
  id,
  point = false,
  thumb = 0,
}: {
  id: string;
  point?: boolean;
  thumb?: number;
}) => (
  <g fill={`url(#${id}-skin)`} stroke="#7E512B" strokeWidth="1.5">
    <path
      d={
        point
          ? "M-13-7L-12 7L-7 31Q-4 39 1 34L1 12L9 22Q13 25 15 20L8 6L6-5Z"
          : "M-14-7L-15 14L-9 29Q-6 34-3 29L-5 14L0 32Q4 35 6 30L2 12L8 26Q12 29 14 23L8 4L15 11Q20 11 18 6L8-10Z"
      }
    />
    <path
      d="M-10 6L4 2M-8 12L5 9"
      fill="none"
      stroke="#C39452"
      strokeWidth="1"
    />
    {!point ? (
      <path
        d="M4 5Q15-3 18 2Q20 6 8 15L3 12Z"
        transform={`rotate(${thumb} 4 7)`}
      />
    ) : null}
  </g>
);

export const WorkHat = ({ id }: { id: string }) => (
  <g stroke={ink} strokeWidth="2.5">
    <path
      d="M104 106Q97 40 140 38Q195 22 217 80L222 105Z"
      fill={`url(#${id}-leather)`}
    />
    <path
      d="M89 107Q138 118 247 80Q265 78 252 92Q181 139 94 125Q78 121 89 107Z"
      fill={`url(#${id}-leather)`}
    />
    <path
      d="M117 76Q161 46 207 65M116 92Q159 61 211 80"
      stroke="#D2AE70"
      fill="none"
      strokeDasharray="5 5"
    />
    <path d="M109 104L216 89" stroke="#D7B67E" strokeWidth="4" />
  </g>
);

const LandscapeHem = () => (
  <g fill="#E5D2A4" opacity=".9">
    <path d="M80 453L109 409L139 431L167 389L203 429L226 414L246 460H80Z" />
    <path
      d="M89 461L119 437L148 453L178 420L203 448L237 438L246 483H82Z"
      fill="#54704C"
    />
    <path d="M111 473V455L127 445L142 455V473ZM166 476V451L184 440L204 451V476Z" />
    <path
      d="M106 455L127 441L148 455M160 451L184 436L210 451"
      stroke="#8A6849"
      strokeWidth="3"
    />
    <path d="M121 473V460H131V473M179 476V459H191V476" fill="#6A704B" />
    <path d="M94 485Q148 473 209 487L232 491H89Z" />
  </g>
);

/** Hand-authored SVG derivatives of the supplied visual templates, not raster cutouts. */
export const Puppet = ({
  x = 0,
  y = 0,
  scale = 1,
  facing = "right",
  variant = "elder",
  head = 0,
  upper = -12,
  forearm = -48,
  backUpper = 12,
  backForearm = -12,
  hat = true,
  phone = false,
  envelope = 0,
  smile = true,
  point = false,
  lean = 0,
  thumb = 0,
  armLayer = "all",
}: {
  x?: number;
  y?: number;
  scale?: number;
  facing?: "left" | "right";
  variant?: "elder" | "middle" | "xiaohe";
  head?: number;
  upper?: number;
  forearm?: number;
  backUpper?: number;
  backForearm?: number;
  hat?: boolean;
  phone?: boolean;
  envelope?: number;
  smile?: boolean;
  point?: boolean;
  lean?: number;
  thumb?: number;
  armLayer?: "all" | "body" | "front";
}) => {
  const id = useId().replace(/:/g, "");
  const girl = variant === "xiaohe";
  const old = variant === "elder";
  const coat = `url(#${id}-${girl ? "green" : "leather"})`;
  const leg = "M107 483L168 490L148 724L89 724Z";
  const torso =
    "M110 247Q154 228 196 242L220 265L238 478Q166 507 81 481L94 282Z";
  const arm = (u: number, f: number, front: boolean): ReactNode => (
    <g transform={`translate(${front ? 190 : 111} 275) rotate(${u})`}>
      <path
        d="M-26 0Q0-21 25 0L22 107Q0 125-25 106Z"
        fill={coat}
        stroke={ink}
        strokeWidth="2.6"
      />
      <path d="M-19 12H18V97H-19Z" fill={`url(#${id}-vine)`} opacity=".55" />
      <g transform={`translate(0 104) rotate(${f})`}>
        <path
          d="M-23 0Q0-18 21 0L25 105H-23Z"
          fill={coat}
          stroke={ink}
          strokeWidth="2.6"
        />
        <path d="M-17 14H15V84H-17Z" fill={`url(#${id}-vine)`} opacity=".85" />
        <path
          d="M-23 85L24 86L25 107H-23Z"
          fill="#B99A61"
          stroke="#E4C58D"
          strokeWidth="2"
        />
        <path
          d="M-18 95L-11 89L-4 99L3 90L10 100L17 91"
          fill="none"
          stroke="#F0DCB4"
          strokeWidth="2"
        />
        <g transform="translate(0 113)">
          {front && phone ? (
            <g transform={`rotate(${-u - f}) translate(0 -55)`}>
              <rect
                x="-21"
                y="-8"
                width="47"
                height="86"
                rx="7"
                fill="#302B23"
                stroke="#AE8C51"
                strokeWidth="3"
              />
              <rect
                x="-15"
                y="2"
                width="35"
                height="62"
                rx="2"
                fill="#B1C9AB"
              />
              <path d="M-14 46L-5 26L3 34L12 19L20 44V63H-14Z" fill="#43674C" />
              <circle cx="3" cy="71" r="3" fill="#C6A464" />
            </g>
          ) : null}
          {front && envelope > 0 ? (
            <g
              transform={`rotate(${-u - f}) translate(0 -12)`}
              opacity={envelope}
            >
              <rect
                x="-64"
                y="-34"
                width="127"
                height="79"
                fill="#DCC594"
                stroke="#6E4D32"
                strokeWidth="3"
              />
              <path
                d="M-63-33L0 12L63-33M-63 44L-17 8M63 44L17 8"
                fill="none"
                stroke="#9C794B"
                strokeWidth="2"
              />
              <text x="0" y="34" fontSize="20" textAnchor="middle" fill={ink}>
                收入
              </text>
            </g>
          ) : null}
          <Hand id={id} point={point && front} thumb={front ? thumb : 0} />
        </g>
        <Rivet x={0} y={0} r={9} id={id} />
      </g>
      <Rivet x={0} y={0} r={11} id={id} />
    </g>
  );
  if (armLayer === "front")
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <ArtDefs id={id} />
        <g
          transform={`${facing === "left" ? "translate(300 0) scale(-1 1) " : ""}rotate(${lean} 160 600)`}
        >
          {arm(upper, forearm, true)}
        </g>
      </g>
    );
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      style={{ filter: "drop-shadow(4px 5px 1px rgba(45,30,27,.16))" }}
    >
      <ArtDefs id={id} />
      <g
        transform={`${facing === "left" ? "translate(300 0) scale(-1 1) " : ""}rotate(${lean} 160 600)`}
        strokeLinejoin="round"
      >
        {girl ? (
          <g fill="#81522C" stroke={ink} strokeWidth="3">
            <path d="M84 272Q15 259 18 349L14 475Q34 509 87 480Z" />
            <path
              d="M31 312L76 305V469L26 477Z"
              fill={`url(#${id}-vine)`}
              opacity=".6"
            />
            <path d="M33 347H74V412H33Z" fill="#A06F3E" />
            <path d="M33 347L53 371L74 347" fill="none" stroke="#C69C63" />
            <Rivet x={54} y={367} r={5} id={id} />
          </g>
        ) : null}
        <g transform="rotate(5 172 520)">
          <path
            d="M166 481L221 480L226 727H170Z"
            fill={coat}
            stroke={ink}
            strokeWidth="3"
          />
          <path
            d="M175 514H215L216 707H176Z"
            fill={`url(#${id}-vine)`}
            opacity=".75"
          />
          <path
            d="M169 720Q204 729 221 715L262 745Q273 765 237 769H167Z"
            fill="#392D22"
            stroke={ink}
            strokeWidth="3"
          />
          <path d="M171 753H258" stroke="#B8955C" strokeWidth="4" />
          <Rivet x={194} y={609} r={10} id={id} />
          <Rivet x={190} y={738} r={8} id={id} />
        </g>
        <g transform="rotate(-4 134 520)">
          <path d={leg} fill={coat} stroke={ink} strokeWidth="3" />
          <path
            d="M112 513L155 516L140 706L95 705Z"
            fill={`url(#${id}-vine)`}
            opacity=".8"
          />
          <path
            d="M88 719Q116 732 146 719L151 759Q137 773 104 771H65Q49 762 69 744Z"
            fill="#392D22"
            stroke={ink}
            strokeWidth="3"
          />
          <path d="M65 757L147 760" stroke="#B8955C" strokeWidth="4" />
          <Rivet x={126} y={610} r={10} id={id} />
          <Rivet x={121} y={737} r={8} id={id} />
        </g>
        {arm(backUpper, backForearm, false)}
        <path d={torso} fill={coat} stroke={ink} strokeWidth="3.5" />
        <path d={torso} fill={`url(#${id}-grain)`} />
        <path
          d="M92 302L135 272L126 477L88 477ZM179 273L216 296L229 477L178 490Z"
          fill={`url(#${id}-vine)`}
          opacity=".85"
        />
        <LandscapeHem />
        <path
          d="M140 244L157 270L179 242L193 262L173 280V486H154V280L126 262Z"
          fill={girl ? "#C1B27E" : "#B28C52"}
          stroke="#E9C991"
          strokeWidth="2"
        />
        {[297, 337, 377, 417].map((v) => (
          <g key={v}>
            <path d={`M144 ${v}H184`} stroke="#C6A05D" strokeWidth="7" />
            <circle cx="143" cy={v} r="4.3" fill="#F0CE83" />
            <circle cx="185" cy={v} r="4.3" fill="#B6883F" />
          </g>
        ))}
        {girl ? (
          <path
            d="M83 258Q117 240 138 269L126 414L116 423L123 278Q104 256 87 272Z"
            fill="#704225"
            stroke="#C3975F"
            strokeWidth="2"
          />
        ) : null}
        <g transform={`rotate(${head} 155 240)`}>
          <path
            d="M141 200L134 245L158 268L182 243L176 199Z"
            fill={`url(#${id}-skin)`}
            stroke="#7E512B"
            strokeWidth="2.5"
          />
          {girl ? (
            <g fill="#2D261D" stroke={ink} strokeWidth="2">
              <path d="M114 81Q48 48 36 105Q26 157 10 192Q35 191 47 169Q44 208 19 221Q72 224 87 179Q101 235 62 260Q115 251 120 192Q136 130 114 81Z" />
              <path
                d="M102 86Q69 101 65 151T43 206M109 105Q93 160 91 196"
                stroke="#C9AA6B"
                fill="none"
                strokeWidth="2"
              />
              <path
                d="M95 73Q66 36 58 67L76 88L55 109Q55 136 96 111L118 117L131 91L116 75Z"
                fill="#A52F2B"
                stroke="#C89F60"
              />
              <path
                d="M80 72L90 101M72 110L111 84"
                stroke="#E3BC7A"
                strokeWidth="3"
              />
            </g>
          ) : null}
          <path
            d="M115 100Q143 67 181 91Q211 105 215 129L213 147L232 164Q242 173 224 176L216 178L221 188L216 195Q226 202 218 210L208 213Q205 231 186 234L159 220L137 205Q105 193 104 160Q100 125 115 100Z"
            fill={`url(#${id}-skin)`}
            stroke="#704B2B"
            strokeWidth="2.4"
          />
          <path
            d="M110 159Q93 107 127 85Q160 66 195 91L210 120Q184 117 168 100Q158 124 137 134L131 174L118 181Z"
            fill={old ? "#8A8874" : "#30281F"}
            stroke="#3D3022"
            strokeWidth="2"
          />
          <path
            d="M110 124Q133 103 147 97M109 142Q137 118 155 114M112 160L126 146"
            fill="none"
            stroke={old ? "#E1D7B9" : "#B49A62"}
            strokeWidth="2"
          />
          <path
            d="M185 144Q196 133 206 143L199 147Q192 142 185 147Z"
            fill="#31231B"
          />
          <path
            d="M183 132Q196 122 209 135"
            fill="none"
            stroke="#31231B"
            strokeWidth={girl ? 4 : 6}
            strokeLinecap="round"
          />
          <path
            d="M203 160L212 162M225 174L230 173"
            fill="none"
            stroke="#81552F"
            strokeWidth="1.5"
          />
          <path
            d="M132 169Q117 150 118 172Q118 192 134 190L137 177"
            fill="#C39752"
            stroke="#77532C"
            strokeWidth="2"
          />
          <path
            d="M125 171Q133 161 131 181"
            fill="none"
            stroke="#80552F"
            strokeWidth="2"
          />
          <path
            d={
              smile
                ? "M199 199Q212 203 221 195Q216 208 202 205Z"
                : "M201 203Q211 201 218 204"
            }
            fill={smile ? "#963E2B" : "none"}
            stroke="#7F3928"
            strokeWidth="2"
          />
          {girl ? (
            <g fill="#AC6B38" opacity=".5">
              <circle cx="184" cy="174" r="9" />
              <circle cx="175" cy="182" r="1.2" />
              <circle cx="185" cy="187" r="1.1" />
            </g>
          ) : (
            <g
              fill={old ? "#B7B198" : "#514532"}
              stroke={old ? "#D0C8AD" : "#8A7147"}
              strokeWidth="1"
            >
              <path d="M190 183Q205 172 220 180L232 195L215 189L210 195L203 186L190 195Z" />
              <path
                d={
                  old
                    ? "M184 214Q196 223 211 211Q209 247 188 254L181 240L176 244L176 223Z"
                    : "M189 216Q199 226 209 215L205 233L191 238Z"
                }
              />
              <path
                d="M186 226L190 244M195 228L197 246M203 223L204 237"
                stroke={old ? "#E3D9BD" : "#AA8957"}
                fill="none"
              />
              {old ? (
                <path
                  d="M174 158L180 166M171 175L176 182M177 197L185 205"
                  fill="none"
                  stroke="#9C773E"
                />
              ) : null}
            </g>
          )}
          {!girl && hat ? <WorkHat id={id} /> : null}
        </g>
        {armLayer !== "body" ? arm(upper, forearm, true) : null}
      </g>
    </g>
  );
};
