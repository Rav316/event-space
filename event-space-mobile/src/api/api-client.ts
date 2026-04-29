import * as auth from './auth/service';
import * as events from './events/service';
import * as eventReviews from './event-reviews/service';
import * as programs from './programs/service';
import * as users from './users/service';
import * as eventCategories from './event-categories/service';

export const Api = {
  auth,
  events,
  eventReviews,
  programs,
  users,
  eventCategories
}