import { useState, useEffect } from 'react';

export const useCountUp = (endValue, duration = 1200, isDecimal = false, shouldStart = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const end = parseFloat(endValue) || 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic calculation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * end;

      if (progress < 1) {
        setCount(isDecimal ? parseFloat(currentVal.toFixed(1)) : Math.round(currentVal));
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animId);
  }, [endValue, duration, isDecimal, shouldStart]);

  return count;
};
