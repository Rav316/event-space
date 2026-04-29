import * as auth from '@/api/auth/service';
import * as programs from '@/api/programs/service';
import * as users from '@/api/users/service';
import * as events from '@/api/events/service';
import * as eventCategories from '@/api/event-categories/service';
import * as eventReviews from '@/api/event-reviews/service';
import * as spaces from '@/api/spaces/service';
import * as buildings from '@/api/buildings/service';
import * as statistics from '@/api/statistics/service';
import * as complaints from '@/api/complaint/service';
import * as admin from '@/api/admin/service';

export const Api = {
  auth,
  programs,
  users,
  events,
  eventCategories,
  eventReviews,
  spaces,
  buildings,
  statistics,
  complaints,
  admin,
};
