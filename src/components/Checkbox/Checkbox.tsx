import { useEffect, useState } from 'react';
import { CheckboxProps, prefixClass } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
export const Checkbox = (props: CheckboxProps) => {
  const {
    checked: porpsChecked,
    defaultChecked,
    name,
    value,
    children,
    className,
    style: propsStyle,
    onChange,
  } = props;
  useEffect(() => {
    if (typeof porpsChecked === 'boolean') {
      setChecked(porpsChecked);
    }
  }, [porpsChecked]);

  const [checked, setChecked] = useState(!!defaultChecked);
  const wrapperCls = classNames({
    [style[`${prefixClass}-wrapper`]]: true,
  });
  const checkboxCls = classNames({
    [style[`${prefixClass}`]]: true,
    [className as string]: !!className,
  });
  const checkboxInnerCls = classNames({
    [style[`${prefixClass}-inner`]]: true,
  });

  return (
    <label className={wrapperCls}>
      <span className={checkboxCls} style={propsStyle}>
        <input type="checkbox" value={value} name={name} />
        <span className={checkboxInnerCls}></span>
      </span>
      {children}
    </label>
  );
};
