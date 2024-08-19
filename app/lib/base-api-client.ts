// app/lib/api/base-api-client.ts

function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_BASE_URL;
  } else {
    // Client-side
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
}

const API_BASE_URL = getApiBaseUrl();

type FetchOptions = RequestInit & {
  isSSE?: boolean;
};

export async function baseFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const { isSSE, headers: rawHeaders, ...restOptions } = options;

  // Create a Headers object from the provided headers
  const headers = new Headers(rawHeaders);

  const fetchOptions: RequestInit = {
    ...restOptions,
    headers,
  };

  // Add Content-Type only if not SSE and not already set
  if (!isSSE && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (isSSE) {
    // Return the response for SSE handling
    return response as unknown as T;
  }

  // For non-SSE requests, parse JSON
  return response.json();
}

export function getAuthHeaders(credentials: string | null): HeadersInit {
  if (!credentials) {
    throw new Error('Credentials are required for authentication');
  }
  return {
    Authorization: `Basic ${credentials}`,
  };
}

// SSE specific function
/* eslint-disable */
export function handleSSE(response: Response, onMessage: (data: any) => void): void {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  function read() {
    reader?.read().then(({ done, value }) => {
      if (done) {
        console.log('SSE stream complete');
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      lines.forEach((line) => {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();
          try {
            const parsedData = JSON.parse(data);
            onMessage(parsedData);
          } catch (error) {
            console.error('Error parsing SSE data:', error);
          }
        }
      });

      read();
    });
  }

  read();
}
