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
import React, { useEffect, useState } from 'react';
import type { CategoryActivityDto } from '@/api/statistics/model.ts';

interface Props {
  categoriesActivity: CategoryActivityDto[];
}

export const CategoriesActivityBlock: React.FC<Props> = ({
  categoriesActivity,
}) => {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const updateHeight = () => {
      setChartHeight(window.innerWidth < 550 ? 200 : 300);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const categoriesActivityRadarData = categoriesActivity.map((item) => ({
    category: item.category.name,
    value: item.activityPercent,
    displayValue: item.activityPercent === 0 ? 2 : item.activityPercent,
    fullMark: 100,
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Моя активность по категориям
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={categoriesActivityRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Моя активность"
                dataKey="displayValue"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.6}
                dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }}
              />
              <Tooltip
                formatter={(_, name, props) => [
                  `${props.payload.value}%`,
                  name,
                ]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Показатель активности рассчитывается на основе посещённых мероприятий
          и оставленных отзывов
        </p>
      </CardContent>
    </Card>
  );
};
