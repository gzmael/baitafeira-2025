import type { StoreTypeUser, TypeUser } from '@/generated/prisma/client'
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

import { validatePathByRole } from '../utils'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          request.cookies.set({ name, value, ...options })
        }
        supabaseResponse = NextResponse.next({
          request,
        })
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options)
        }
      },
    },
  })

  const paths = {
    signInAccount: '/conta/entrar',
    signInStore: '/loja/entrar',
    signInKratos: '/kratos/entrar',
    private: ['/conta', '/loja/', '/kratos', '/api'],
    guest: ['/confirmacao', '/recuperar-senha', '/nova-senha', '/cadastro'],
    api: ['/api/'],
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPath = (paths: string[]) =>
    paths.some((path) => request.nextUrl.pathname.startsWith(path))
  const isPrivatePath = isPath(paths.private)
  const isGuestPath = isPath(paths.guest)
  const isApiPath = isPath(paths.api)
  const isSignInPath = isPath([
    paths.signInAccount,
    paths.signInStore,
    paths.signInKratos,
    '/loja/cadastro',
    '/loja/confirmacao',
  ])

  const redirects = {
    kratos: paths.signInAccount,
    conta: paths.signInAccount,
    loja: paths.signInStore,
  }

  const atPath = (path: string) => request.nextUrl.pathname.startsWith(path)

  const hasNoUserAndPrivatePath = !user && isPrivatePath
  const hasUserAndGuestPath = !!user && (isGuestPath || isSignInPath)
  const hasUserAndPrivatePath = !!user && isPrivatePath
  const hasUserAndApiPath = !!user && isApiPath

  /**
   * Condiçes de redirecionamento
   *
   * Tem usuário e acessa uma rota privada que não é permitida OK
   * Tem usuário e acesso uma rota de login|recuperar-senha|nova-senha OK
   * Não tem usuário e acessa uma rota privada
   *
   */

  if (hasUserAndApiPath) {
    return NextResponse.next()
  }

  if (hasUserAndPrivatePath) {
    const { role } = user.user_metadata as { role: TypeUser | StoreTypeUser }

    const { isValidPath, signInPath } = validatePathByRole(
      request.nextUrl.pathname,
      role
    )

    if (!isValidPath) {
      await supabase.auth.signOut({
        scope: 'global',
      })
      const url = request.nextUrl.clone()
      url.pathname = signInPath
      return NextResponse.redirect(url)
    }
  }

  if (hasUserAndGuestPath) {
    const { role } = user.user_metadata as {
      role: TypeUser | StoreTypeUser
    }

    const { dashboardPath } = validatePathByRole(request.nextUrl.pathname, role)

    const url = request.nextUrl.clone()
    url.pathname = dashboardPath
    return NextResponse.redirect(url)
  }

  if (hasNoUserAndPrivatePath && !isSignInPath) {
    if (atPath('/kratos')) {
      const url = request.nextUrl.clone()
      url.pathname = redirects.kratos
      return NextResponse.redirect(url)
    }

    if (atPath('/loja')) {
      const url = request.nextUrl.clone()
      url.pathname = redirects.loja
      return NextResponse.redirect(url)
    }

    if (atPath('/conta')) {
      const url = request.nextUrl.clone()
      url.pathname = redirects.conta
      return NextResponse.redirect(url)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
