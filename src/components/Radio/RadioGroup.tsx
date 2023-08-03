import { RadioGroupProps, prefixGroupClass, RadioOptionType } from './constants';
import { Radio } from './Radio';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
export const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    value: propsValue,
    defaultValue,
    disabled = false,
    children,
    className,
    style,
    onChange,
    options: propOptions,
  } = props;

  useEffect(() => {
    if (propsValue) {
      setValue(propsValue);
    }
  }, [propsValue]);

  useEffect(() => {
    if (propOptions) {
      setOptions([...propOptions]);
    }
  }, [propOptions]);

  const groupWrapperCls = useMemo(() => {
    return classNames({
      [styles[`${prefixGroupClass}`]]: true,
      [className as string]: !!className,
    });
  }, [className]);

  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState<RadioOptionType[]>(propOptions || []);

  return (
    <div className={groupWrapperCls} style={style}>
      {options?.length > 0 &&
        options.map((option) => {
          const checked = option.value === value;
          return (
            <Radio key={option.label} value={option.value} name={name} checked={checked} disabled={disabled}>
              {option.label}
            </Radio>
          );
        })}
    </div>
  );
};
