import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@components/atoms/Button'
import styles from './index.module.css'

function AttendanceSystemPage(): JSX.Element {
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState('08:30:20') // Placeholder for current time

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.logo_alt')} />
          <span>{t('AttendanceSystem.title')}</span>
        </div>
        <div>
          <a href="#" className={styles.navLink}>
            <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.time_tracking_alt')} />
            <span>{t('AttendanceSystem.time_tracking')}</span>
          </a>
          <a href="#" className={`${styles.navLink} inactive`}>
            <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.time_sheet_alt')} />
            <span className="inactive">{t('AttendanceSystem.time_sheet')}</span>
          </a>
          <a href="#" className={styles.navLink}>
            <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.profile_alt')} />
          </a>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>{t('AttendanceSystem.user_info', { name: 'Jack Daniel', role: 'Developer' })}</span>
        </div>
        <span className={styles.dateText}>{t('AttendanceSystem.current_date', { date: 'Wednesday, 27 September, 2023' })}</span>
        <span className={styles.timeText}>{currentTime}</span>
        <div className={styles.buttonGroup}>
          <Button buttonType="checkIn" onClick={() => console.log('Check in clicked')}>
            {t('AttendanceSystem.check_in')}
          </Button>
          <Button buttonType="checkedOut" onClick={() => console.log('Checked out clicked')}>
            {t('AttendanceSystem.checked_out')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AttendanceSystemPage