import { useTranslation } from 'next-i18next'

import { Button } from '@components/atoms/Button'
import { DefaultPageProps } from '@interfaces/page'

import styles from './index.module.css'

export type Page404Props = DefaultPageProps & {
  className?: string
}

function Page404Page(props: Page404Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.row}>
            <p className={styles.text_status}>{`404`}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.text_title}>
              {t('404.title')}
            </p>
          </div>
          <div className={styles.row}>
            <p className={styles.text_title}>
              {t('404.description')}
            </p>
          </div>
          <div className={styles.row}>
            <Button linkTo="/" buttonType="primary" className={styles.button}>
              {t('common.go_to_home')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404Page