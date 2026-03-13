import * as React from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';

const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

const hexToRgb = (hex: string): [number, number, number] | null => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return [h, s, v];
}

const hexFromValue = (value: string): string => {
  return /^#[0-9A-Fa-f]{6}$/.test(value) ? value.toUpperCase() : '#6366F1';
}

const PRESETS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#84CC16', '#22C55E', '#10B981', '#14B8A6',
  '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#EC4899', '#64748B', '#374151',
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker = ({ value: valueProp, onChange, className }: ColorPickerProps) => {
  const value = valueProp ?? '#6366F1';
  const [open, setOpen] = React.useState(false);

  const initHsv = (): [number, number, number] => {
    const rgb = hexToRgb(value);
    return rgb ? rgbToHsv(...rgb) : [234, 0.54, 0.95];
  };

  const [hsv, setHsv] = React.useState<[number, number, number]>(initHsv);
  const [hexInput, setHexInput] = React.useState(hexFromValue(value));

  const hsvRef = React.useRef(hsv);
  hsvRef.current = hsv;

  React.useEffect(() => {
    const rgb = hexToRgb(value);
    if (rgb) {
      setHsv(rgbToHsv(...rgb));
      setHexInput(hexFromValue(value));
    }
  }, [value]);

  const gradientRef = React.useRef<HTMLDivElement>(null);
  const hueRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef<'gradient' | 'hue' | null>(null);

  const [hue, sat, val] = hsv;
  const [r, g, b] = hsvToRgb(hue, sat, val);
  const currentHex = rgbToHex(r, g, b);
  const hueColor = `hsl(${hue}, 100%, 50%)`;

  const applyGradient = React.useCallback(
    (clientX: number, clientY: number) => {
      const el = gradientRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const [h] = hsvRef.current;
      setHsv([h, s, v]);
      const hex = rgbToHex(...hsvToRgb(h, s, v));
      setHexInput(hex);
      onChange(hex);
    },
    [onChange],
  );

  const applyHue = React.useCallback(
    (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const newHue = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360));
      const [, s, v] = hsvRef.current;
      setHsv([newHue, s, v]);
      const hex = rgbToHex(...hsvToRgb(newHue, s, v));
      setHexInput(hex);
      onChange(hex);
    },
    [onChange],
  );

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current === 'gradient') applyGradient(e.clientX, e.clientY);
      if (dragging.current === 'hue') applyHue(e.clientX);
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [applyGradient, applyHue]);

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setHexInput(raw);
    if (/^#[0-9A-Fa-f]{6}$/.test(raw)) {
      const rgb = hexToRgb(raw);
      if (rgb) {
        setHsv(rgbToHsv(...rgb));
        onChange(raw.toUpperCase());
      }
    }
  };

  const handlePreset = (color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      setHsv(rgbToHsv(...rgb));
      setHexInput(color.toUpperCase());
      onChange(color.toUpperCase());
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-9 w-full items-center gap-2.5 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm',
            'hover:bg-accent transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className,
          )}
        >
          <span
            className="h-5 w-5 shrink-0 rounded border border-border shadow-sm"
            style={{ backgroundColor: value }}
          />
          <span className="font-mono text-muted-foreground">{value.toUpperCase()}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-60 p-0 overflow-hidden select-none"
        align="start"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          ref={gradientRef}
          className="relative h-40 w-full cursor-crosshair"
          style={{ backgroundColor: hueColor }}
          onMouseDown={(e) => { dragging.current = 'gradient'; applyGradient(e.clientX, e.clientY); }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to right, #fff, transparent)' }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, #000, transparent)' }}
          />
          <div
            className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
            style={{
              left: `${sat * 100}%`,
              top: `${(1 - val) * 100}%`,
              backgroundColor: currentHex,
            }}
          />
        </div>

        <div className="flex flex-col gap-3 p-3">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 shrink-0 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: currentHex }}
            />
            <div
              ref={hueRef}
              className="relative h-3 flex-1 cursor-pointer rounded-full"
              style={{
                background:
                  'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)',
              }}
              onMouseDown={(e) => { dragging.current = 'hue'; applyHue(e.clientX); }}
            >
              <div
                className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
                style={{
                  left: `${(hue / 360) * 100}%`,
                  backgroundColor: hueColor,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-xs font-medium text-muted-foreground">HEX</span>
            <Input
              value={hexInput}
              onChange={handleHexInput}
              className="h-7 font-mono text-xs"
              placeholder="#6366F1"
              maxLength={7}
              spellCheck={false}
            />
          </div>

          <div className="grid grid-cols-8 gap-1">
            {PRESETS.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => handlePreset(color)}
                className={cn(
                  'h-6 w-6 rounded-sm border border-transparent transition-transform hover:scale-110',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  value.toUpperCase() === color.toUpperCase() &&
                    'ring-2 ring-ring ring-offset-1',
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
