import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { FACULTIES_KEYS } from '@/api/faculties/keys.ts';
import { queryClient } from '@/api/query-client.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { toast } from 'sonner';

export const useFaculties = () => {
  return useQuery({
    queryFn: Api.faculties.findAll,
    queryKey: FACULTIES_KEYS.all,
  });
};

export const useCheckFacultyName = () => {
  return useMutation({
    mutationFn: Api.faculties.existsByName,
  });
};

export const useCreateFaculty = () => {
  return useMutation({
    mutationFn: Api.faculties.createFaculty,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.FACULTIES] });
      await queryClient.invalidateQueries({ queryKey: FACULTIES_KEYS.all });
      toast.success('Факультет успешно добавлен');
    },
    onError: () => {
      toast.error('Произошла ошибка при создании факультета');
    },
  });
};

export const useEditFaculty = () => {
  return useMutation({
    mutationFn: Api.faculties.editFaculty,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.FACULTIES] });
      await queryClient.invalidateQueries({ queryKey: FACULTIES_KEYS.all });
      toast.success('Факультет успешно изменён');
    },
    onError: () => {
      toast.error('Произошла ошибка при изменении факультета');
    },
  });
};

export const useFacultyDeleteImpact = (id: number) => {
  return useQuery({
    queryFn: () => Api.faculties.getDeleteImpact(id),
    queryKey: FACULTIES_KEYS.deleteImpact(id),
    enabled: false,
    staleTime: 0,
  });
};

export const useDeleteFaculty = () => {
  return useMutation({
    mutationFn: Api.faculties.deleteFaculty,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.FACULTIES] });
      await queryClient.invalidateQueries({ queryKey: FACULTIES_KEYS.all });
      toast.success('Факультет удалён');
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении факультета');
    },
  });
};
