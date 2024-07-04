import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AttendanceSystemPage from '@components/pages/AttendanceSystem'

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = 'en' } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['all'])),
      seo: {
        title: 'Attendance System',
        description: 'Track and manage your attendance records.',
      },
    },
  }
}

export default AttendanceSystemPage