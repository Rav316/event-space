import MainPage from '@/pages/main-page.tsx';
import { Route, Routes } from 'react-router';
import { OutletHeader, RequireGuest } from '@/components/hoc';
import EventsPage from '@/pages/events-page.tsx';
import Page404 from '@/pages/page-404.tsx';
import RegistrationPage from '@/pages/registration-page.tsx';
import { RequireAuth } from '@/components/hoc/require-auth.tsx';
import EventCreatePage from '@/pages/event-create-page.tsx';
import { LoginModal } from '@/components/modal';
import EventPage from '@/pages/event-page.tsx';
import ProfilePage from '@/pages/profile-page.tsx';
import { useAuthStore } from '@/store/use-auth-store.ts';
import MyRegistrationsPage from '@/pages/my-registrations-page.tsx';
import StatisticsPage from '@/pages/statistics-page.tsx';

const App = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <>
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
            path={'/events/create'}
            element={
              <RequireAuth>
                <EventCreatePage />
              </RequireAuth>
            }
          />
          <Route path={'/events/:eventId'} element={<EventPage />} />
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
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <LoginModal />
    </>
  );
};

export default App;
