type ThrottleFunction = (...args: any[]) => void;
const throttle = (fn: (...args: any[]) => void, time: number) => {
  let throttleTimer: NodeJS.Timeout | null = null;
  const throttled: ThrottleFunction = (...args: any[]) => {
    if (throttleTimer) {
      return;
    }
    throttleTimer = setTimeout(() => {
      fn.apply(this, args);
      throttleTimer = null;
    }, time);
  };
  return throttled;
};

export default throttle;
