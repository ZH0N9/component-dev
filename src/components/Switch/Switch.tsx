import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { SwitchProps, prefixClass } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
export const Switch = (props: SwitchProps) => {
  const {
    children,
    className,
    size = 'default',
    defatultChecked,
    checked: propChecked,
    disabled,
    checkedChildren,
    unCheckedChildren,
    onChange,
    onClick,
    ...restProps
  } = props;
  const [checked, setChecked] = useState(defatultChecked || false);
  const switcherRef = useRef<HTMLButtonElement>(null);
  const animated = useRef(false);
  const switchCls = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-${size}`]]: size,
    [style[`${prefixClass}-checked`]]: checked,
    [style[`${prefixClass}-disabled`]]: disabled,
    [style[`${prefixClass}-animated`]]: animated.current,
    [className as string]: !!className,
  });

  const handleSwitchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(!checked);
    }
    // activate animation css
    if (!animated.current) {
      animated.current = true;
    }
    onClick && typeof onClick === 'function' && onClick(!checked, event);
  };

  const handleChange = useCallback(
    (check: boolean, switcher: HTMLButtonElement) => {
      onChange && typeof onChange === 'function' && onChange(check, switcher);
    },
    [onChange],
  );
  useEffect(() => {
    if (typeof propChecked === 'boolean') {
      setChecked(propChecked);
    }
  }, [propChecked]);

  useEffect(() => {
    if (switcherRef.current) {
      const switcher = switcherRef.current;
      handleChange(checked, switcher);
    }
  }, [checked, handleChange]);

  return (
    <button
      ref={switcherRef}
      type="button"
      role="switch"
      className={switchCls}
      aria-checked={checked}
      onClick={handleSwitchClick}
    >
      <div className={style[`${prefixClass}-handler`]}></div>
      <span className={style[`${prefixClass}-inner`]}>
        {checkedChildren && <span className={style[`${prefixClass}-inner-checked`]}>{checkedChildren}</span>}
        {unCheckedChildren && <span className={style[`${prefixClass}-inner-unchecked`]}>{unCheckedChildren}</span>}
      </span>
    </button>
  );
};
