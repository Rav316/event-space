import MainPage from '@/pages/main-page.tsx';
import { Route, Routes } from 'react-router';
import { OutletHeader } from '@/components/hoc';
import EventsPage from '@/pages/events-page.tsx';
import Page404 from '@/pages/page-404.tsx';
import RegistrationPage from '@/pages/registration-page.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<OutletHeader />}>
        <Route path="/" element={<MainPage />} />
        <Route path={'/events'} element={<EventsPage />} />
        <Route path={'/register'} element={<RegistrationPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
