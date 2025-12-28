import { Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  imageUrl: string | null;
  setFile: (file: File) => void;
  clearImage: () => void;
}

export const MediaSettingsStep: React.FC<Props> = ({
  imageUrl,
  setFile,
  clearImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const isValidFile = (file: File) =>
    ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0 && isValidFile(selectedFiles[0])) {
      setFile(e.target.files[0]);
      e.target.value = '';
    } else {
      toast.warning('Можно загружать только jpg, png или gif');
      e.target.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0 && isValidFile(droppedFiles[0])) {
      setFile(droppedFiles[0]);
    }
  };

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <div className={'flex flex-col gap-1'}>
        <h3 className={'font-medium text-xl'}>Обложка мероприятия</h3>
        <span className={'text-muted-foreground text-sm'}>
          Рекомендуемый размер: 1200x630 пикселей. Поддерживаемые форматы: JPG,
          PNG, GIF
        </span>
      </div>
      <div className={'flex w-full justify-center'}>
        <div
          className={cn(
            'relative w-full max-w-[800px] border-2 border-dashed rounded-lg p-8 transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25',
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {imageUrl && (
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 text-red-500 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-col gap-4 items-center justify-center text-center">
            {imageUrl ? (
              <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            )}

            <label>
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                accept=".png,.jpg,.jpeg,.gif"
              />
              <Button asChild variant={'outline'} className={'w-[180px]'}>
                <span>Загрузить обложку</span>
              </Button>
            </label>

            <span className={'text-muted-foreground'}>
              Или перетащите файл сюда
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
