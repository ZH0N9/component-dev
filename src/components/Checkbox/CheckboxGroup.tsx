import { useEffect, useState, useMemo, useContext, MouseEventHandler } from 'react';
import { Checkbox } from './Checkbox';
import CheckboxContext from './context';
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
    children,
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

  const [value, setValue] = useState<Array<string | number>>(defaultValue || []);
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
    const targetChecked = target.checked;
    console.log('targetChecked: ', targetChecked);
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
      {options.length > 0 ? (
        options.map((option) => {
          const checked = value.findIndex((el) => el === option.value) !== -1;
          console.log('map checked', checked);
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
      ) : (
        <CheckboxContext.Provider value={{ value, disabled, onChange: handleCheckboxClick }}></CheckboxContext.Provider>
      )}
    </div>
  );
};
