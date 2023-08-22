import style from './index.module.scss';
import { TextareaProps, prefixTextareaClass } from './constants';
import useElementResize from '../../hooks/useElementResize';
import classNames from 'classnames';
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState, useRef, useLayoutEffect } from 'react';

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
    autoSize,
    onChange,
    onResize,
    onPressEnter,
    onKeyDown,
    ...restProps
  } = props;

  const [value, setValue] = useState(defaultValue || '');
  const [row, setRow] = useState(-Infinity);
  const lineHeightRef = useRef<number>();
  const heightRef = useRef<number>();
  // onResize Ref
  const textareaResizeRef = useElementResize(onResize);
  // end
  const textareaNormalRef = useRef(null);
  const textareaRef = onResize && typeof onResize === 'function' ? textareaResizeRef : textareaNormalRef;
  console.log('rerender');
  const textareaStyles = useMemo(() => {
    let sizeStyle;
    if (lineHeightRef.current && heightRef.current && row !== -Infinity) {
      sizeStyle = {
        minHeight:
          typeof autoSize === 'object' && autoSize.minRows
            ? autoSize.minRows * lineHeightRef.current + heightRef.current
            : 'unset',
        maxHeight:
          typeof autoSize === 'object' && autoSize.maxRows
            ? autoSize.maxRows * lineHeightRef.current + heightRef.current
            : 'unset',
        height: row * lineHeightRef.current + heightRef.current,
      };
    }
    return {
      ...propStyle,
      ...sizeStyle,
    };
  }, [propStyle, heightRef, lineHeightRef, autoSize, row]);
  const textareaCls = classNames({
    [style[`${prefixTextareaClass}`]]: true,
    [style[`${prefixTextareaClass}-autoSize`]]: !!autoSize,
    [style[`${prefixTextareaClass}-scrollbarless`]]:
      typeof autoSize === 'object' && autoSize.maxRows ? (row <= autoSize.maxRows ? true : false) : true,
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

  useEffect(() => {
    if (textareaRef.current) {
      const textAreaEl = textareaRef.current as HTMLTextAreaElement;
      const { paddingTop, paddingBottom, lineHeight, borderTopWidth, borderBottomWidth } =
        window.getComputedStyle(textAreaEl);
      heightRef.current =
        parseFloat(paddingTop) + parseFloat(paddingBottom) + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth);
      lineHeightRef.current = parseFloat(lineHeight);
    }
  });

  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  useEffect(() => {
    if (!!autoSize) {
      const newRow = value.split('\n').length;
      setRow(newRow);
    }
  }, [value, autoSize]);

  return (
    <span className={wrapperCls}>
      <textarea
        ref={textareaRef}
        className={textareaCls}
        style={textareaStyles}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suffixView}
    </span>
  );
};
