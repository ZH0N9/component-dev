import { ReactNode, CSSProperties, ChangeEvent, KeyboardEvent } from 'react';
export type InputProps = {
  id?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  showCount?: boolean;
  addOnBefore?: ReactNode;
  addOnAfter?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean | { clearIcon: ReactNode };
  disabled?: boolean;
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
} & Omit<React.HTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'>;

export const prefixClass = 'built-in-input';
