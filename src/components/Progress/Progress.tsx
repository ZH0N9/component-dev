import {
  ProgressProps,
  prefixClass,
  ProgressTypeEnum,
  ProgressStrokeLineCapTypeEnum,
  ProgressSizeEnum,
} from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
export const Progress = (props: ProgressProps) => {
  const {
    percentage = 0,
    strokeColor,
    trailColor,
    showInfo = true,
    type = 'line',
    className,
    size = 'default',
    strokeLinecap = ProgressStrokeLineCapTypeEnum.round,
    ...restProps
  } = props;
  const wrapperClassName = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-line`]]: type === ProgressTypeEnum.line,
    [style[`${prefixClass}-circle`]]: type === ProgressTypeEnum.circle,
    [style[`${prefixClass}-small`]]: typeof size === 'string' && size === ProgressSizeEnum.small,
    [className as string]: !!className,
  });
  const progressClassName = classNames({ [style[`${prefixClass}-inner`]]: true });
  const progressInnerStyles = useMemo(() => {
    let progressInnerStyle = {} as CSSProperties;
    if (typeof size === 'object') {
      progressInnerStyle = Object.assign({ ...size });
    }
    return progressInnerStyle;
  }, [size]);
  const progressStyles = useMemo(() => {
    const width = Math.round(percentage) < 100 ? `${Math.round(percentage)}%` : `100%`;
    const background = strokeColor
      ? {
          backgroundColor: typeof strokeColor === 'string' ? strokeColor : undefined,
          backgroundImage:
            typeof strokeColor === 'object'
              ? `linear-gradient(to ${strokeColor.direction || 'right'}, ${strokeColor.from} 0%, ${
                  strokeColor.to
                } 100%);`
              : undefined,
        }
      : undefined;
    return {
      width,
      ...background,
    };
  }, [percentage, strokeColor]);

  return (
    <div className={wrapperClassName}>
      <div className={progressClassName} style={progressInnerStyles}>
        <div className={style[`${prefixClass}-bg`]} style={progressStyles}></div>
      </div>
      {showInfo && (
        <span className={style[`${prefixClass}-info`]}>
          {Math.round(percentage) < 100 ? `${Math.round(percentage)}%` : `100%`}
        </span>
      )}
    </div>
  );
};
