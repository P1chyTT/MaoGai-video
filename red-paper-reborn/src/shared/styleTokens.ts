import {Easing, interpolate} from 'remotion';
export const colors = {paper:'#F2E5CB', red:'#A52A2C', jade:'#246166', gold:'#C79540', ink:'#2D1E1B', wood:'#705037'};
export const ease = Easing.bezier(0.42,0,0.22,1);
export const tween = (f:number,a:number,b:number,x=0,y=1) => interpolate(f,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const FONT = 'FangSong, STFangsong, SimSun, serif';
