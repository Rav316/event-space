import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { PROGRAMS_KEYS } from '@/api/programs/keys.ts';
import { queryClient } from '@/api/query-client.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { toast } from 'sonner';

export const usePrograms = () => {
  return useQuery({
    queryFn: Api.programs.findAll,
    queryKey: PROGRAMS_KEYS.all,
  });
};

export const useCheckProgramName = () => {
  return useMutation({
    mutationFn: Api.programs.existsByName,
  });
};

export const useCreateProgram = () => {
  return useMutation({
    mutationFn: Api.programs.createProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.PROGRAMS] });
      await queryClient.invalidateQueries({ queryKey: PROGRAMS_KEYS.all });
      toast.success('Направление успешно добавлен');
    },
    onError: () => {
      toast.error('Произошла ошибка при создании направления');
    },
  });
};

export const useEditProgram = () => {
  return useMutation({
    mutationFn: Api.programs.editProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.PROGRAMS] });
      await queryClient.invalidateQueries({ queryKey: PROGRAMS_KEYS.all });
      toast.success('Направление успешно изменён');
    },
    onError: () => {
      toast.error('Произошла ошибка при изменении направления');
    },
  });
};

export const useProgramDeleteImpact = (id: number) => {
  return useQuery({
    queryFn: () => Api.programs.getDeleteImpact(id),
    queryKey: PROGRAMS_KEYS.deleteImpact(id),
    enabled: false,
    staleTime: 0,
  });
};

export const useDeleteProgram = () => {
  return useMutation({
    mutationFn: Api.programs.deleteProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.PROGRAMS] });
      await queryClient.invalidateQueries({ queryKey: PROGRAMS_KEYS.all });
      toast.success('Направление удалён');
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении направления');
    },
  });
};
