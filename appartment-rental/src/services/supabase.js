
import { createClient } from "@supabase/supabase-js";


export const URL = 'https://wknkuswncdinnzagutbg.supabase.co'

const API_KEY =
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrbmt1c3duY2Rpbm56YWd1dGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDg2MjUsImV4cCI6MjAyNjAyNDYyNX0.c3-2OWkI1MIQPJHAE1-zYKDsi7FdQX3g-SwJVBQ0s8U";
  
const supabase = createClient(URL, API_KEY); 

export default supabase; 