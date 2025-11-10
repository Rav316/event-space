import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
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

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Общее распределение по категориям
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center w-full">
          {/* График */}
          <div className="w-full max-w-[400px] h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  animationDuration={600}
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

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 px-2 w-full">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 min-w-[120px]">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{
                    backgroundColor:
                      categoryChartColors[i % categoryChartColors.length],
                  }}
                ></div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {entry.name} — {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
