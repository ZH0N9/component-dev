import { MouseEventHandler, useEffect, useRef, useState, useContext, ChangeEventHandler } from 'react';
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
    onClick,
    ...restProps
  } = props;

  const {
    value: groupValue,
    disabled: groupDisabled,
    onChange: groupOnChange,
    onClick: groupOnClick,
  } = useContext(RadioContext);
  const [checked, setChecked] = useState(defaultChecked || false);
  const [disabled, setDisabled] = useState(propDisabled || false);
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
      console.log(groupValue, value);
      setChecked(value === groupValue);
    }
  }, [groupValue, value]);

  useEffect(() => {
    console.log(value, checked);
  }, [checked, value]);

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

  const handleClick: MouseEventHandler<HTMLInputElement> = (event) => {
    console.log('click');
    if (groupDisabled || disabled) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(true);
    }
    if (inputRef.current) {
      const input = inputRef.current as HTMLInputElement;
      event.target = input;
    }
    onClick && typeof onClick === 'function' && onClick(event);
    groupOnClick && typeof groupOnClick === 'function' && groupOnClick(event);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    console.log(event.target.checked);
    onChange && typeof onChange === 'function' && onChange(event);
    groupOnChange && typeof groupOnChange === 'function' && groupOnChange(event);
  };

  return (
    <label className={wrapperCls}>
      <span className={radioCls} onClick={handleClick}>
        <input
          type="radio"
          checked={checked}
          value={value}
          ref={inputRef}
          disabled={groupDisabled || !!disabled}
          onChange={handleChange}
          onClick={(e) => {
            console.log(e.target);
          }}
          {...restProps}
        />
        <span className={radioInnerCls}></span>
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};
