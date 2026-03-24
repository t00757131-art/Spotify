import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ClerkProvider } from '@clerk/react';
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {dark} from "@clerk/themes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Toaster } from "sonner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{theme:dark}} afterSignOutUrl={'/'}>
         <BrowserRouter>
          <QueryClientProvider client={queryClient}>
             <TooltipProvider>
              <main>
                 <App />
              </main>
              <Toaster/>
             </TooltipProvider>
          </QueryClientProvider>
         </BrowserRouter>
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>
)
