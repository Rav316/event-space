import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { OutletHeader, RequireAdmin, RequireEventManager, RequireGuest } from '@/components/hoc';
import Page404 from '@/pages/page-404.tsx';
import { RequireAuth } from '@/components/hoc/require-auth.tsx';
import { LoginModal } from '@/components/modal';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { PageLoader } from '@/components/ui';

const MainPage = lazy(() => import('@/pages/main-page.tsx'));
const EventsPage = lazy(() => import('@/pages/events-page.tsx'));
const EventPage = lazy(() => import('@/pages/event-page.tsx'));
const EventCreatePage = lazy(() => import('@/pages/event-create-page.tsx'));
const EventEditPage = lazy(() => import('@/pages/event-edit-page.tsx'));
const ProfilePage = lazy(() => import('@/pages/profile-page.tsx'));
const MyEventsPage = lazy(() => import('@/pages/my-events-page.tsx'));
const MyRegistrationsPage = lazy(
  () => import('@/pages/my-registrations-page.tsx'),
);
const StatisticsPage = lazy(() => import('@/pages/statistics-page.tsx'));
const RegistrationPage = lazy(() => import('@/pages/registration-page.tsx'));
const AdminPage = lazy(() => import('@/pages/admin-page.tsx'));
const DirectoriesPage = lazy(() => import('@/pages/directories-page.tsx'));

const App = () => {
  const token = useAuthStore((state) => state.accessToken);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route key={token ? 'auth' : 'guest'} element={<OutletHeader />}>
            <Route path="/" element={<MainPage />} />
            <Route
              path={'/register'}
              element={
                <RequireGuest>
                  <RegistrationPage />
                </RequireGuest>
              }
            />
            <Route path={'/events'} element={<EventsPage />} />
            <Route
              path={'/my-events'}
              element={
                <RequireEventManager>
                  <MyEventsPage />
                </RequireEventManager>
              }
            />
            <Route
              path={'/events/create'}
              element={
                <RequireEventManager>
                  <EventCreatePage />
                </RequireEventManager>
              }
            />
            <Route path={'/events/:eventId'} element={<EventPage />} />
            <Route
              path={'/events/:eventId/edit'}
              element={
                <RequireEventManager>
                  <EventEditPage />
                </RequireEventManager>
              }
            />
            <Route
              path={'/profile'}
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path={'/my-registrations'}
              element={
                <RequireAuth>
                  <MyRegistrationsPage />
                </RequireAuth>
              }
            />
            <Route
              path={'/statistics'}
              element={
                <RequireAuth>
                  <StatisticsPage />
                </RequireAuth>
              }
            />
            <Route
              path={'/admin'}
              element={
                <RequireAdmin>
                  <AdminPage />
                </RequireAdmin>
              }
            />
            <Route
              path={'/admin/directories'}
              element={
                <RequireAdmin>
                  <DirectoriesPage />
                </RequireAdmin>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
      <LoginModal />
    </>
  );
};

export default App;
