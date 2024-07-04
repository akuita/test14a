import { useTranslation } from 'next-i18next'

import { Button } from '@components/atoms/Button'

import { DefaultPageProps } from '@interfaces/page'

import styles from './index.module.css'

export type Page500Props = DefaultPageProps & {
  className?: string
}

function Page500Page(props: Page500Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.row}>
            <p className={styles.text_status}>{`500`}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.text_title}>
              {t('500.title')}
            </p>
          </div>
          <div className={styles.row}>
            <p className={styles.text_title}>
              {t('500.description')}
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

export default Page500Page