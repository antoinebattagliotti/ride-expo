import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://mttjvcobhypaxajupleq.supabase.co' as const
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dGp2Y29iaHlwYXhhanVwbGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTI5NzcsImV4cCI6MjA0MjQ4ODk3N30.hjpSlLiltQTPN2ZdjzCSuZPUPIha36fgjlIvjjNKGas' as const

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
