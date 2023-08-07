import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { CheckboxProps, prefixClass } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
export const Checkbox = (props: CheckboxProps) => {
  const {
    checked: propChecked,
    defaultChecked,
    disabled,
    name,
    value,
    children,
    className,
    style: propStyle,
    onChange,
    ...restProps
  } = props;
  useEffect(() => {
    if (typeof propChecked === 'boolean') {
      setChecked(propChecked);
    }
  }, [propChecked]);

  const [checked, setChecked] = useState(!!defaultChecked);
  const inputRef = useRef(null);

  const wrapperCls = classNames({
    [style[`${prefixClass}-wrapper`]]: true,
    [style[`${prefixClass}-wrapper-disabled`]]: !!disabled,
  });
  const checkboxCls = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-checked`]]: !!checked,
    [className as string]: !!className,
  });
  const checkboxInnerCls = classNames({
    [style[`${prefixClass}-inner`]]: true,
  });

  const handleClick: MouseEventHandler = (event) => {
    if (disabled) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(!checked);
    }
    if (inputRef.current) {
      event.target = inputRef.current;
    }
    onChange && typeof onChange === 'function' && onChange(event);
  };

  return (
    <label className={wrapperCls}>
      <span className={checkboxCls} style={propStyle} onClick={handleClick}>
        <input
          className={style[`${prefixClass}-input`]}
          disabled={!!disabled}
          checked={!!checked}
          type="checkbox"
          value={value}
          name={name}
          ref={inputRef}
          {...restProps}
        />
        <span className={checkboxInnerCls}></span>
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};
