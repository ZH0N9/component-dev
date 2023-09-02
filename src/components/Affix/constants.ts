import classNames from 'classnames';
import { ReactNode, CSSProperties } from 'react';
export interface AffixProps {
  children?: ReactNode;
  rootClassName?: string;
  className?: string;
  offsetBottom?: number;
  offsetTop?: number;
  target?: HTMLElement;
}

export const prefixClass = 'built-in-affix';
