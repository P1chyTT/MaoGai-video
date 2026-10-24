import React, {useId} from 'react';
import {colors, FONT, tween} from '../shared/styleTokens';
import {PhoenixMotif} from '../shared/PhoenixMotif';

export type PaperProductKind = 'sticker'|'keychain'|'expression';
export type ProductCardKind = 'cover'|'video'|PaperProductKind;

const clamp = (value:number) => Math.max(0, Math.min(1, value));
const cornerVine = 'M0 34V0H34M9 27V9H27M24 24Q41 8 47 22Q48 36 33 30Q20 27 24 13';

/** A repeated, solid ink emblem: no mask, feathers, paper holes, or simulated relief. */
export const PrintedPhoenix:React.FC<{size?:number}> = ({size=180}) => <svg width={size} height={size} viewBox="0 0 300 300" aria-label="规整的凤凰印花">
  <path d="M6 6H294V294H6Z" fill={colors.paper} stroke={colors.wood} strokeWidth="2"/>
  <path d="M20 20H280V280H20Z" fill="none" stroke={colors.red} strokeWidth="3"/>
  <g fill={colors.red}>
    <path d="M173 188C143 205 112 195 118 168C122 150 137 144 130 128C124 115 109 112 107 99C104 85 115 73 129 75C134 61 145 59 154 66C150 72 146 77 146 84L171 94L147 99C147 117 158 126 172 138C190 152 190 175 173 188Z"/>
    <path d="M128 77L104 58L119 52L135 72L135 45L150 48L145 76Z"/>
    <path d="M169 154Q166 116 183 73Q214 99 219 139Q239 110 247 86Q269 128 238 169Q214 199 172 188Z"/>
    <path d="M148 186Q126 230 62 224Q94 218 102 198Q68 215 42 193Q95 203 123 176Z"/>
    <path d="M158 188Q154 245 82 255Q121 236 126 208L139 182Z"/>
    <path d="M170 185L190 216L216 218L219 225H186L163 196Z"/>
  </g>
  <g fill="none" stroke={colors.red} strokeWidth="4">
    {[45,87,129,171,213,255].map(x=><path key={x} d={`M${x} 31h17M${x} 269h17`}/>)}
  </g>
</svg>;

/** Products retain a paper-stage silhouette, with deliberately identical printed motifs. */
export const PaperProduct:React.FC<{kind:PaperProductKind;size?:number}> = ({kind,size=260}) => <svg width={size} height={size} viewBox="0 0 300 300" style={{fontFamily:FONT}} aria-label={{sticker:'凤凰印花贴纸',keychain:'凤凰印花挂件',expression:'简化凤鸟宣传小图'}[kind]}>
  {kind==='sticker'?<>
    <path d="M23 17H276V245L243 280H23Z" fill="#F8EDD8" stroke={colors.wood} strokeWidth="2.5"/>
    <svg x="43" y="35" width="214" height="214"><PrintedPhoenix size={214}/></svg>
    <path d="M243 280V245H276Z" fill="#D9C6A5" stroke={colors.wood} strokeWidth="2"/>
  </>:kind==='keychain'?<>
    <circle cx="150" cy="36" r="26" fill="none" stroke={colors.wood} strokeWidth="7"/>
    <circle cx="150" cy="36" r="26" fill="none" stroke={colors.gold} strokeWidth="2"/>
    <path d="M150 62V84" stroke={colors.wood} strokeWidth="5"/>
    <path d="M62 82H238V271H62Z" fill="#D6BE98" stroke={colors.wood} strokeWidth="3"/>
    <svg x="71" y="92" width="158" height="158"><PrintedPhoenix size={158}/></svg>
    <path d="M85 260H215" stroke={colors.gold} strokeWidth="2"/>
  </>:<>
    <path d="M37 29H263V270H37Z" fill={colors.paper} stroke={colors.wood} strokeWidth="2"/>
    <path d="M48 40H252V259H48Z" fill="none" stroke={colors.gold} strokeWidth="2"/>
    <svg x="65" y="48" width="170" height="170"><PrintedPhoenix size={170}/></svg>
    <text x="150" y="245" textAnchor="middle" fontSize="29" letterSpacing="7" fill={colors.red}>纸上有戏</text>
  </>}
</svg>;

