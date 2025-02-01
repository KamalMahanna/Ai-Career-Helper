import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavigateWithError() {
  const navigate = useNavigate();

  type ApiKeyErrorType = 'invalid_key' | 'rate_limit';

  const navigateToApiKeys = useCallback((errorType?: ApiKeyErrorType) => {
    const searchParams = errorType ? `?error=${errorType}` : '';
    navigate(`/api-keys${searchParams}`);
  }, [navigate]);

  const handleApiError = useCallback((error: Error) => {
    if (error instanceof Error) {
      // @ts-ignore - custom error properties
      if (error.code === 'InvalidApiKey') {
        navigateToApiKeys('invalid_key');
        return;
      }
      // @ts-ignore - custom error properties
      if (error.code === 'ResourceExhausted') {
        navigateToApiKeys('rate_limit');
        return;
      }
    }
    throw error;
  }, [navigateToApiKeys]);

  return {
    navigateToApiKeys,
    handleApiError,
  };
}
