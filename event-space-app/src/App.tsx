import MainPage from '@/pages/main-page.tsx';
import { Route, Routes } from 'react-router';
import { OutletHeader } from '@/components/hoc';
import EventsPage from '@/pages/events-page.tsx';
import Page404 from '@/pages/page-404.tsx';
import RegistrationPage from '@/pages/registration-page.tsx';
import { RequireAuth } from '@/components/hoc/require-auth.tsx';
import EventCreatePage from '@/pages/event-create-page.tsx';
import { LoginModal } from '@/components/modal';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<OutletHeader />}>
          <Route path="/" element={<MainPage />} />
          <Route path={'/register'} element={<RegistrationPage />} />
          <Route path={'/events'} element={<EventsPage />} />
          <Route
            path={'/events/create'}
            element={
              <RequireAuth>
                <EventCreatePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <LoginModal/>
    </>
  );
};

export default App;
