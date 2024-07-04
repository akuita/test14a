import { request } from '@utils/request'
import axios from 'axios'

export type CheckInRequestBody = {
  employee_id: number;
}

export type CheckInResponse = {
  status: number;
  message: string;
  check_in_time: string;
}

export const checkIn = async (body: CheckInRequestBody): Promise<CheckInResponse> => {
  try {
    const response = await request({
      url: '/api/attendance/check-in',
      method: 'POST',
      data: body,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('Bad Request: The request is malformed or contains invalid parameters.')
        case 401:
          throw new Error('Unauthorized: The user is not authenticated or not authorized to perform the check-in.')
        case 409:
          throw new Error('Conflict: The employee has already checked in.')
        default:
          throw new Error('An unexpected error has occurred.')
      }
    }
    throw error
  }
}