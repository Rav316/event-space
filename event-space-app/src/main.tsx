import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/query-client.ts';
import { Toaster } from '@/components/ui';
import ScrollToTop from '@/utils/scroll-to-top.ts';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
    <Toaster position={'top-center'} />
  </QueryClientProvider>,
);
