// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth'

declare module '@modular-css/rollup'

interface DefaultUser {
  tokenType: string
  error?: string
  authenticatedId?: string | number
  authenticatedOwner?: string
  authenticatedData?: any
  accessToken: string
  refreshToken?: string
  accessTokenExpireAt?: number | string
  expiresIn?: number
  scope?: string
  createdAt?: number
}
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & DefaultSession['user']
  }
  interface User extends DefaultUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultUser {}
}