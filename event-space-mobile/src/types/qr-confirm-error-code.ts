export const QrConfirmErrorCodes = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_NOT_FOUND: 'TOKEN_NOT_FOUND',
  TOO_EARLY: 'TOO_EARLY',
  EVENT_ENDED: 'EVENT_ENDED',
  ALREADY_SCANNED: 'ALREADY_SCANNED'
} as const;

export type QrConfirmErrorCode =
  (typeof QrConfirmErrorCodes)[keyof typeof QrConfirmErrorCodes];

export const QR_ERROR_MESSAGES: Record<QrConfirmErrorCode, string> = {
  INVALID_TOKEN: 'Неверный QR-код',
  TOKEN_NOT_FOUND: 'QR-код не найден',
  TOO_EARLY: 'Сканирование ещё недоступно',
  EVENT_ENDED: 'Мероприятие уже завершено',
  ALREADY_SCANNED: 'Этот QR-код уже был использован'
};

export const QR_ERROR_TITLES: Record<QrConfirmErrorCode, string> = {
  INVALID_TOKEN: 'Билет недействителен',
  TOKEN_NOT_FOUND: 'Билет не найден',
  TOO_EARLY: 'Слишком рано',
  EVENT_ENDED: 'Мероприятие завершено',
  ALREADY_SCANNED: 'Билет уже использован'
};