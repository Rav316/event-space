import { ArrowRight, Calendar, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link, useNavigate } from 'react-router';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { HeroSectionCard } from '@/components/shared';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { data } = useMe();
  const setAuthModalAuthModal = useAuthModalStore((state) => state.setIsOpen);

  const handleEventCreateClick = () => {
    if (data) {
      navigate('/events/create');
    } else {
      setAuthModalAuthModal(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-5 relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-y-5"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="px-5 max-w-[600px] py-2.5 bg-white rounded-3xl flex justify-center items-center gap-2 border border-[#E5E5E5]"
        >
          <Sparkles className="text-purple-600" />
          <span className="font-medium text-center">
            Новая платформа для студенческих мероприятий
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 bg-clip-text text-transparent"
        >
          EventSpace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-[600px] text-center text-[#717182] text-lg"
        >
          Открывайте, создавайте и участвуйте в студенческих мероприятиях.
          Система афиши нового поколения для активной студенческой жизни.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-x-3 w-auto justify-center max-[440px]:flex-col max-[440px]:gap-y-3 max-[440px]:w-full"
        >
          <Button
            className="group h-[40px] max-[440px]:w-full"
            onClick={handleEventCreateClick}
          >
            Создать мероприятие
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-[3px] transition-transform" />
          </Button>
          <Link to="/events">
            <Button variant="outline" className="h-[40px] max-[440px]:w-full">
              Обзор мероприятий
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-x-5 items-center max-w-[800px] max-[599px]:flex-col max-[599px]:gap-y-6"
        >
          <HeroSectionCard
            Icon={Calendar}
            title="Простое планирование"
            description="Создавайте мероприятия за считанные минуты с интуитивным интерфейсом"
          />
          <HeroSectionCard
            Icon={Users}
            title="QR-регистрация"
            description="Мгновенная регистрация участников через QR-коды и push-уведомления"
          />
          <HeroSectionCard
            Icon={Sparkles}
            title="Аналитика"
            description="Детальная статистика и отчеты для повышения эффективности мероприятий"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
