import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie, Cell
} from 'recharts';

const categoryData = [
  { name: 'IT-секции', value: 35, color: '#f97316' },
  { name: 'Учебные', value: 28, color: '#3b82f6' },
  { name: 'Культурные', value: 22, color: '#8b5cf6' },
  { name: 'Спортивные', value: 15, color: '#10b981' },
]

export const CategoriesDistributionBlock = () => {
  return (
    <Card className={'w-full h-full'}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PieChart className={'w-5 h-5'} />
          Общее распределение по категориям
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx='50%'
                cy='50%'
                outerRadius={100}
                dataKey='value'
                labelLine={false}
                animationDuration={600}
                label={({ name, percent }) =>
                  `${name} ${((percent as number) * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className={'outline-none'} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}