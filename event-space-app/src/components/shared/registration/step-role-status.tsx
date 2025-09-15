import {
  Label,
  Select,
  SelectContent, SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';
import { BookOpen, Building, GraduationCap, Users } from 'lucide-react';

export const StepRoleStatus = () => {
  const faculties = [
    "Информационные технологии",
    "Экономика и менеджмент",
    "Инженерия и технологии",
    "Гуманитарные науки",
    "Естественные науки",
    "Медицина",
    "Юриспруденция",
    "Искусство и дизайн",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ваш статус</h3>
        <p className="text-muted-foreground text-sm">
          Выберите вашу роль в образовательном процессе
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 rounded-lg border-2 transition-all text-left border-border hover:border-primary/50">
          <BookOpen className="w-6 h-6 mb-2 text-primary" />
          <div className="font-medium">Студент</div>
          <div className="text-xs text-muted-foreground">Участие в мероприятиях</div>
        </button>

        <button className="p-4 rounded-lg border-2 transition-all text-left border-border hover:border-primary/50">
          <GraduationCap className="w-6 h-6 mb-2 text-primary" />
          <div className="font-medium">Преподаватель</div>
          <div className="text-xs text-muted-foreground">Создание мероприятий</div>
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="faculty">Факультет *</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Выберите ваш факультет" />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty} value={faculty}>
                    {faculty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Курс (необязательно)</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Выберите курс" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year} курс
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};