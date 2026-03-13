import { useMutation, useQuery } from '@tanstack/react-query';
import { COMPLAINT_KEYS } from '@/api/complaint/keys.ts';
import { Api } from '@/api/api-client.ts';
import type { ComplaintCreateDto } from '@/api/complaint/model.ts';
import { toast } from 'sonner';

export const useComplaintTypes = (enabled = true) => {
  return useQuery({
    queryKey: [COMPLAINT_KEYS.COMPLAINT_TYPES],
    queryFn: () => Api.complaints.findAllComplaintTypes(),
    enabled,
  });
};

export const useCreateComplaint = () => {
  return useMutation({
    mutationFn: (dto: ComplaintCreateDto) =>
      Api.complaints.createComplaint(dto),
    onSuccess: () => {
      toast.success('Жалоба успешно отправлена');
    },
  });
};
