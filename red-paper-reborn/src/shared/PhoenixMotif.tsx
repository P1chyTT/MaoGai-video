import React from 'react';
import {colors} from './styleTokens';

const feathers=[{a:12,l:255},{a:23,l:305},{a:34,l:350},{a:45,l:380},{a:56,l:370},{a:67,l:350},{a:78,l:320},{a:89,l:285}];
const WingFan:React.FC<{cut?:boolean}> = ({cut=false}) => <g transform="translate(552 427)">{feathers.map(({a,l})=><g key={a} transform={`rotate(${a})`}>
  {cut?<>
    <path d={`M-2-50Q-10-${l*.6} 0-${l-42}Q14-${l*.6} 3-50Z`}/>
    <path d={`M0-${l-24}q-12-13 0-23q12 12 0 23Z`}/>
    {Array.from({length:6},(_,j)=>{const y=-l*.5-j*l*.055;return <g key={j}><path d={`M-10 ${y}q-9-6-7-15q10 5 10 13Z`}/><path d={`M11 ${y-5}q9-6 7-15q-10 5-10 13Z`}/></g>;})}
  </>:<path d={`M-9 10C-34-85-44-${l-65} 0-${l}C49-${l-65} 36-80 9 10Z`}/>}
</g>)}</g>;
const tails = [
  'M531 480C535 601 385 690 223 644C354 641 420 596 412 552C408 523 360 532 351 556C333 497 452 468 531 480Z',
  'M512 489C480 610 321 602 198 540C166 525 130 520 118 538C95 469 181 460 225 491C322 559 385 511 421 487Z',
  'M514 501C481 679 331 746 210 693C322 712 391 652 399 604C403 575 465 505 514 501Z',
  'M509 474C418 525 345 472 280 405C251 375 222 385 218 410C192 354 247 326 282 352C376 421 415 432 509 474Z',
  'M535 509C578 619 538 698 445 716C496 673 489 624 464 603Z',
];

