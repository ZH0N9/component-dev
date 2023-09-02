import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { AffixProps, prefixClass } from './constants';
import { SizeInfo } from '../../hooks/useElementResize';
import { throttle } from '../../utils';
import { getElementRect, getFixedTop, getFixedBottom } from './utils';
import useElementResize from '../../hooks/useElementResize';
import classNames from 'classnames';
import style from './index.module.scss';
/*
 ** @point: fixed时要添加额外的element进行占位 避免脱离文档流时下方的element发生位移
 */
type PlaceholderStyleType = {
  width?: number;
  height?: number;
};
type AffixStyleType = {
  position?: 'fixed';
  top?: number;
  bottom?: number;
  width?: number;
  height?: number;
};
type PositionType = {
  top: number;
  bottom: number;
};

export const Affix = (props: AffixProps) => {
  const {
    offsetTop: propOffsetTop,
    offsetBottom: propOffsetBottom,
    target = window,
    children,
    className,
    onChange,
    ...restProps
  } = props;

  const [affixStyle, setAffixStyle] = useState<AffixStyleType>();
  const [placeholderStyle, setPlaceholderStyle] = useState<PlaceholderStyleType>();
  const [affixed, setAffixed] = useState(false);
  const originPosition = useRef<PositionType>({ top: Infinity, bottom: Infinity });

  const affixCls = classNames({ [style[`${prefixClass}`]]: true, [className as string]: !!className });

  const getOffsetTop = () => {
    return propOffsetBottom === undefined && propOffsetTop === undefined ? 0 : propOffsetTop;
  };
  const getOffsetBottom = () => {
    return propOffsetBottom;
  };
  const handleReset = () => {
    setAffixStyle(undefined);
    setPlaceholderStyle(undefined);
    setAffixed(false);
    //  onChange && typeof onChange === 'function' && onChange(false);
  };
  const handleUpdateSize = (newSize: SizeInfo) => {
    // Only update when size change to avoid infinite loop at initial rendering
    if (placeholderStyle?.width === newSize.width && placeholderStyle?.height === newSize.height) {
      return;
    }
    setPlaceholderStyle({ ...newSize });
  };
  const handleUpdatePosition = () => {
    const { top: originTop, bottom: originBottom } = originPosition.current;
    if (!fixNodeRef.current || !target || (originTop === Infinity && originBottom === Infinity)) {
      return;
    }
    const fixedEl = fixNodeRef.current as HTMLDivElement;
    const offsetTop = getOffsetTop();
    const offsetBottom = getOffsetBottom();
    const fixedRect = getElementRect(fixedEl);
    const targetRect = getElementRect(target);

    const fixedTop = getFixedTop(targetRect, fixedRect, offsetTop);
    const fixedBottom = getFixedBottom(targetRect, fixedRect, offsetBottom);
    const scrollTop =
      typeof target === typeof window ? document.documentElement.scrollTop : (target as HTMLElement).scrollTop;
    // console.log(fixedRect.top);
    // console.log(window.innerHeight, window.innerHeight - fixedRect.bottom);
    // console.log('origin top -  scroll top', originTop - scrollTop);
    // console.log('scroll top', scrollTop);
    // if fixedTop undefined or original top has been already smaller than fixedTop, no operation
    if (fixedTop !== undefined) {
      const fixedNodeTop = fixedRect.top;
      if (fixedNodeTop <= fixedTop && !affixed) {
        setAffixStyle({
          position: 'fixed',
          top: fixedTop,
          width: fixedRect.width,
          height: fixedRect.height,
        });
        setPlaceholderStyle({ width: fixedRect.width, height: fixedRect.height });
        setAffixed(true);
      }
    }
    // if fixedBottom undefined or original bottom has been already higher than fixedBottom, no operation
    else if (fixedBottom !== undefined) {
      const fixedNodeBottom = window.innerHeight - fixedRect.bottom;
      if (fixedNodeBottom >= fixedBottom && !affixed) {
        console.log('set bottom styles');
        setAffixStyle({
          position: 'fixed',
          bottom: fixedBottom,
          width: fixedRect.width,
          height: fixedRect.height,
        });
        setPlaceholderStyle({ width: fixedRect.width, height: fixedRect.height });
        setAffixed(true);
      }
    }

    // TODO
    if (offsetTop !== undefined && affixed && originTop - scrollTop >= offsetTop) {
      handleReset();
    } else if (offsetBottom !== undefined && affixed && originBottom - scrollTop >= window.innerHeight - offsetBottom) {
      handleReset();
    }
  };

  const throttledHandleUpdatePosition = throttle(handleUpdatePosition, 1000 / 60);

  const fixNodeRef = useElementResize(handleUpdateSize);

  useEffect(() => {
    onChange && typeof onChange === 'function' && onChange(affixed);
  }, [affixed, onChange]);

  useLayoutEffect(() => {
    console.log('init effect');
    const fixedEl = fixNodeRef.current;
    const { top: originTop, bottom: originBottom } = originPosition.current;
    // Record the original position of the affixed element
    if (fixedEl && originTop === Infinity && originBottom === Infinity) {
      const { top, bottom } = getElementRect(fixedEl);
      originPosition.current = { top, bottom };
      handleUpdatePosition();
    }
    target.addEventListener('scroll', throttledHandleUpdatePosition);
    return () => {
      target.removeEventListener('scroll', throttledHandleUpdatePosition);
    };
  });

  return (
    <div {...restProps}>
      {affixStyle && <div aria-hidden={true} style={{ ...placeholderStyle }}></div>}
      <div className={affixCls} ref={fixNodeRef} style={affixStyle}>
        {children}
      </div>
    </div>
  );
};
