import { ReactEventHandler, useCallback, useEffect, useRef } from 'react';

export type ResizeObject = {
  width: number;
  height: number;
};
export const useElementResize = (callback?: (resizeObj: ResizeObject) => void) => {
  const observedRef = useRef(null);
  const observeCallback = useCallback(
    (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      entries.forEach((entry) => {
        const { inlineSize: width, blockSize: height } = entry?.borderBoxSize[0];
        if (width && height) {
          callback && typeof callback === 'function' && callback({ width, height });
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
