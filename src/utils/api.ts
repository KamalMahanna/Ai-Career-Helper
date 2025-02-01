// api.ts

interface ApiRequestConfig {
  files?: File[];
  data?: Record<string, any>;
}

interface ApiError extends Error {
  status?: number;
  details?: string;
  code?: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function handleResourceExhausted<T>(retryFn: () => Promise<T>): Promise<T> {
  await sleep(60000); // Wait 60 seconds
  return retryFn();
}

function getHeaders(): HeadersInit {
  const apiKey = localStorage.getItem('gemini_api_key');
  return {
    'X-Gemini-Key': apiKey || '',
  };
}

export async function makeApiRequest(endpoint: string, config: ApiRequestConfig): Promise<string> {
  try {
    const formData = new FormData();
    
    if (config.files) {
      config.files.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file);
        }
      });
    }
    
    if (config.data) {
      formData.append('data', JSON.stringify(config.data));
    }

    const makeRequest = async (): Promise<string> => {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const error = new Error('API request failed') as ApiError;
        error.status = response.status;
        
        try {
          const errorData = await response.json();
          error.message = errorData.message || `API request failed with status ${response.status}`;
          error.details = errorData.details;
          error.code = errorData.code;
        } catch {
          error.message = `API request failed with status ${response.status}`;
        }
        
        // Handle API key and rate limit errors
        if (error.code === 'ResourceExhausted') {
          try {
            // Attempt to retry after waiting
            return await handleResourceExhausted(makeRequest);
          } catch (retryError) {
            // If retry also fails, clear API key and throw error
            localStorage.removeItem('gemini_api_key');
            const rateLimitError = new Error('API rate limit exceeded') as ApiError;
            rateLimitError.code = 'ResourceExhausted';
            throw rateLimitError;
          }
        }

        // Handle invalid API key errors
        if (error.code === 'InvalidKey' || 
            error.message.toLowerCase().includes('api key') || 
            error.message.toLowerCase().includes('invalid key')) {
          localStorage.removeItem('gemini_api_key');
          const invalidKeyError = new Error('Invalid API key') as ApiError;
          invalidKeyError.code = 'InvalidApiKey';
          throw invalidKeyError;
        }
        
        throw error;
      }

      const data = await response.text();
      if (!data) {
        throw new Error('No data received from the API');
      }

      return data;
    };

    return makeRequest();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please try again later.');
    }

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(message);
  }
}
