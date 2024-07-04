import { request } from '@utils/request'
import axios from 'axios'

const ENDPONTS = {
  USERS_LIST: 'https://reqres.in/api/users',
}

export type GetExamplesParamsType = {
  page?: number
}
export const getExamples = async (params?: GetExamplesParamsType) => {
  try {
    const res = await request({
      url: ENDPONTS.USERS_LIST,
      method: 'GET',
      params,
    })
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // TODO: handle 401 error
    }
    throw error
  }
}