import style from './index.module.scss';
import { TextareaProps, prefixTextareaClass } from './constants';
import useElementResize from '../../hooks/useElementResize';
import classNames from 'classnames';
import { ChangeEvent, KeyboardEvent, ReactEventHandler, useEffect, useMemo, useRef, useState } from 'react';

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
    onChange,
    onResize,
    onPressEnter,
    onKeyDown,
    ...restProps
  } = props;

  const [value, setValue] = useState(defaultValue || '');
  const textareaRef = useElementResize(onResize);
  const textareaCls = classNames({
    [style[`${prefixTextareaClass}`]]: true,
  });
  const wrapperCls = classNames({
    [style[`${prefixTextareaClass}-wrapper`]]: true,
    [style[`${prefixTextareaClass}-wrapper-disabled`]]: disabled,
    [style[`${prefixTextareaClass}-wrapper-borderless`]]: !bordered,
  });
  const suffixView = useMemo(() => {
    return showCount && maxLength && maxLength >= 0 ? (
      <span className={style[`${prefixTextareaClass}-countSuffix`]}>
        {value.length} / {Math.round(maxLength)}
      </span>
    ) : null;
  }, [maxLength, showCount, value]);
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) {
      return;
    }
    if (!('value' in props)) {
      setValue(event?.target.value);
    }
    onChange && typeof onChange === 'function' && onChange(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = event.code;
    if (keyCode.toLowerCase() === 'enter') {
      onPressEnter && typeof onPressEnter === 'function' && onPressEnter(event);
    }
    onKeyDown && typeof onKeyDown === 'function' && onKeyDown(event);
  };
  const handleResize: ReactEventHandler<HTMLTextAreaElement> = (event) => {
    console.log(event.target);
  };

  useEffect(() => {
    if (textareaRef.current) {
      const textareaEl = textareaRef.current as HTMLTextAreaElement;
      textareaEl.addEventListener('resize', (e) => {
        console.log(e.target);
      });
    }
  });
  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  return (
    <span className={wrapperCls}>
      <textarea
        ref={textareaRef}
        className={textareaCls}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyDown}
        onResize={handleResize}
        {...restProps}
      />
      {suffixView}
    </span>
  );
};
