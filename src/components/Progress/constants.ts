import { CSSProperties, ReactNode } from 'react';

export enum ProgressTypeEnum {
  line = 'line',
  circle = 'circle',
}
export enum ProgressStrokeLineCapTypeEnum {
  round = 'round',
  square = 'square',
  butt = 'butt',
}
export enum ProgressSizeEnum {
  default = 'default',
  small = 'small',
  big = 'big',
}
export type ProgressStrokeColor = {
  from: string;
  to: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
};
export type ProgressSizeObj = {
  width: number;
  height: number;
};
export type ProgressSizeType = 'default' | 'small' | 'big';
export type ProgressType = 'line' | 'circle';
export type ProgressStrokeLineCapType = 'round' | 'square' | 'butt';

export interface ProgressProps {
  format?: (percent: number, successPercent?: number) => ReactNode;
  percentage?: number;
  showInfo?: boolean;
  strokeColor?: string | ProgressStrokeColor;
  trailColor?: string;
  className?: string;
  type?: ProgressType;
  size?: ProgressSizeType | ProgressSizeObj;
  strokeLinecap?: ProgressStrokeLineCapType;
  success?: { percent: number; strokeColor?: string };
  style?: CSSProperties;
}

export const prefixClass = 'built-in-progress';
