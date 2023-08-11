import { MouseEventHandler, useEffect, useRef, useState, useContext } from 'react';
import { CheckboxProps, prefixClass } from './constants';
import CheckboxContext from './context';
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

  const [checked, setChecked] = useState<Boolean>(defaultChecked || false);
  const inputRef = useRef(null);
  // Controlled by CheckboxGroup
  const { value: groupValues, disabled: groupDisabled, onChange: groupOnChange } = useContext(CheckboxContext);

  useEffect(() => {
    if (typeof propChecked === 'boolean') {
      setChecked(propChecked);
    }
  }, [propChecked]);

  // Controlled by CheckboxGroup
  useEffect(() => {
    if (groupValues && value !== undefined) {
      const checkedInGroup = groupValues.indexOf(value) > -1;
      setChecked(checkedInGroup);
    }
  }, [groupValues, value]);

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
    if (disabled || groupDisabled) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(!checked);
    }
    if (inputRef.current) {
      event.target = inputRef.current;
    }
    onChange && typeof onChange === 'function' && onChange(event);
    groupOnChange && typeof groupOnChange === 'function' && groupOnChange(event);
  };

  return (
    <label className={wrapperCls}>
      <span className={checkboxCls} style={propStyle}>
        <input
          className={style[`${prefixClass}-input`]}
          disabled={groupDisabled || disabled}
          checked={!!checked}
          type="checkbox"
          value={value}
          name={name}
          ref={inputRef}
          onClick={handleClick}
          //readOnly
          {...restProps}
        />
        <span className={checkboxInnerCls}></span>
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};
