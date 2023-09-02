import { useEffect, useState } from 'react';
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
    ...restProps
  } = props;

  const [affixStyle, setAffixStyle] = useState<AffixStyleType>();
  const [placeholderStyle, setPlaceholderStyle] = useState<PlaceholderStyleType>();

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
  };
  const handleUpdateSize = (newSize: SizeInfo) => {
    // Only update when size change to avoid infinite loop at initial rendering
    if (placeholderStyle?.width === newSize.width && placeholderStyle?.height === newSize.height) {
      return;
    }
    console.log('set size');
    setPlaceholderStyle({ ...newSize });
  };
  const handleUpdatePosition = () => {
    if (!fixNodeRef.current || !target) {
      return;
    }
    const fixEl = fixNodeRef.current as HTMLDivElement;
    const offsetTop = getOffsetTop();
    const offsetBottom = getOffsetBottom();
    const fixRect = getElementRect(fixEl);
    const targetRect = getElementRect(target);
    console.log(targetRect);
    const fixedTop = getFixedTop(targetRect, fixRect, offsetTop);
    const fixedBottom = getFixedBottom(targetRect, fixRect, offsetBottom);

    if (fixedTop !== undefined) {
      setAffixStyle({
        position: 'fixed',
        top: fixedTop,
        width: fixRect.width,
        height: fixRect.height,
      });
    } else if (fixedBottom !== undefined) {
      setAffixStyle({
        position: 'fixed',
        bottom: fixedBottom,
        width: fixRect.width,
        height: fixRect.height,
      });
    }
    const scrollTop =
      typeof target === typeof window ? document.documentElement.scrollTop : (target as HTMLElement).scrollTop;
    console.log(scrollTop);
    // TODO
    if ((offsetTop !== undefined && scrollTop < offsetTop) || offsetBottom !== undefined) {
      handleReset();
    }
  };

  const fixNodeRef = useElementResize(handleUpdateSize);

  useEffect(() => {
    console.log('init effect');
    const throttledHandleUpdatePosition = throttle(handleUpdatePosition, 1000 / 60);
    target.addEventListener('scroll', throttledHandleUpdatePosition);
    return () => {
      target.removeEventListener('scroll', throttledHandleUpdatePosition);
    };
  });

  return (
    <div {...restProps}>
      {affixStyle && <div aria-hidden={true} style={placeholderStyle}></div>}
      <div className={affixCls} ref={fixNodeRef} style={affixStyle}>
        {children}
      </div>
    </div>
  );
};
