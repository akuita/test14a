import React from 'react';
import { useTranslation } from 'next-i18next';
import { useCheckInMutation } from '@services/attendance';
import { Button } from '@components/atoms/Button';
import styles from './index.module.css';

export default function AttendanceSystemPage(): JSX.Element {
  const { t } = useTranslation();

  const checkInMutation = useCheckInMutation({
    onSuccess: (data) => {
      // Handle successful check-in (e.g., show a message, update state)
    },
    onError: (error) => {
      // Handle check-in error (e.g., show an error message)
    },
  });

  const handleCheckIn = () => {
    // Replace with actual employee ID logic
    const employeeId = 123; // Example employee ID
    checkInMutation.mutate({ employeeId });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.userSection}>
          <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.userIcon')} className={styles.userIcon} />
          <span className={styles.userName}>{t('AttendanceSystem.userName', { name: 'Jack Daniel - Developer' })}</span>
        </div>
        <div className={styles.dateSection}>
          <img src="https://studio-next.jitera.app/no.png" alt={t('AttendanceSystem.calendarIcon')} className={styles.calendarIcon} />
          <span className={styles.date}>{t('AttendanceSystem.date', { date: 'Wednesday, 27 September, 2023' })}</span>
        </div>
        <div className={styles.time}>{t('AttendanceSystem.time', { time: '08:30:20' })}</div>
        <div className={styles.actions}>
          <Button
            buttonType="attendanceSystemCheckIn"
            className={styles.checkInButton}
            onClick={handleCheckIn}
          >
            {t('AttendanceSystem.checkIn')}
          </Button>
          <Button buttonType="default" className={styles.checkedOutButton}>
            {t('AttendanceSystem.checkedOut')}
          </Button>
        </div>
      </div>
    </div>
  );
}