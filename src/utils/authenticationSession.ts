import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

class AuthenticationSessionStorage {
  private storage?: Session | null
  private processInstance?: Promise<unknown>
  private processResolve?: (value: unknown) => void
  constructor() {
    this.storage = undefined
  }

  initialProcessing() {
    return this.processInstance
  }

  init() {
    if (this.processInstance) {
      return this.processInstance
    }
    this.processInstance = new Promise((resolve) => {
      this.processResolve = resolve
    })
    return this.processInstance
  }

  private endProcessed() {
    if (this.processResolve) {
      this.processResolve(true)
      this.processResolve = undefined
      this.processInstance = undefined
    }
  }

  async getAuthenticationAsync() {
    await getSession()
    return this.storage
  }

  getAuthentication() {
    return this.storage
  }

  setAuthentication(data: Session | null | undefined) {
    this.storage = data
    this.endProcessed()
  }

  setInitialAuthentication(data: Session | null | undefined) {
    this.storage = data
    this.endProcessed()
  }

  clearAuthentication() {
    this.storage = undefined
  }
}

export default new AuthenticationSessionStorage()