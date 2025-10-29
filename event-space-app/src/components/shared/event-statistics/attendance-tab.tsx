import { Card, CardHeader } from '@/components/ui';
import { Activity } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const attendanceData = [
  { day: 'Пн', value: 17 },
  { day: 'Вт', value: 23 },
  { day: 'Ср', value: 44 },
  { day: 'Чт', value: 60 },
  { day: 'Пт', value: 22 },
  { day: 'Сб', value: 10 },
  { day: 'Вс', value: 5 },
];

export const AttendanceTab = () => {
  return (
    <div>
      <div className={'flex items-center gap-5 w-full'}>
        <Card className={'w-1/2'}>
          <CardHeader>
            <div className={'flex items-center gap-2'}>
              <Activity className={'h-5 w-5'} />
              Посещаемость по дням недели
            </div>
            <div className={'w-full h-[300px]'}>
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray={'3 3'} />
                  <XAxis dataKey={'day'} />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey={'value'}
                    fill={'#8B5CF6'}
                    name={'Посещаемость'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
