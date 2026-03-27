import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, products(name)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export const createTransaction = async (trx) => {
  // Get current product stock
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', trx.product_id)
    .single()

  if (fetchError) throw fetchError

  const newStock =
    trx.type === 'in'
      ? product.stock + trx.quantity
      : product.stock - trx.quantity

  if (newStock < 0) throw new Error('Stock not enough')

  // Insert transaction
  const { error: insertError } = await supabase
    .from('transactions')
    .insert([trx])
  if (insertError) throw insertError

  // Update product stock
  const { error: updateError } = await supabase
    .from('products')
    .update({ stock: newStock })
    .eq('id', trx.product_id)
  if (updateError) throw updateError
}
