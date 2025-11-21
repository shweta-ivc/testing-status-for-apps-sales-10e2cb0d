import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createUser({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })

  if (error) throw error
  return data
}

export async function signInUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function getStoreVisits(userId) {
  const { data, error } = await supabase
    .from('store_visits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getStoreVisitById(id) {
  const { data, error } = await supabase
    .from('store_visits')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createStoreVisit(visitData) {
  const { data, error } = await supabase
    .from('store_visits')
    .insert([visitData])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStoreVisit(id, updates) {
  const { data, error } = await supabase
    .from('store_visits')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteStoreVisit(id) {
  const { error } = await supabase
    .from('store_visits')
    .delete()
    .eq('id', id)

  if (error) throw error
}