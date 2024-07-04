import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useCheckInMutation } from '@services/attendance'

import { Button } from '@components/atoms/Button'
import { Toast } from '@components/atoms/Toast'
import { useAuthenticationData, useLogoutMutation, useQueryExamples, exampleAuthenticationMutation } from '@services/authentication'

interface ExampleProps {
  // Define the props if needed
}

function ExamplePage(props: ExampleProps): JSX.Element {
  const { t } = useTranslation()
  const [params, setParams] = useState<{ page: number }>()
  const [employeeId, setEmployeeId] = useState<number | null>(null)
  const authenticationData = useAuthenticationData()

  const { data, isLoading } = useQueryExamples(params, { enabled: !!authenticationData })
  const logoutMutation = useLogoutMutation()

  const handleNext = () => setParams((old) => ({ ...(old || {}), page: (old?.page || 1) + 1 }))
  const checkInMutation = useCheckInMutation({
    onSuccess: (data) => {
      Toast.success(data.message)
    },
    onError: (error) => Toast.error(error.message),
  })
  const handleAuthentication = async () => {
    if (!authenticationData) {
      await exampleAuthenticationMutation.mutateAsync({
        // Authentication parameters
      })
      Toast.success(t('example.login_success'))
    } else {
      if (employeeId) {
        try {
          await checkInMutation.mutateAsync({ employee_id: employeeId })
        } catch (error) {
          // Error handling is already done in the onError callback of the mutation
        }
      } else {
        Toast.error(t('example.provide_employee_id'))
      }
      await logoutMutation.mutateAsync({})
      Toast.success(t('example.logout_success'))
    }
  }

  // Rest of the component code
  // ...

  return (
    // JSX for the component
    // ...
  )
}

export default ExamplePage