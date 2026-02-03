import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

// DEV MODE: Permitir acesso sem login
const DEV_SKIP_AUTH = true

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean
  redirectPath?: string
}

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = '/login' } = options ?? {}
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(!DEV_SKIP_AUTH)
  const [error, setError] = useState<Error | null>(null)
  const [, setLocation] = useLocation()

  useEffect(() => {
    // Se DEV_SKIP_AUTH estiver ativo, não verificar autenticação
    if (DEV_SKIP_AUTH) return

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (DEV_SKIP_AUTH) return
    if (!redirectOnUnauthenticated) return
    if (loading) return
    if (user) return
    if (typeof window === 'undefined') return
    if (window.location.pathname === redirectPath) return

    setLocation(redirectPath)
  }, [redirectOnUnauthenticated, redirectPath, loading, user, setLocation])

  const logout = useCallback(async () => {
    if (DEV_SKIP_AUTH) {
      setLocation('/login')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error)
    }
    setUser(null)
    setSession(null)
    setLoading(false)
    setLocation('/login')
  }, [setLocation])

  const refresh = useCallback(async () => {
    if (DEV_SKIP_AUTH) return
    setLoading(true)
    const { data: { session }, error } = await supabase.auth.refreshSession()
    if (error) {
      setError(error)
    } else {
      setSession(session)
      setUser(session?.user ?? null)
    }
    setLoading(false)
  }, [])

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated: DEV_SKIP_AUTH || !!user,
    logout,
    refresh,
  }
}
