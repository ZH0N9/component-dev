import { ReactNode, CSSProperties, FormEventHandler, MouseEventHandler } from 'react';

type OptionAlign = 'horizontal' | 'vertical';
export enum CheckboxOptionAlignMap {
  'horizontal' = 'row',
  'vertical' = 'column',
}

export type CheckboxGroupProps = {
  name?: string;
  disabled?: boolean;
  value?: Array<string | number>;
  defaultValue?: Array<string | number>;
  className?: string;
  style?: CSSProperties;
  options?: Array<CheckboxOptionType>;
  optionAlign?: OptionAlign;
  onChange?: (checkedValues: Array<string | number>) => void;
} & Omit<React.HTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'onChange'>;

export type CheckboxProps = {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string | number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: FormEventHandler;
  onClick?: MouseEventHandler;
} & Omit<React.HTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onClick'>;

export interface CheckboxOptionType {
  label?: string;
  value?: string;
  disabled?: boolean;
}

export const prefixClass = 'built-in-checkbox';
export const prefixGroupClass = 'built-in-checkbox-group';
