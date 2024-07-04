import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next' // Import useTranslation hook
import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | 'attendanceSystemCheckIn'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, ...rest } = props
  const { t } = useTranslation() // Initialize the translation hook
  const component = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
    }

    if (linkTo) {
      return (
        <a href={linkTo} className={styles.link_tag}>
          {component}
        </a>
      )
    }
    return component
  }, [linkTo, children, title])

  return ( // Use translation keys for button text
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType], {
      [styles.attendanceSystemCheckIn]: buttonType === 'attendanceSystemCheckIn', // Add custom class for AttendanceSystem check-in button
      ...rest.buttonType === 'attendanceSystemCheckIn' && { 'aria-label': t('button.checkIn') } // Add aria-label for accessibility
    })} {...rest}>
      {component}
    </button>
  )
})

export default Button