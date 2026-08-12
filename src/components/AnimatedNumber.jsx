import React, { useState, useEffect } from 'react';

/**
 * AnimatedNumber smoothly counts up from 0 to the target value when it mounts or value changes.
 * Avoids heavy external animation dependencies.
 */
export default function AnimatedNumber({ value, decimals = 0, prefix = '', suffix = '' }) {
  const numericTarget = parseFloat(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isNaN(numericTarget)) {
      setCurrent(value);
      return;
    }
    
    let start = 0;
    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad timing function: f(t) = t * (2 - t)
      const ease = progress * (2 - progress);
      const val = ease * numericTarget;
      
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(numericTarget);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, numericTarget]);

  if (isNaN(numericTarget)) {
    return <span>{value}</span>;
  }

  // Format with Indian numbering system or standard commas if large
  const formatted = current.toFixed(decimals);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
