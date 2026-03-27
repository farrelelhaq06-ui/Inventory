import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

export async function middleware(request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Example protection: redirect to login if not authenticated
    if (!user && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (e) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*', '/transactions/:path*'],
}
