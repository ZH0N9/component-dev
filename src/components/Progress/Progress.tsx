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

const CIRCLE_NONE = -135;
const CIRCLE_FULL = 45;
export const Progress = (props: ProgressProps) => {
  const {
    format = (percentage) => `${percentage}%`,
    percentage = 0,
    strokeColor,
    trailColor = 'rgb(239 239 239)',
    showInfo = true,
    type = 'line',
    className,
    size = 'default',
    strokeLinecap = ProgressStrokeLineCapTypeEnum.round,
    success,
  } = props;
  const wrapperClassName = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-stroke-${strokeLinecap}`]]: strokeLinecap,
    [style[`${prefixClass}-line`]]: type === ProgressTypeEnum.line,
    [style[`${prefixClass}-circle`]]: type === ProgressTypeEnum.circle,
    [style[`${prefixClass}-small`]]: typeof size === 'string' && size === ProgressSizeEnum.small,
    [style[`${prefixClass}-big`]]: typeof size === 'string' && size === ProgressSizeEnum.big,
    [className as string]: !!className,
  });
  const progressClassName = classNames({ [style[`${prefixClass}-inner`]]: true });
  const progressInnerStyles = useMemo(() => {
    let progressInnerStyle = {
      '--trailColor': trailColor,
    } as CSSProperties;
    if (typeof size === 'object') {
      progressInnerStyle = Object.assign({ ...size });
    }
    return progressInnerStyle;
  }, [size, trailColor]);
  const progressLineStyles = useMemo(() => {
    const width = Math.round(percentage) < 100 ? `${Math.round(percentage)}%` : `100%`;
    const background = strokeColor
      ? {
          backgroundColor: typeof strokeColor === 'string' ? strokeColor : undefined,
          backgroundImage:
            typeof strokeColor === 'object'
              ? `linear-gradient(to ${strokeColor.direction || 'right'}, ${strokeColor.from} 0%, ${
                  strokeColor.to
                } 100%)`
              : undefined,
        }
      : undefined;
    return {
      width,
      ...background,
    };
  }, [percentage, strokeColor]);

  const progressCircleStyles = useMemo(() => {
    let leftRotation = CIRCLE_NONE;
    let rightRotation = CIRCLE_NONE;
    let colorLeft = 'orange';
    let colorRight = 'orange';
    if (strokeColor && typeof strokeColor === 'string') {
      colorLeft = strokeColor;
      colorRight = strokeColor;
    } else if (strokeColor && typeof strokeColor === 'object') {
      colorRight = `linear-gradient(to left, ${strokeColor.from} , ${strokeColor.to})`;
      colorLeft = `linear-gradient(to left, ${strokeColor.from} , ${strokeColor.to})`;
    }
    if (percentage <= 50) {
      rightRotation += (percentage / 100) * 360;
    } else {
      rightRotation = CIRCLE_FULL;
      leftRotation += ((percentage - 50) / 100) * 360;
    }
    return {
      '--leftRotation': `rotate(${leftRotation}deg)`,
      '--rightRotation': `rotate(${rightRotation}deg)`,
      '--backgroundColorLeft': colorLeft,
      '--backgroundColorRight': colorRight,
    } as CSSProperties;
  }, [percentage, strokeColor]);

  const progressView = () => {
    const progressLineView = (
      <>
        <div className={progressClassName} style={progressInnerStyles}>
          <div className={style[`${prefixClass}-bg`]} style={progressLineStyles}></div>
          {success && typeof success === 'object' && (
            <div
              className={style[`${prefixClass}-success-bg`]}
              style={{
                width: success.percent < 100 ? `${success.percent}%` : `100%`,
                backgroundColor: success.strokeColor ? success.strokeColor : undefined,
              }}
            ></div>
          )}
        </div>
        {showInfo && (
          <span className={style[`${prefixClass}-info`]}>{percentage < 100 ? format(percentage) : format(100)}</span>
        )}
      </>
    );

    const progressCircleView = (
      <>
        <div className={progressClassName} style={progressInnerStyles}>
          <div className={style[`${prefixClass}-circle-left-bg-wrapper`]} style={progressCircleStyles}>
            <div className={style[`${prefixClass}-circle-left-bg`]}></div>
          </div>
          <div className={style[`${prefixClass}-circle-right-bg-wrapper`]} style={progressCircleStyles}>
            <div className={style[`${prefixClass}-circle-right-bg`]}></div>
          </div>
          {showInfo && size !== ProgressSizeEnum.small && (
            <span className={style[`${prefixClass}-info`]}>{percentage < 100 ? format(percentage) : format(100)}</span>
          )}
        </div>
      </>
    );
    switch (type) {
      case ProgressTypeEnum.line:
        return progressLineView;
      case ProgressTypeEnum.circle:
        return progressCircleView;
      default:
        return progressLineView;
    }
  };

  return <div className={wrapperClassName}>{progressView()}</div>;
};
