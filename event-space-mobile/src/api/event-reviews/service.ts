import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const markReviewAsHelpful = async (reviewId: number): Promise<void> => {
  await axiosInstance.post(
    `${ApiRoutes.EVENT_REVIEWS}/${reviewId}/mark-as-helpful`
  );
};

export const unmarkReviewAsHelpful = async (
  reviewId: number
): Promise<void> => {
  await axiosInstance.delete(
    `${ApiRoutes.EVENT_REVIEWS}/${reviewId}/unmark-as-helpful`
  );
};
