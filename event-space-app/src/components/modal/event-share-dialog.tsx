import { Dialog, DialogContent, DialogTitle } from '@/components/ui';
import { Check, Copy, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FaTelegramPlane, FaVk, FaWhatsapp } from 'react-icons/fa';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventName: string;
  eventId: number;
}

const shareOptions = [
  {
    id: 'telegram',
    label: 'Telegram',
    icon: FaTelegramPlane,
    getUrl: (url: string, text: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: 'vk',
    label: 'VK',
    icon: FaVk,
    getUrl: (url: string, text: string) =>
      `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    getUrl: (url: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
] as const;

export const EventShareDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  eventName,
  eventId,
}) => {
  const [copied, setCopied] = useState(false);
  const eventUrl = `${window.location.origin}/events/${eventId}`;
  const shareText = eventName;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      toast.success('Ссылка скопирована в буфер обмена');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = eventUrl;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        toast.success('Ссылка скопирована в буфер обмена');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error('Не удалось скопировать ссылку');
      }
      document.body.removeChild(textarea);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: eventName, url: eventUrl });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        toast.error('Не удалось поделиться');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Поделиться</DialogTitle>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] p-3 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </div>
            <span className="text-sm font-medium">
              {copied ? 'Скопировано!' : 'Скопировать ссылку'}
            </span>
          </button>

          <div className="grid grid-cols-3 gap-2">
            {shareOptions.map((option) => (
              <a
                key={option.id}
                href={option.getUrl(eventUrl, shareText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-xl border border-[#E5E5E5] p-3 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-lg">
                  {<option.icon/>}
                </div>
                <span className="text-xs font-medium">{option.label}</span>
              </a>
            ))}
          </div>

          {typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] p-3 hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <ExternalLink className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Ещё</span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
