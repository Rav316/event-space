import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { BUILDINGS_KEYS } from '@/api/buildings/keys.ts';
import { queryClient } from '@/api/query-client.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { toast } from 'sonner';

export const useBuildings = () => {
  return useQuery({
    queryFn: Api.buildings.findAll,
    queryKey: BUILDINGS_KEYS.all,
  });
};

export const useCheckBuildingName = () => {
  return useMutation({
    mutationFn: Api.buildings.existsByName,
    onSuccess: (exists, name) => {
      queryClient.setQueryData(BUILDINGS_KEYS.nameExists(name), exists);
    },
  });
};

export const useCreateBuilding = () => {
  return useMutation({
    mutationFn: Api.buildings.createBuilding,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.BUILDINGS] });
      toast.success('Локация успешно добавлена');
    },
    onError: () => {
      toast.error('Произошла ошибка при создании локации');
    },
  });
};

export const useEditBuilding = () => {
  return useMutation({
    mutationFn: Api.buildings.editBuilding,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.BUILDINGS] }),
        queryClient.invalidateQueries({ queryKey: BUILDINGS_KEYS.all }),
      ]);
      toast.success('Локация успешно изменена');
    },
    onError: () => {
      toast.error('Произошла ошибка при изменении локации');
    },
  });
};

export const useDeleteImpact = (id: number) => {
  return useQuery({
    queryFn: () => Api.buildings.getDeleteImpact(id),
    queryKey: BUILDINGS_KEYS.deleteImpact(id),
    enabled: false,
    staleTime: 0,
  });
};

export const useDeleteBuilding = () => {
  return useMutation({
    mutationFn: Api.buildings.deleteBuilding,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.BUILDINGS] });
      toast.success('Локация удалена');
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении локации');
    },
  });
};
