import { useEffect, useState, useLayoutEffect } from 'react';
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
  };
  const handleUpdateSize = (newSize: SizeInfo) => {
    console.log('resize');
    // Only update when size change to avoid infinite loop at initial rendering
    if (placeholderStyle?.width === newSize.width && placeholderStyle?.height === newSize.height) {
      return;
    }
    setPlaceholderStyle({ ...newSize });
  };
  const handleUpdatePosition = () => {
    if (!fixNodeRef.current || !target || !placeholderNodeRef.current) {
      return;
    }
    const placeholderEl = placeholderNodeRef.current as HTMLDivElement;
    const placeholderRect = getElementRect(placeholderEl);
    if (
      placeholderRect.width === 0 &&
      placeholderRect.height === 0 &&
      placeholderRect.top === 0 &&
      placeholderRect.left === 0
    ) {
      return;
    }
    const offsetTop = getOffsetTop();
    const offsetBottom = getOffsetBottom();
    const placeholderNodeTop = placeholderRect.top;
    const placeholderNodeBottom = window.innerHeight - placeholderRect.bottom;
    const targetRect = getElementRect(target);

    const fixedTop = getFixedTop(targetRect, placeholderRect, offsetTop);
    const fixedBottom = getFixedBottom(targetRect, placeholderRect, offsetBottom);
    if (fixedTop !== undefined) {
      if (placeholderNodeTop <= fixedTop && !affixed) {
        setAffixStyle({
          position: 'fixed',
          top: fixedTop,
          width: placeholderRect.width,
          height: placeholderRect.height,
        });
        setPlaceholderStyle({ width: placeholderRect.width, height: placeholderRect.height });
        setAffixed(true);
      }
    }
    // if fixedBottom undefined or original bottom has been already higher than fixedBottom, no operation
    else if (fixedBottom !== undefined) {
      if (placeholderNodeBottom >= fixedBottom && !affixed) {
        setAffixStyle({
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderRect.width,
          height: placeholderRect.height,
        });
        setPlaceholderStyle({ width: placeholderRect.width, height: placeholderRect.height });
        setAffixed(true);
      }
    }

    if ((fixedTop === undefined && affixStyle?.top) || (fixedBottom === undefined && affixStyle?.bottom)) {
      handleReset();
    }
  };

  const throttledHandleUpdatePosition = throttle(handleUpdatePosition, 1000 / 60);

  const fixNodeRef = useElementResize(handleUpdateSize);
  const placeholderNodeRef = useElementResize(handleUpdateSize);

  useEffect(() => {
    onChange && typeof onChange === 'function' && onChange(affixed);
  }, [affixed, onChange]);

  useLayoutEffect(() => {
    console.log('init effect');
    handleUpdatePosition();
    target.addEventListener('scroll', throttledHandleUpdatePosition);
    return () => {
      target.removeEventListener('scroll', throttledHandleUpdatePosition);
    };
  });

  return (
    <div ref={placeholderNodeRef} {...restProps}>
      {affixStyle && <div aria-hidden={true} style={{ ...placeholderStyle }}></div>}
      <div className={affixCls} ref={fixNodeRef} style={affixStyle}>
        {children}
      </div>
    </div>
  );
};
