import {Wrapper} from "@/components/hoc";
import { HeroSection } from '@/components/shared';

const MainPage = () => {
  return (
    <>
      <div className={'w-full flex justify-center bg-[#F4F2F7]'}>
        <div className={'w-full max-w-[1720px] px-[20px] py-[100px] max-[675px]:py-[50px]'}>
          <HeroSection/>
        </div>
      </div>

      <Wrapper>

      </Wrapper>
    </>
  )
}

export default MainPage;