const Blossom:React.FC<{x:number;y:number;s?:number}> = ({x,y,s=1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  {Array.from({length:8},(_,i)=><path key={i} d="M0 0C-31-13-41-52-21-57C-17-73 10-72 15-57C38-58 35-20 0 0Z" transform={`rotate(${i*45})`}/>)}
  <circle r="24"/>
</g>;
const BlossomHoles:React.FC<{x:number;y:number;s?:number}> = ({x,y,s=1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  {Array.from({length:8},(_,i)=><path key={i} d="M-4-27Q-19-40-17-51Q-2-51 2-31Z" transform={`rotate(${i*45})`}/>)}<circle r="9"/>
  {Array.from({length:8},(_,i)=><ellipse key={i} cx="0" cy="-17" rx="2.2" ry="4" transform={`rotate(${i*45})`}/>)}
</g>;

/** Hand-authored connected paper-cut. White builds one sheet; black paths carve its voids. */
export const PhoenixSilhouette = () => <g>
  <ellipse cx="500" cy="393" rx="421" ry="310" fill="none" strokeWidth="15" stroke="currentColor"/>
  <ellipse cx="500" cy="393" rx="400" ry="288" fill="none" strokeWidth="5" stroke="currentColor"/>
  {/* The curved breast, long neck, small head and hooked bill retain the folk phoenix profile. */}
  <path d="M618 412C604 456 564 500 524 519C458 548 413 520 425 478C436 442 477 421 463 376C451 340 409 333 400 303C387 270 399 235 433 225C451 204 474 215 482 234C486 244 484 256 477 267L505 282L471 286C470 317 500 335 521 355C547 381 552 396 560 413Z"/>
  <path d="M428 228C408 201 386 195 363 205C379 178 407 188 426 206C418 176 435 158 452 151C445 180 448 194 453 211C466 182 490 180 510 187C483 194 475 209 469 229Z"/>
  <path d="M398 273C363 268 343 285 321 276C335 299 371 295 401 289Z"/>
  <WingFan/>{tails.map(d=><path key={d} d={d}/>)}
  <g stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round"><path d="M512 503L557 570L613 591M548 570L538 593M557 570L579 599"/><path d="M556 489L604 539L665 543M604 539L621 563"/>
    <path d="M131 552C124 407 152 276 252 218C292 194 319 222 298 245C277 265 245 239 267 229"/>
    <path d="M752 640C784 583 865 566 859 497M686 690C680 619 743 577 784 595"/>
    <path d="M146 554C225 597 212 672 307 682M730 151Q673 111 640 166"/>
  </g>
  {Array.from({length:13},(_,i)=>{const a=(i*24+12)*Math.PI/180;const x=500+409*Math.cos(a),y=393+300*Math.sin(a);return <path key={i} d="M0 0Q-29-19-37-3Q-25 20 0 0Q18-33 31-25Q36-6 0 0Z" transform={`translate(${x} ${y}) rotate(${i*24+18})`}/>;})}
  {[[169,448,-25],[190,327,8],[215,271,30],[256,637,-40],[729,622,25],[797,580,45],[848,529,-20],[655,145,-70]].map(([x,y,r],i)=><path key={i} d="M0 0Q-46-58-50-8Q-42 22 0 0Q39-56 45-14Q44 13 0 0Z" transform={`translate(${x} ${y}) rotate(${r})`}/>)}
  <Blossom x={180} y={580} s={1.02}/><Blossom x={815} y={218} s={.95}/><Blossom x={688} y={651} s={.78}/>
</g>;

export const PhoenixHoles = () => <g>
  <path d="M452 260Q436 247 426 260Q438 276 452 260Z"/><circle cx="439" cy="260" r="3.4" fill="white"/>
  <path d="M423 299Q425 337 466 356Q501 375 486 414Q468 453 451 473Q492 449 503 417Q515 373 474 345Q437 325 438 297Z"/>
  <path d="M455 482Q472 468 491 471Q479 494 455 496ZM494 497Q509 474 527 469Q526 493 503 507Z"/>
  <WingFan cut/>
  <g fill="none" stroke="black" strokeWidth="4" strokeLinecap="round"><path d="M508 501C480 595 356 661 252 646M483 496C387 568 278 541 203 503M498 511C457 657 329 716 248 699M477 470C392 492 307 420 264 383M521 529Q549 631 482 690"/></g>
  {Array.from({length:14},(_,i)=>{const x=283+i*15,y=646-Math.sin(i/14*Math.PI)*34;return <path key={`t${i}`} d={`M${x} ${y}q-10-22 2-34q15 24 3 35Z`}/>;})}
  {Array.from({length:13},(_,i)=>{const x=229+i*16,y=507+Math.sin(i/13*Math.PI)*32;return <path key={`u${i}`} d={`M${x} ${y}q-10-25 1-31q14 12 4 32Z`}/>;})}
  <BlossomHoles x={180} y={580} s={1.02}/><BlossomHoles x={815} y={218} s={.95}/><BlossomHoles x={688} y={651} s={.78}/>
  {[[169,448,-25],[190,327,8],[215,271,30],[256,637,-40],[729,622,25],[797,580,45],[848,529,-20],[655,145,-70]].map(([x,y,r],i)=><path key={i} d="M-4-2L-39-14L-9-8ZM6-5L35-25L11-7Z" transform={`translate(${x} ${y}) rotate(${r})`}/>)}
</g>;

export const PhoenixMotif:React.FC<{id:string;holes?:number}> = ({id,holes=1}) => <svg viewBox="0 0 1000 760" width="100%" height="100%" style={{overflow:'visible'}}>
  <defs><mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="760"><g fill="white" color="white"><PhoenixSilhouette/></g><g fill="black" opacity={holes}><PhoenixHoles/></g></mask></defs>
  <rect width="1000" height="760" fill={colors.red} mask={`url(#${id})`}/>
</svg>;
