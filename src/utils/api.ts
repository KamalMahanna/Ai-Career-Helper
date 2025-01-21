interface ApiRequestConfig {
  files?: File[];
  data?: Record<string, any>;
}

interface ApiError extends Error {
  status?: number;
  details?: string;
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

    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = new Error('API request failed') as ApiError;
      error.status = response.status;
      
      try {
        const errorData = await response.json();
        error.message = errorData.message || `API request failed with status ${response.status}`;
        error.details = errorData.details;
      } catch {
        error.message = `API request failed with status ${response.status}`;
      }
      
      throw error;
    }

    const data = await response.text();
    if (!data) {
      throw new Error('No data received from the API');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please try again later.');
    }
    
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}