import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import {BarChart3, Clock, Star, TrendingUp, Users} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { UserActivityItem } from '@/components/shared/event-statistics/user-activity-item.tsx';

const monthlyData = [
  { month: 'Янв', events: 12, attendees: 340 },
  { month: 'Фев', events: 18, attendees: 520 },
  { month: 'Мар', events: 24, attendees: 680 },
  { month: 'Апр', events: 31, attendees: 890 },
  { month: 'Май', events: 28, attendees: 750 },
  { month: 'Июн', events: 35, attendees: 980 },
];

const myReviewsData = [
  { month: 'Янв', reviews: 5, avgRating: 4.5 },
  { month: 'Фев', reviews: 4, avgRating: 4.8 },
  { month: 'Мар', reviews: 2, avgRating: 4.6 },
  { month: 'Апр', reviews: 6, avgRating: 4.9 },
  { month: 'Май', reviews: 8, avgRating: 4.7 },
  { month: 'Июн', reviews: 7, avgRating: 5.0 },
]

export const OverviewTab = () => {
  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <div className={'flex items-center gap-5 w-full'}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className={'flex items-center gap-2'}>
              <BarChart3 className="h-5 w-5" />
              Мероприятия по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="events"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Мероприятия"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className={'flex items-center gap-2'}>
              <Users className="h-5 w-5" />
              Участники по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendees" fill="#10b981" name="Участники" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <CardTitle className={'flex items-center gap-2'}>
          <TrendingUp className={'h-5 w-5'} />
          <span>Ваша активность vs среднее по системе</span>
        </CardTitle>
        <div className={'flex items-center gap-6 w-full'}>
          <UserActivityItem
            title={'Мероприятий за месяц'}
            myActivity={15}
            avgActivity={3.5}
            maxActivity={10}
          />
          <UserActivityItem
            title={'Отзывов на мероприятие'}
            myActivity={42}
            avgActivity={74}
            maxActivity={100}
          />
          <UserActivityItem
            title={'Средняя оценка'}
            myActivity={4.7}
            avgActivity={4.3}
            maxActivity={5}
          />
        </div>
      </div>

      <div className={'flex items-center gap-5 w-full'}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Динамика отзывов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height={'100%'}>
                <BarChart data={myReviewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reviews" fill="#8b5cf6" name="Отзывов" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Средняя оценка по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={myReviewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgRating"
                    stroke="#eab308"
                    strokeWidth={3}
                    name="Средняя оценка"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
