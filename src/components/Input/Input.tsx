import { ChangeEvent, useEffect, useMemo, useState, isValidElement, useCallback, KeyboardEvent } from 'react';
import { InputProps, prefixClass } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
import Icon from '../Icon';

export const Input = (props: InputProps) => {
  const {
    defaultValue,
    value: propValue,
    disabled,
    // TODO
    addOnAfter,
    // TODO
    addOnBefore,
    prefix,
    suffix,
    maxLength,
    showCount = false,
    allowClear,
    className,
    style: propStyle,
    bordered = true,
    onChange,
    onPressEnter,
    onKeyDown,
    ...restProps
  } = props;
  const [value, setValue] = useState<string>(defaultValue || '');

  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  const inputCls = classNames({
    [style[`${prefixClass}`]]: true,
    [className as string]: !!className,
  });
  const wrapperCls = classNames({
    [style[`${prefixClass}-wrapper`]]: true,
    [style[`${prefixClass}-wrapper-disabled`]]: disabled,
    [style[`${prefixClass}-wrapper-borderless`]]: !bordered,
    [style[`${prefixClass}-wrapper-affix`]]: prefix || suffix,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    if (!('value' in props)) {
      setValue(event.target.value);
    }
    onChange && typeof onChange === 'function' && onChange(event);
  };

  const handleClearClick = useCallback(() => {
    setValue('');
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.code;
    if (keyCode.toLowerCase() === 'enter') {
      onPressEnter && typeof onPressEnter === 'function' && onPressEnter(event);
    }
    onKeyDown && typeof onKeyDown === 'function' && onKeyDown(event);
  };

  const prefixView = useMemo(() => {
    return prefix ? <span className={style[`${prefixClass}-prefix`]}>{prefix}</span> : null;
  }, [prefix]);

  const suffixView = useMemo(() => {
    const clearSuffix = allowClear ? (
      <span
        className={classNames({
          [style[`${prefixClass}-clearIcon`]]: true,
          [style[`${prefixClass}-clearIcon-hidden`]]: !value,
        })}
        onClick={handleClearClick}
      >
        {isValidElement(allowClear) ? (
          allowClear
        ) : (
          <Icon className={style[`${prefixClass}-clearIcon-default`]} name="clear" />
        )}
      </span>
    ) : null;
    const countSuffix =
      showCount && maxLength && maxLength >= 0 ? (
        <span className={style[`${prefixClass}-countSuffix`]}>
          {value.length} / {Math.round(maxLength)}
        </span>
      ) : null;
    return suffix && clearSuffix && countSuffix ? (
      <span className={style[`${prefixClass}-suffix`]}>
        {clearSuffix}
        {countSuffix}
        {suffix ? suffix : null}
      </span>
    ) : null;
  }, [suffix, allowClear, value, showCount, maxLength, handleClearClick]);

  return (
    <span className={wrapperCls} style={propStyle}>
      {prefixView}
      <input
        type="text"
        value={value}
        disabled={disabled}
        className={inputCls}
        maxLength={maxLength}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suffixView}
    </span>
  );
};
