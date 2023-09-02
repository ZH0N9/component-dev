export const getElementRect = (target: HTMLElement | Window) => {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as DOMRect);
};

export const getFixedTop = (targetRect: DOMRect, fixRect: DOMRect, offsetTop?: number) => {
  // the fixEl reach the offset top threshold
  if (offsetTop !== undefined && targetRect.top >= fixRect.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
};
export const getFixedBottom = (targetRect: DOMRect, fixRect: DOMRect, offsetBottom?: number) => {
  // the fixEl reach the offset top threshold
  if (offsetBottom !== undefined && targetRect.bottom >= fixRect.bottom + offsetBottom) {
    return window.innerHeight - targetRect.bottom + offsetBottom;
  }
  return undefined;
};
