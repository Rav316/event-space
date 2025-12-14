import { isAxiosError } from 'axios';
import { ErrorResponse } from '@/src/api/model';
import {
  QR_ERROR_MESSAGES,
  QrConfirmErrorCode
} from '@/src/types/qr-confirm-error-code';

export const getQrErrorMessage = (error: unknown): string => {
  if (isAxiosError<ErrorResponse>(error)) {
    const code = error.response?.data?.reason?.code as
      | QrConfirmErrorCode
      | undefined;

    if (code && code in QR_ERROR_MESSAGES) {
      return QR_ERROR_MESSAGES[code];
    }

    return 'Ошибка сервера. Попробуйте позже';
  }

  return 'Произошла неизвестная ошибка';
};
