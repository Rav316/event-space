import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventImageState {
  file: File | null;
  previewUrl: string | null;
  setFile: (file: File) => void;
  clearImage: () => void;
}

export const useEventImageStore = create<EventImageState>()(
  devtools(
    immer((set) => ({
      file: null,
      previewUrl: null,
      setFile: (file) => {
        if (file) {
          const currentPreviewUrl = useEventImageStore.getState().previewUrl;
          if (currentPreviewUrl) {
            URL.revokeObjectURL(currentPreviewUrl);
          }
          const previewUrl = URL.createObjectURL(file);
          set(
            (state) => {
              state.file = file;
              state.previewUrl = previewUrl;
            },
            false,
            'setFile',
          );
        }
      },
      clearImage: () => {
        const currentPreviewUrl = useEventImageStore.getState().previewUrl;
        if (currentPreviewUrl) {
          URL.revokeObjectURL(currentPreviewUrl);
        }
        set(
          (state) => {
            state.file = null;
            state.previewUrl = null;
          },
          false,
          'clearImage',
        );
      },
    })),
    {
      name: 'eventImageStore',
      store: 'event-image-store',
    },
  ),
);
