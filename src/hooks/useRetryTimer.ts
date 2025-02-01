import { useState, useCallback, useEffect } from 'react';

interface UseRetryTimerProps {
  onRetry: () => Promise<void>;
}

export function useRetryTimer({ onRetry }: UseRetryTimerProps) {
  const [retrySeconds, setRetrySeconds] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const startRetryTimer = useCallback(() => {
    setRetrySeconds(60);
  }, []);

  useEffect(() => {
    if (retrySeconds > 0) {
      const timer = setInterval(() => {
        setRetrySeconds(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (retrySeconds === 0 && isRetrying) {
      setIsRetrying(false);
      onRetry();
    }
  }, [retrySeconds, isRetrying, onRetry]);

  const handleResourceExhausted = useCallback(() => {
    startRetryTimer();
    setIsRetrying(true);
  }, [startRetryTimer]);

  return {
    retrySeconds,
    isRetrying,
    handleResourceExhausted
  };
}
