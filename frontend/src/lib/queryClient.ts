import { QueryClient, QueryFunction } from "@tanstack/react-query";

// API Base URL configuration - CORRECTED
const getApiBaseUrl = () => {
  // Check for environment variable first
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }

  // Check if we're in production mode
  const isProduction = import.meta.env.MODE === 'production';
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If deployed on Render, point to backend
    if (hostname.includes('onrender.com')) {
      return isProduction 
        ? 'https://job-render-deploy-dummy-1.onrender.com' 
        : 'http://localhost:10000';
    }
    
    // For other deployments
    if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
      return isProduction 
        ? 'https://job-render-deploy-dummy-1.onrender.com' 
        : 'http://localhost:10000';
    }
  }
  
  // For local development - same server
  return '';
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const baseUrl = getApiBaseUrl();
  const fullUrl = baseUrl + url;
  
  console.log(`API Request: ${method} ${fullUrl}`); // Debug log
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const baseUrl = getApiBaseUrl();
    const url = baseUrl + "/" + queryKey.join("/");
    
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
