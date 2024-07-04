import { signIn, signOut, SignOutParams, getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import authenticationSession from '@utils/authenticationSession'
import { STORAGE_KEYS } from '@constants/storage'

export type NextAuthSignInResponse = {
  error: string | undefined
  ok: boolean
  status: number
  url: string | null
}

export type SuccessResponse = { success: true }

export type TokenResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  resource_owner: string
  resource_id: number
  created_at: Date
  refresh_token_expires_in: number
}

export type ExampleAuthenticationRequestBody = {
  table: string
  username: string
}
export const exampleAuthentication = async (body: ExampleAuthenticationRequestBody) => {
  const result = (await signIn('exampleAuthentication', {
    table: body.table,
    username: body.username,
    redirect: false,
  })) as NextAuthSignInResponse

  if (!result || result.error) {
    throw new Error(result?.error)
  }
  localStorage.setItem(STORAGE_KEYS.TOKEN_CREATED_TIME, `${Date.now()}`)

  const info = await authenticationSession.getAuthenticationAsync()
  return info
}

export const refreshToken = async () => {
  const result = (await getSession({
    triggerEvent: true,
    broadcast: true,
  })) as Session
  if (!result || (result as { error?: string })?.error) {
    return logout()
  }

  authenticationSession.setAuthentication(result)
  return result
}

export const logout = async (options?: SignOutParams) => {
  authenticationSession.clearAuthentication()
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.TOKEN_CREATED_TIME)
    await signOut(options)
  }
}