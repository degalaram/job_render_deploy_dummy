import { QueryClient } from "@tanstack/react-query";

const getApiBaseUrl = () => {
  // Check for environment variable first
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }

  // In development, use relative URLs (same server)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If deployed on separate platforms, point to backend
    if (hostname.includes('onrender.com') || hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
      // This will be your Render backend URL (you'll get this after deployment)
      return process.env.NODE_ENV === 'production' 
        ? 'https://job-render-deploy-dummy-1.onrender.com' 
        : 'http://localhost:10000';
    }
  }
  
  // For local development and same-server deployments
  return '';
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// API fetch function
export const api = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
