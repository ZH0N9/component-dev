import { useEffect, useState, useMemo, MouseEventHandler, ChangeEventHandler } from 'react';
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

  const [value, setValue] = useState<Array<string | number>>(defaultValue || propValue || []);
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
    console.log('targetValue : ', targetValue);

    const newValue = value;
    if (targetValue) {
      const idx = value.findIndex((el) => el === targetValue);
      if (idx !== -1) {
        newValue.splice(idx, 1);
      } else {
        newValue.push(targetValue);
      }
      setValue([...newValue]);
    }
  };
  const handleCheckboxChange: ChangeEventHandler = (event) => {
    const target = event.target as any;
    const targetValue = target.value;
    const newValue = value;
    if (targetValue) {
      const idx = value.findIndex((el) => el === targetValue);
      if (idx !== -1) {
        newValue.splice(idx, 1);
      } else {
        newValue.push(targetValue);
      }
    }
    console.log('group change', newValue);
    onChange && typeof onChange === 'function' && onChange(newValue);
  };
  return (
    <div className={groupWrapperCls} style={groupWrapperStyle}>
      {options.length > 0 ? (
        options.map((option) => {
          const checked = value.findIndex((el) => el === option.value) !== -1;
          return (
            <Checkbox
              key={option.label}
              checked={checked}
              value={option.value}
              name={name}
              disabled={disabled || option.disabled}
              onChange={handleCheckboxChange}
              onClick={handleCheckboxClick}
            >
              {option.value}
            </Checkbox>
          );
        })
      ) : (
        <CheckboxContext.Provider
          value={{ value, disabled, onChange: handleCheckboxChange, onClick: handleCheckboxClick }}
        >
          {children}
        </CheckboxContext.Provider>
      )}
    </div>
  );
};
