import style from './index.module.scss';
import { TextareaProps, prefixTextareaClass } from './constants';
import useElementResize from '../../hooks/useElementResize';
import classNames from 'classnames';
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState, useRef } from 'react';

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
  const [height, setHeight] = useState(-Infinity);

  const minHeightRef = useRef<number>();
  const maxHeightRef = useRef<number>();
  // onResize Ref
  const textareaResizeRef = useElementResize(onResize);
  // end
  const textareaNormalRef = useRef(null);
  const textareaRef = onResize && typeof onResize === 'function' ? textareaResizeRef : textareaNormalRef;
  const textareaFakeRef = useRef(null);
  console.log('rerender');
  // Auto size #1
  const textareaStyles = useMemo(() => {
    let sizeStyle;
    if (autoSize && height !== -Infinity) {
      sizeStyle = {
        minHeight: minHeightRef.current ? minHeightRef.current : '',
        maxHeight: maxHeightRef.current ? maxHeightRef.current : '',
        // minHeight:
        //   typeof autoSize === 'object' && autoSize.minRows
        //     ? autoSize.minRows * lineHeightRef.current + heightRef.current
        //     : '',
        // maxHeight:
        //   typeof autoSize === 'object' && autoSize.maxRows
        //     ? autoSize.maxRows * lineHeightRef.current + heightRef.current
        //     : '',
        height: height,
      };
    }
    return {
      ...propStyle,
      ...sizeStyle,
    };
  }, [propStyle, autoSize, height, minHeightRef, maxHeightRef]);

  const textareaCls = classNames({
    [style[`${prefixTextareaClass}`]]: true,
    [style[`${prefixTextareaClass}-autoSize`]]: !!autoSize,
    [style[`${prefixTextareaClass}-scrollbarless`]]: maxHeightRef.current
      ? height <= maxHeightRef.current
        ? true
        : false
      : true,
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

  // fake textarea element to control the auto size
  const fakeTextAreaView = useMemo(() => {
    return (
      <textarea
        ref={textareaFakeRef}
        className={style[`${prefixTextareaClass}`]}
        style={{ visibility: 'hidden', position: 'absolute', top: '-1000px', left: 0, right: 0, zIndex: -999 }}
        disabled={disabled}
        maxLength={maxLength}
      />
    );
  }, [disabled, maxLength]);

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
    if (textareaFakeRef.current) {
      const fakeTextAreaEl = textareaFakeRef.current as HTMLTextAreaElement;
      if (typeof autoSize === 'object') {
        const { minRows, maxRows } = autoSize;
        fakeTextAreaEl.setAttribute('rows', `${minRows}`);
        minHeightRef.current = fakeTextAreaEl.clientHeight;

        fakeTextAreaEl.setAttribute('rows', `${maxRows}`);
        maxHeightRef.current = fakeTextAreaEl.clientHeight;

        fakeTextAreaEl.setAttribute('rows', `1`);
        // Auto size #1
        // const textAreaEl = textareaRef.current as HTMLTextAreaElement;
        // const { paddingTop, paddingBottom, lineHeight, borderTopWidth, borderBottomWidth } =
        //  window.getComputedStyle(textAreaEl);
        // const contentHeight =
        //   parseFloat(paddingTop) + parseFloat(paddingBottom) + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth);
        // const fontLineHeight = parseFloat(lineHeight);
        // heightRef.current = contentHeight;
        // lineHeightRef.current = fontLineHeight;
      }
    }
  });

  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  useEffect(() => {
    if (autoSize && textareaFakeRef.current) {
      const fakeTextAreaEl = textareaFakeRef.current as HTMLTextAreaElement;
      fakeTextAreaEl.value = value;
      const newHeight = fakeTextAreaEl.scrollHeight;
      setHeight(newHeight);
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
      {autoSize ? fakeTextAreaView : null}
    </span>
  );
};
