import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const markReviewAsHelpful = async (reviewId: number): Promise<void> => {
  await axiosInstance.post<void>(`${ApiRoutes.EVENT_REVIEWS}/${reviewId}/mark-as-helpful`);
}

export const unmarkReviewAsHelpful = async (reviewId: number): Promise<void> => {
  await axiosInstance.delete<void>(`${ApiRoutes.EVENT_REVIEWS}/${reviewId}/unmark-as-helpful`);
}