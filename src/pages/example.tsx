import type { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate } from 'react-query'
import { initServerInfo } from '@utils/serverSide'
import ExamplePage from '@components/pages/ExamplePage'
import { fetchExamples } from '@services/example'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en', query } = context
  const options: {
    props?: Record<string, unknown>
    redirect?: Record<string, unknown>
  } = {}
  const { queryClient, session } = await initServerInfo(context)

  if (session) {
    await fetchExamples(queryClient, query?.page ? { page: +query.page } : undefined)
  }

  return {
    ...options,
    props: {
      session,
      query: query || null,
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: 'source_base',
        description: '',
      },
      ...(await serverSideTranslations(locale, ['all'])),
      ...(options.props || {}),
    },
  }
}

export default ExamplePage