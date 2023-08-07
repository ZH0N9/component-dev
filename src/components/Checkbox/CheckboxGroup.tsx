import { useEffect, useState, useMemo, MouseEventHandler } from 'react';
import { Checkbox } from './Checkbox';
import { CheckboxGroupProps, prefixGroupClass, CheckboxOptionAlignMap, CheckboxOptionType } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    name,
    value: propValue,
    defaultValue,
    disabled,
    className,
    style: propStyle,
    options: propOptions,
    optionAlign = 'horizontal',
    onChange,
  } = props;
  useEffect(() => {
    if (propValue) {
      setValue([...propValue]);
    }
  }, [propValue]);
  useEffect(() => {
    if (propOptions) {
      setOptions([...propOptions]);
    }
  }, [propOptions]);

  const [value, setValue] = useState<string[]>(defaultValue || []);
  const [options, setOptions] = useState<CheckboxOptionType[]>(propOptions || []);

  const groupWrapperCls = useMemo(() => {
    return classNames({
      [style[`${prefixGroupClass}`]]: true,
      [className as string]: !!className,
    });
  }, [className]);

  const groupWrapperStyle = useMemo(() => {
    return {
      '--checkboxFlexDirection': CheckboxOptionAlignMap[optionAlign],
      ...propStyle,
    };
  }, [propStyle, optionAlign]);

  const handleCheckboxClick: MouseEventHandler = (event) => {
    const target = event.target as any;
    const targetValue = target.value;
    if (targetValue) {
      const idx = value.findIndex((el) => el === targetValue);
      const newValue = value;
      if (idx !== -1) {
        newValue.splice(idx, 1);
      } else {
        newValue.push(targetValue);
      }
      setValue([...newValue]);
    }
    onChange && typeof onChange === 'function' && onChange(event);
  };
  return (
    <div className={groupWrapperCls} style={groupWrapperStyle}>
      {options.length > 0
        ? options.map((option) => {
            const checked = value.findIndex((el) => el === option.value) !== -1;
            return (
              <Checkbox
                key={option.label}
                checked={checked}
                value={option.value}
                name={name}
                disabled={disabled || option.disabled}
                onChange={handleCheckboxClick}
              >
                {option.value}
              </Checkbox>
            );
          })
        : null}
    </div>
  );
};
