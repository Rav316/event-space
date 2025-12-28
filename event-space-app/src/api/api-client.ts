import * as auth from '@/api/auth/service';
import * as faculties from '@/api/faculties/service';
import * as users from '@/api/users/service';
import * as events from '@/api/events/service';
import * as eventCategories from '@/api/event-categories/service';
import * as eventReviews from '@/api/event-reviews/service';
import * as spaces from '@/api/spaces/service';
import * as buildings from '@/api/buildings/service';
import * as spaceTypes from '@/api/space-types/service';
import * as statistics from '@/api/statistics/service';

export const Api = {
  auth,
  faculties,
  users,
  events,
  eventCategories,
  eventReviews,
  spaces,
  buildings,
  spaceTypes,
  statistics,
};
