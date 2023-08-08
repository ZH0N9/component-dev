import { MouseEventHandler, useEffect, useRef, useState, useContext } from 'react';
import { RadioProps, prefixClass } from './constants';
import RadioContext from './context';
import style from './index.module.scss';
import classNames from 'classnames';
export const Radio = (props: RadioProps) => {
  const {
    value,
    children,
    className,
    defaultChecked = false,
    checked: propChecked,
    disabled: propDisabled,
    style: propsStyle,
    onChange,
    ...restProps
  } = props;

  const [checked, setChecked] = useState<Boolean>(!!defaultChecked);
  const [disabled, setDisabled] = useState<Boolean>(!!propDisabled);
  const { value: groupValue, disabled: groupDisabled, onChange: groupOnChange } = useContext(RadioContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof propChecked === 'boolean') {
      setChecked(propChecked);
    }
  }, [propChecked]);
  useEffect(() => {
    if (typeof propDisabled === 'boolean') {
      setDisabled(propDisabled);
    }
  }, [propDisabled]);
  // Group Controlled
  useEffect(() => {
    if (groupValue) {
      setChecked(value === groupValue);
    }
  }, [groupValue, value]);

  const wrapperCls = classNames({
    [style[`${prefixClass}-wrapper`]]: true,
    [style[`${prefixClass}-wrapper-disabled`]]: disabled,
  });
  const radioCls = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-checked`]]: checked,
    [className as string]: !!className,
  });
  const radioInnerCls = classNames({
    [style[`${prefixClass}-inner`]]: true,
  });

  const handleClick: MouseEventHandler = (event) => {
    if (groupDisabled || disabled || checked) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(true);
    }
    if (inputRef.current) {
      event.target = inputRef.current;
    }
    onChange && typeof onChange === 'function' && onChange(event);
    groupOnChange && typeof groupOnChange === 'function' && groupOnChange(event);
  };

  return (
    <label className={wrapperCls}>
      <span className={radioCls}>
        <input
          type="radio"
          checked={!!checked}
          value={value}
          ref={inputRef}
          disabled={groupDisabled || !!disabled}
          onClick={handleClick}
          readOnly
          {...restProps}
        />
        <span className={radioInnerCls}></span>
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};
