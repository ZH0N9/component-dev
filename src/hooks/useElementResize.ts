import { useCallback, useEffect, useRef } from 'react';
/*
 * @params: onResize callback
 * @description: observer Element resize behaviour and return ref of the observerd Element
 */
export interface SizeInfo {
  width: number;
  height: number;
}
export const useElementResize = (callback?: (size: SizeInfo, element: HTMLElement) => void) => {
  const observedRef = useRef(null);
  const observeCallback = useCallback(
    (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const { inlineSize: width, blockSize: height } = entry?.borderBoxSize[0];
        if (width && height) {
          callback && typeof callback === 'function' && callback({ width, height }, element);
        }
      });
    },
    [callback],
  );
  useEffect(() => {
    const observedEl = observedRef.current;
    const resizeObserver = new ResizeObserver(observeCallback);
    observedEl && resizeObserver.observe(observedEl);
    return () => {
      observedEl && resizeObserver.unobserve(observedEl);
    };
  }, [observedRef, observeCallback]);
  return observedRef;
};

export default useElementResize;
