import * as auth from './auth/service'
import * as faculties from './faculties/service'
import * as users from './users/service'
import * as eventCategories from '@/api/event-categories/service';

export const Api = {
  auth,
  faculties,
  users,
  eventCategories
}