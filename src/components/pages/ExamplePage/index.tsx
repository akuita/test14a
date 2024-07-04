import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from '@components/atoms/Button'
import { Toast } from '@components/atoms/Toast'
import { DefaultPageProps } from '@interfaces/page'

import { useQueryExamples } from '@services/example'
import {
  useAuthenticationData,
  useExampleAuthenticationMutation,
  useLogoutMutation,
} from '@services/authentication'

import styles from './index.module.css'

export type ExampleProps = DefaultPageProps

function ExamplePage(props: ExampleProps): JSX.Element {
  const { t } = useTranslation()
  const [params, setParams] = useState<{ page: number }>()
  const authenticationData = useAuthenticationData()

  const { data, isLoading } = useQueryExamples(params, { enabled: !!authenticationData })
  const exampleAuthenticationMutation = useExampleAuthenticationMutation()
  const logoutMutation = useLogoutMutation()

  const handleNext = () => setParams((old) => ({ ...(old || {}), page: (old?.page || 1) + 1 }))
  const handleAuthentication = async () => {
    if (!authenticationData) {
      await exampleAuthenticationMutation.mutateAsync({
        table: 'example',
        username: 'example',
      })
      Toast.success(t('example.login_success'))
    } else {
      await logoutMutation.mutateAsync({})
      Toast.success(t('example.logout_success'))
    }
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.center_card}>
          <Button
            title={(authenticationData ? t('example.logout') : t('example.login')) || ''}
            onClick={handleAuthentication}
          />
          {authenticationData ? (
            <>
              <pre>{!isLoading ? JSON.stringify(data || {}, null, 2) : t('common.loading')}</pre>
              <Button
                disabled={
                  isLoading || exampleAuthenticationMutation.isLoading || logoutMutation.isLoading
                }
                title={t('example.next') || ''}
                onClick={handleNext}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ExamplePage