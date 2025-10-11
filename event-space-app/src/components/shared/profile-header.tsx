import { Button } from '@/components/ui';
import { Save, SquarePen, X } from 'lucide-react';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  editMode?: boolean;
  onCancelClick?: () => void
  onEditClick?: () => void
}

export const ProfileHeader: React.FC<Props> = ({ editMode, onCancelClick, onEditClick }) => {
  return (
    <div className='flex justify-between items-center max-[500px]:flex-col gap-3 max-[500px]:items-start'>
      <h1 className='text-3xl font-bold'>Мой профиль</h1>

      <div className='relative'>
        <AnimatePresence mode='popLayout'>
          {!editMode ? (
            <motion.div
              key='edit'
              layoutId='actionButtons'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
            >
              <Button onClick={onEditClick}>
                <SquarePen />
                <span>Редактировать</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key='actions'
              layoutId='actionButtons'
              className='flex gap-3'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
            >
              <Button variant='outline' onClick={onCancelClick}>
                <X />
                <span>Отмена</span>
              </Button>
              <Button>
                <Save />
                <span>Сохранить</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}