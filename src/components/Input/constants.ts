import { ReactNode, CSSProperties, ChangeEvent, KeyboardEvent } from 'react';
import { SizeInfo } from '../../hooks/useElementResize';
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

interface TextareaAutoSizeObject {
  minRows?: number;
  maxRows?: number;
}
export type TextareaProps = {
  id?: string;
  value?: string;
  defaultValue?: string;
  autoSize?: boolean | TextareaAutoSizeObject;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean | { clearIcon: ReactNode };
  disabled?: boolean;
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
  onPressEnter?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onResize?: (size: SizeInfo) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} & Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'onResize'>;

export const prefixClass = 'built-in-input';
export const prefixTextareaClass = 'built-in-textarea';
