import { ReactNode, CSSProperties, FormEvent, MouseEventHandler, FormEventHandler } from 'react';

type OptionType = 'default' | 'button';
type OptionAlign = 'horizontal' | 'vertical';
export enum RadioOptionAlignMap {
  'horizontal' = 'row',
  'vertical' = 'column',
}
export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  name?: string;
  // when checked = false, radio cannot be checked by click
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: FormEventHandler;
}
export interface RadioGroupProps {
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  name?: string;
  options?: Array<RadioOptionType>;
  optionType?: OptionType;
  optionAlign?: OptionAlign;
  onChange?: (checkedValue: string | number) => void;
}
export interface RadioOptionType {
  label?: string;
  value?: string;
  disabled?: boolean;
}

export const prefixClass = 'built-in-radio';
export const prefixGroupClass = 'built-in-radio-group';
