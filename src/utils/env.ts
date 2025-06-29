const environment = import.meta.env;

export const variables = {
  VITE_FORMSPREE: environment.VITE_FORMSPREE,
  VITE_SUPABASE_URL: environment.VITE_SUPABASE_URL,             
  VITE_SUPABASE_ANON_KEY: environment.VITE_SUPABASE_ANON_KEY,   
  VITE_PAYSTACK_PUBLIC_KEY: environment.VITE_PAYSTACK_PUBLIC_KEY,
};
