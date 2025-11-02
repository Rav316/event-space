import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Target } from 'lucide-react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const myActivityRadarData = [
  { category: 'IT', value: 85, fullMark: 100 },
  { category: 'Учебные', value: 65, fullMark: 100 },
  { category: 'Культурные', value: 45, fullMark: 100 },
  { category: 'Спортивные', value: 30, fullMark: 100 },
  { category: 'Волонтерские', value: 50, fullMark: 100 },
]

export const CategoriesActivityBlock = () => {
  return (
    <Card className={'w-full h-full'}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className={'w-5 h-5'} />
          Моя активность по категориям
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={myActivityRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Моя активность"
                dataKey="value"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Показатель активности рассчитывается на основе посещённых мероприятий и оставленных отзывов
        </p>
      </CardContent>

    </Card>
  );
};
