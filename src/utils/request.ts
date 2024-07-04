import axios from 'axios'
import authenticationSession from '@utils/authenticationSession'
import publicConfigs from '@constants/env'
import { refreshToken } from '@services/authentication/requests'
import { STORAGE_KEYS } from '@constants/storage'
import { Session } from 'next-auth'

export const request = axios.create()

request.interceptors.request.use(function (config) {
  config.baseURL = publicConfigs.NEXT_PUBLIC_API_URL
  config.headers['Accept'] = 'application/json'
  return config
})

export const requestAuthenticated = axios.create()

let refreshProcess: Promise<unknown> | undefined

requestAuthenticated.interceptors.request.use(async function (config) {
  if (authenticationSession.initialProcessing()) {
    await authenticationSession.initialProcessing()
  }

  let authenticationInfo = authenticationSession.getAuthentication()
  config.baseURL = publicConfigs.NEXT_PUBLIC_API_URL
  config.headers['Accept'] = 'application/json'

  if (!authenticationInfo) {
    return config
  }

  config.headers['Accept'] = 'application/json'
  if (authenticationInfo?.user?.accessToken) {
    config.headers['Authorization'] = `Bearer ${authenticationInfo.user.accessToken}`
  }
  return config
})

requestAuthenticated.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    let authenticationInfo = authenticationSession.getAuthentication()
    // Try to refresh token in this case
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config &&
      !('_retry' in error.config && !error.config._retry) &&
      authenticationInfo?.user?.refreshToken
    ) {
      authenticationInfo = await refreshProcessHandler()
      if (error.config?.headers && authenticationInfo?.user?.accessToken) {
        error.config.headers['Authorization'] = `Bearer ${authenticationInfo.user.accessToken}`
      } else {
        Promise.reject(error)
      }
      // @ts-ignore
      error.config._retry = true
      return request.request(error.config || {})
    }
    return Promise.reject(error)
  },
)

async function refreshProcessHandler() {
  if (!refreshProcess) {
    refreshProcess = refreshToken().then((result) => {
      refreshProcess = undefined
      return result
    })
  }
  return (await refreshProcess) as Session | undefined
}