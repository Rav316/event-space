import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  type PieLabelRenderProps,
} from 'recharts';
import React from 'react';
import type { CategoryDistributionDto } from '@/api/statistics/model.ts';
import { categoryChartColors } from '@/constants/category-chart-colors.ts';

interface Props {
  categoriesDistribution: CategoryDistributionDto[];
}

export const CategoriesDistributionBlock: React.FC<Props> = ({
  categoriesDistribution,
}) => {
  const pieData = categoriesDistribution.map((item) => ({
    name: item.category.name,
    value: item.count,
  }));

  const renderLabel = ({ name, percent }: PieLabelRenderProps) =>
    `${name ?? ''} ${((Number(percent) || 0) * 100).toFixed(0)}%`;

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Общее распределение по категориям
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                labelLine={false}
                animationDuration={600}
                label={renderLabel}
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={categoryChartColors[i % categoryChartColors.length]}
                    className="outline-none"
                  />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
