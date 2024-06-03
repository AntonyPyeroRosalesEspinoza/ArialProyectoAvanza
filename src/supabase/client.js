import {createClient} from '@supabase/supabase-js'

// Conectando con la variable de entorno para conectar con SUPABASE
export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL, 
    process.env.REACT_APP_SUPABASE_ANON_KEYS
)



