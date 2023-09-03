import { RadioGroupProps, prefixGroupClass, RadioOptionType, RadioOptionAlignMap } from './constants';
import { Radio } from './Radio';
import RadioContext from './context';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
  // Children,
  // ReactNode,
  // ReactElement,
  // cloneElement,
  // ChangeEvent,
  ChangeEventHandler,
} from 'react';
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
    optionAlign = 'horizontal',
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

  const groupWrapperStyles = useMemo(() => {
    return {
      '--radioFlexDirection': RadioOptionAlignMap[optionAlign],
      ...style,
    };
  }, [style, optionAlign]);

  const groupWrapperCls = useMemo(() => {
    return classNames({
      [styles[`${prefixGroupClass}`]]: true,
      [className as string]: !!className,
    });
  }, [className]);

  const [value, setValue] = useState(defaultValue || '');
  const [options, setOptions] = useState<RadioOptionType[]>(propOptions || []);

  const handleRadioClick: MouseEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (disabled) {
        return;
      }
      console.log('group clicked');
      const radioEl = event.target as HTMLInputElement;
      const radioValue = radioEl.value;
      setValue(radioValue);
    },
    [disabled],
  );
  const handleRadioChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const radioEl = event.target as HTMLInputElement;
      const radioValue = radioEl.value;
      onChange && typeof onChange === 'function' && onChange(radioValue);
    },
    [onChange],
  );

  // Refined NEEDED
  // const radioChildren = Children.map(children, (child: ReactNode) => {
  //   const childEl = child as ReactElement;
  //   // TODO： <div> Radio>...<Radio> </div>
  //   const childType = childEl.type as React.JSXElementConstructor<any>;
  //   return childType === Radio
  //     ? cloneElement(childEl, {
  //         checked: childEl.props.value === value,
  //         disabled: disabled || childEl.props.disabled,
  //         onChange: handleRadioClick,
  //       })
  //     : null;
  // });

  return (
    <div className={groupWrapperCls} style={groupWrapperStyles}>
      {options.length > 0 ? (
        options.map((option) => {
          const checked = option.value === value;
          return (
            <Radio
              key={option.label}
              value={option.value}
              name={name}
              checked={checked}
              disabled={disabled || option.disabled}
              onChange={handleRadioChange}
              onClick={handleRadioClick}
            >
              {option.label}
            </Radio>
          );
        })
      ) : (
        <RadioContext.Provider value={{ value, disabled, onClick: handleRadioClick, onChange: handleRadioChange }}>
          {children}
        </RadioContext.Provider>
      )}
    </div>
  );
};
