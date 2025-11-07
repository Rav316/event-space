import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { SliceResponse } from '@/api/model.ts';
import type {
  EventReviewFilter,
  EventReviewListDto,
} from '@/api/event-reviews/model.ts';

export const markReviewAsHelpful = async (reviewId: number): Promise<void> => {
  await axiosInstance.post<void>(
    `${ApiRoutes.EVENT_REVIEWS}/${reviewId}/mark-as-helpful`,
  );
};

export const unmarkReviewAsHelpful = async (
  reviewId: number,
): Promise<void> => {
  await axiosInstance.delete<void>(
    `${ApiRoutes.EVENT_REVIEWS}/${reviewId}/unmark-as-helpful`,
  );
};

export const findAllReviews = async (
  filter: EventReviewFilter,
  page: number,
): Promise<SliceResponse<EventReviewListDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventReviewListDto>>(
    ApiRoutes.EVENT_REVIEWS,
    {
      params: {
        ...filter,
        page,
      },
    },
  );
  return response.data;
};
