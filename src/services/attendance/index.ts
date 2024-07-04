import { useMutation, UseMutationOptions } from 'react-query';
import { checkIn, CheckInRequestBody, CheckInResponse } from './requests';

export const useCheckInMutation = (
  options?: UseMutationOptions<CheckInResponse, Error, CheckInRequestBody>
) => {
  return useMutation<CheckInResponse, Error, CheckInRequestBody>(checkIn, options);
};