/** Large, readable Chinese type and the original fine motif form a paper-cut video cover. */
export const VideoCover:React.FC<{variant?:number;progress?:number}> = ({variant=0,progress=1}) => {
  const id=`act04-cover-${useId().replace(/:/g,'')}`;
  const alternate=Math.abs(Math.trunc(variant))%2===1;
  const p=tween(clamp(progress),0,1);
  return <svg width="700" height="440" viewBox="0 0 700 440" style={{fontFamily:FONT}} aria-label={alternate?'纸上有戏':'爆款剪纸'}>
    <defs>
      <pattern id={`${id}-rhythm`} width="68" height="68" patternUnits="userSpaceOnUse"><path d="M34 5L63 34L34 63L5 34Z" fill="none" stroke={colors.gold} strokeWidth="1.3"/><path d="M34 18Q15 34 34 50Q53 34 34 18Z" fill="none" stroke={colors.gold} strokeWidth="1"/></pattern>
    </defs>
    <g opacity={p} transform={`translate(350 220) scale(${.965+p*.035}) translate(-350 -220)`}>
      <path d="M8 8H692V432H8Z" fill={alternate?'#D8C59F':colors.red} stroke={colors.wood} strokeWidth="4"/>
      <path d="M18 18H682V422H18Z" fill={`url(#${id}-rhythm)`} opacity={alternate?.32:.18}/>
      <path d="M24 24H676V416H24Z" fill="none" stroke={colors.gold} strokeWidth="2"/>
      <path d="M34 34H666V406H34Z" fill="none" stroke={alternate?colors.red:colors.paper} strokeWidth=".8" opacity=".65"/>
      <g stroke={alternate?colors.red:colors.gold} strokeWidth="2.2" fill="none"><path d={cornerVine} transform="translate(41 41)"/><path d={cornerVine} transform="translate(659 41) scale(-1 1)"/><path d={cornerVine} transform="translate(41 399) scale(1 -1)"/><path d={cornerVine} transform="translate(659 399) scale(-1 -1)"/></g>
      <path d="M64 88H314V339H64Z" fill={alternate?colors.red:colors.paper} stroke={colors.gold} strokeWidth="2"/>
      <path d="M73 97H305V330H73Z" fill="none" stroke={alternate?colors.paper:colors.red} strokeWidth="1"/>
      <text x="189" y="141" textAnchor="middle" fontSize="20" letterSpacing="6" fill={alternate?colors.paper:colors.wood}>一纸生花</text>
      <text x="189" y="217" textAnchor="middle" fontSize="63" letterSpacing="6" fill={alternate?colors.paper:colors.red}>{alternate?'纸上':'爆款'}</text>
      <text x="189" y="292" textAnchor="middle" fontSize="63" letterSpacing="6" fill={alternate?colors.paper:colors.red}>{alternate?'有戏':'剪纸'}</text>
      <ellipse cx="490" cy="217" rx="153" ry="159" fill={colors.paper} stroke={colors.gold} strokeWidth="3"/>
      <svg x="334" y="91" width="311" height="242"><PhoenixMotif id={`${id}-phoenix`}/></svg>
      <path d="M347 366H630" stroke={alternate?colors.red:colors.gold} strokeWidth="1.5"/>
      <text x="490" y="390" textAnchor="middle" fontSize="20" letterSpacing="4" fill={alternate?colors.wood:colors.paper}>剪纸 · 纸上有声</text>
    </g>
  </svg>;
};

/** A single bounded tile for the fast, dense merchandise wall. */
export const ProductCard:React.FC<{kind:ProductCardKind;variant?:number}> = ({kind,variant=0}) => {
  const video=kind==='video';
  const cover=kind==='cover'||video;
  return <svg width="420" height="380" viewBox="0 0 420 380" style={{fontFamily:FONT}}>
    <path d="M8 8H412V372H8Z" fill={colors.paper} stroke={colors.wood} strokeWidth="2.5"/>
    <path d="M17 17H403V363H17Z" fill="none" stroke={colors.gold} strokeWidth="1.5"/>
    {cover?<>
      <svg x="25" y="44" width="370" height="233" viewBox="0 0 700 440"><VideoCover variant={variant}/></svg>
      {video?<g transform="translate(29 291)" fill={colors.jade}>{Array.from({length:18},(_,i)=>{const h=8+(i%4)*5;return <path key={i} d={`M${i*20} ${17-h/2}h6v${h}h-6Z`}/>;})}</g>:<path d="M65 299H355" stroke={colors.gold} strokeWidth="1.5"/>}
    </>:<svg x="78" y="27" width="264" height="264" viewBox="0 0 300 300"><PaperProduct kind={kind} size={300}/></svg>}
    <text x="210" y="343" textAnchor="middle" fontSize="25" letterSpacing="5" fill={colors.ink}>{{cover:'封面包装',video:'热闹短片',sticker:'印花贴纸',keychain:'批量挂件',expression:'凤鸟小图'}[kind]}</text>
  </svg>;
};
