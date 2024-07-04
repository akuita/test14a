import { useMutation, MutateOptions, UseMutationOptions } from 'react-query'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { ExampleAuthenticationRequestBody, exampleAuthentication, logout } from './requests'

export const useLogoutMutation = (options?: MutateOptions<unknown, unknown, unknown, unknown>) =>
  useMutation(logout, options)

export const useAuthenticationData = () => {
  const { data } = useSession()
  return data
}

export const useExampleAuthenticationMutation = (
  options?: UseMutationOptions<
    Session | null | undefined,
    unknown,
    ExampleAuthenticationRequestBody,
    unknown
  >,
) => {
  return useMutation<
    Session | null | undefined,
    unknown,
    ExampleAuthenticationRequestBody,
    unknown
  >(exampleAuthentication, options)
}