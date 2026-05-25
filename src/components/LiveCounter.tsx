import React, { useState, useEffect } from 'react';

type LiveCounterProps = {
  initialValue?: number;
  mode?: 'increment' | 'fluctuate';
  label?: string;
  minFluctuation?: number;
  maxFluctuation?: number;
};

export default function LiveCounter({
  initialValue = 146125,
  mode = 'increment',
  label = 'documents processed today',
  minFluctuation = -5,
  maxFluctuation = 10,
}: LiveCounterProps) {
  const [count, setCount] = useState(initialValue);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Generate an organic base number based on time of day (optional)
    if (mode === 'increment') {
      const baseDate = new Date();
      const hour = baseDate.getHours();
      const minute = baseDate.getMinutes();
      const simulatedTraffic = hour * 1234 + minute * 15;
      let localAdd = parseInt(localStorage.getItem('pastedocs_usage_local_add') || '0', 10);
      setCount(initialValue + simulatedTraffic + localAdd);
    }
  }, [initialValue, mode]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextUpdate = () => {
      // Random interval between 1.5s and 6s
      const nextInterval = Math.random() * (6000 - 1500) + 1500;
      
      timeoutId = setTimeout(() => {
        setCount((prevCount) => {
          let newCount = prevCount;
          
          if (mode === 'increment') {
            // Increment by a random number between 1 and 7
            const increment = Math.floor(Math.random() * 7) + 1;
            newCount = prevCount + increment;
          } else if (mode === 'fluctuate') {
            // Fluctuate randomly
            const shift = Math.floor(Math.random() * (maxFluctuation - minFluctuation + 1)) + minFluctuation;
            newCount = Math.max(initialValue + minFluctuation, prevCount + shift);
            newCount = Math.min(initialValue + maxFluctuation, newCount);
          }

          if (newCount !== prevCount) {
             // Trigger flash
             setIsFlashing(true);
             setTimeout(() => setIsFlashing(false), 300);
          }

          return newCount;
        });
        
        scheduleNextUpdate();
      }, nextInterval);
    };

    scheduleNextUpdate();

    return () => clearTimeout(timeoutId);
  }, [mode, initialValue, minFluctuation, maxFluctuation]);

  return (
    <div className="flex items-center justify-center gap-2 mt-4 mb-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <p className="text-[0.875rem] font-medium text-zinc-500">
        <span 
          className={`font-semibold transition-colors duration-300 ${
            isFlashing ? 'text-emerald-500 font-bold' : 'text-zinc-950'
          }`}
        >
          {count.toLocaleString()}
        </span>{' '}
        {label}
      </p>
    </div>
  );
}
