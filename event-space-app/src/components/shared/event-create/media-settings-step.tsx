import { Upload } from 'lucide-react';
import { Button } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const MediaSettingsStep = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const isValidFile = (file: File) => {
    return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0 && isValidFile(droppedFiles[0])) {
      setFile(droppedFiles[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0 && isValidFile(selectedFiles[0])) {
      setFile(selectedFiles[0]);
    } else {
      toast.warning('Можно загружать только jpg, png или gif');
    }
  };

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <div className={'flex flex-col gap-1'}>
        <h3 className={'font-medium text-xl'}>Обложка мероприятия</h3>
        <span className={'text-muted-foreground text-sm'}>Рекомендуемый размер: 1200x630 пикселей. Поддерживаемые форматы: JPG, PNG, GIF</span>
      </div>
      <div className={'flex w-full justify-center'}>
        <div
          className={cn(
            'w-full max-w-[800px] border-2 border-dashed rounded-lg p-8 transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            {preview ? (
              <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={preview}
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
