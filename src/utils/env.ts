const environment = import.meta.env;




export const variables = {
  "something": environment.VITE_SOMETHING,
  formspree: "https://formspree.io/f/xwpkjvle",
  SUPABASE_URL: environment.SUPABASE_URL,
  SUPABASE_ANON_KEY: environment.SUPABASE_ANON_KEY,

};
