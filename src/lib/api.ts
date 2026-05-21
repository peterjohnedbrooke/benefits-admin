  export class ApiError extends Error {
      constructor(
          public readonly status: number,
          message: string,
      ) {
          super(message);
          this.name = 'ApiError';
      }
  }
  
  async function request<T>(
      path: string,
      init: RequestInit = {},
  ): Promise<T> {
      const response = await fetch(path, {
          headers: { 'Content-Type': 'application/json' },
          ...init,
      });
  
      if (!response.ok) {
          throw new ApiError(
              response.status,
              `Request failed: ${response.status} ${response.statusText}`,
          );
      }
  
      return (await response.json()) as T;
  } 
  
  export function apiGet<T>(path: string): Promise<T> {
      return request<T>(path, { method: 'GET' });
  } 
  
  export function apiPatch<T>(path: string, body: unknown): Promise<T> {
      return request<T>(path, {
          method: 'PATCH',
          body: JSON.stringify(body),
      });
  } 