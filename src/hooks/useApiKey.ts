import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useApiKey() {
  const navigate = useNavigate();

  const checkApiKey = useCallback(() => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      navigate('/api-keys');
      return false;
    }
    return true;
  }, [navigate]);

  return { checkApiKey };
}
