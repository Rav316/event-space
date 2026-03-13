import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { EVENT_CATEGORIES_KEYS } from './keys';
import { queryClient } from '@/api/query-client.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { toast } from 'sonner';

export const useEventCategories = () => {
  return useQuery({
    queryFn: Api.eventCategories.findAll,
    queryKey: EVENT_CATEGORIES_KEYS.all,
  });
};

export const useEventCategoriesWithEventCount = () => {
  return useQuery({
    queryFn: Api.eventCategories.findAllWithEventCount,
    queryKey: EVENT_CATEGORIES_KEYS.withEventCount,
  });
};

export const useCheckCategoryName = () => {
  return useMutation({
    mutationFn: Api.eventCategories.existsByName,
    onSuccess: (exists, name) => {
      queryClient.setQueryData(EVENT_CATEGORIES_KEYS.nameExists(name), exists);
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: Api.eventCategories.createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.CATEGORIES] });
      await queryClient.invalidateQueries({ queryKey: EVENT_CATEGORIES_KEYS.all });
      toast.success('Категория успешно добавлена');
    },
    onError: () => {
      toast.error('Произошла ошибка при создании категории');
    },
  });
};

export const useEditCategory = () => {
  return useMutation({
    mutationFn: Api.eventCategories.editCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.CATEGORIES] });
      await queryClient.invalidateQueries({ queryKey: EVENT_CATEGORIES_KEYS.all });
      toast.success('Категория успешно изменена');
    },
    onError: () => {
      toast.error('Произошла ошибка при изменении категории');
    },
  });
};

export const useCategoryDeleteImpact = (id: number) => {
  return useQuery({
    queryFn: () => Api.eventCategories.getDeleteImpact(id),
    queryKey: EVENT_CATEGORIES_KEYS.deleteImpact(id),
    enabled: false,
    staleTime: 0,
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: Api.eventCategories.deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.CATEGORIES] });
      await queryClient.invalidateQueries({ queryKey: EVENT_CATEGORIES_KEYS.all });
      toast.success('Категория удалена');
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении категории');
    },
  });
};
