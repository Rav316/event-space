import type { SpaceFilter } from '@/api/spaces/model.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { SPACES_KEYS } from '@/api/spaces/keys.ts';
import { queryClient } from '@/api/query-client.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { toast } from 'sonner';

export const useSpaces = (filter: SpaceFilter) => {
  return useQuery({
    queryFn: () => Api.spaces.findAllByFilter(filter),
    queryKey: [SPACES_KEYS.filters(filter)],
    enabled: filter.building !== 0,
    staleTime: Infinity,
  });
};

export const useSpaceTypes = () => {
  return useQuery({
    queryFn: Api.spaces.findAllSpaceTypes,
    queryKey: SPACES_KEYS.spaceTypes,
    staleTime: Infinity,
  });
};

export const useCheckSpaceNameAndBuilding = () => {
  return useMutation({
    mutationFn: ({ name, building }: { name: string; building: number }) =>
      Api.spaces.existsByNameAndBuilding(name, building),
    onSuccess: (exists, { name, building }) => {
      queryClient.setQueryData(SPACES_KEYS.nameAndBuildingExists(name, building), exists);
    },
  });
};

export const useCreateSpace = () => {
  return useMutation({
    mutationFn: Api.spaces.createSpace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.SPACES] });
      toast.success('Пространство успешно добавлено');
    },
    onError: () => {
      toast.error('Произошла ошибка при создании пространства');
    },
  });
};

export const useEditSpace = () => {
  return useMutation({
    mutationFn: Api.spaces.editSpace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.SPACES] });
      toast.success('Пространство успешно изменено');
    },
    onError: () => {
      toast.error('Произошла ошибка при изменении пространства');
    },
  });
};

export const useSpaceDeleteImpact = (id: number) => {
  return useQuery({
    queryFn: () => Api.spaces.getDeleteImpact(id),
    queryKey: SPACES_KEYS.deleteImpact(id),
    enabled: false,
    staleTime: 0,
  });
};

export const useDeleteSpace = () => {
  return useMutation({
    mutationFn: Api.spaces.deleteSpace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.SPACES] });
      toast.success('Пространство удалено');
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении пространства');
    },
  });
};
