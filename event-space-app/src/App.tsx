import MainPage from "@/pages/main-page.tsx";
import { Header } from '@/components/shared';

const App = () => {
  return (
    <>
      <div className={'sticky top-0 w-full bg-white/50 backdrop-blur-lg'}>
        <Header />
      </div>
      <MainPage/>
    </>
  )
}

export default App
