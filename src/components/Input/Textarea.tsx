import style from './index.module.scss';
import { TextareaProps, prefixTextareaClass } from './constants';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Textarea = (props: TextareaProps) => {
  const {
    defaultValue,
    value: propValue,
    disabled,
    maxLength,
    showCount = false,
    allowClear,
    className,
    style: propStyle,
    bordered = true,
    onResize,
    onPressEnter,
    onKeyDown,
    ...restProps
  } = props;

  const [value, setValue] = useState(defaultValue || '');
  const textareaCls = classNames({
    [style[`${prefixTextareaClass}`]]: true,
  });
  const wrapperCls = classNames({
    [style[`${prefixTextareaClass}-wrapper`]]: true,
    [style[`${prefixTextareaClass}-wrapper-disabled`]]: disabled,
    [style[`${prefixTextareaClass}-wrapper-borderless`]]: !bordered,
  });
  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  return (
    <span className={wrapperCls}>
      <textarea className={textareaCls} value={value} disabled={disabled} maxLength={maxLength} />
    </span>
  );
};
