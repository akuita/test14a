import type {
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetServerSidePropsContext,
} from 'next'
import { getServerSession } from 'next-auth'
import { QueryClient } from 'react-query'
import authenticationSession from '@utils/authenticationSession'
import { AxiosError } from 'axios'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getToken } from 'next-auth/jwt'

export async function initServerInfo(context: GetStaticPropsContext | GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  if (!('req' in context && 'res' in context)) {
    return { queryClient, session: null }
  }

  const session = await getServerSession(context.req, context.res, authOptions)
  const token = await getToken({ req: context.req })
  if (session && token) {
    authenticationSession.setAuthentication({
      expires: session?.expires,
      user: token,
    })
    return { queryClient, session: { expires: session?.expires, user: token } }
  }
  return { queryClient, session: null, token: null }
}

export function errorHandler(error: unknown) {
  // Display 404 page if the error is 404
  const errorStatus = (error as AxiosError)?.response?.status
  const handleErrors: Record<string | number, GetServerSidePropsResult<{}>> = {
    404: { notFound: true },
    401: {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    },
  }
  if (errorStatus && handleErrors[errorStatus]) {
    return handleErrors[errorStatus]
  }
  // Display 500 page for other errors in production mode
  throw error
}