import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*, categories(name)')
  if (error) throw error
  return data || []
}

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const createProduct = async (product) => {
  const { data, error } = await supabase.from('products').insert([product]).select()
  if (error) throw error
  return data[0]
}

export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}
