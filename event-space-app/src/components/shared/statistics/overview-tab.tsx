import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { BarChart3, Clock, Star, TrendingUp, Users } from 'lucide-react';
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
import { UserActivityItem } from '@/components/shared/statistics/user-activity-item.tsx';
import { useOverviewStatistics } from '@/api/statistics/hooks.ts';
import { months } from '@/constants/months.ts';
import { dayOfWeeks } from '@/constants/dayOfWeeks.ts';
import { OverviewTabSkeleton } from '@/components/shared/statistics/overview-tab-skeleton.tsx';

export const OverviewTab = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useOverviewStatistics();

  if (isStatisticsPending || !statistics) {
    return <OverviewTabSkeleton />;
  }

  const monthActivityChartData = statistics.monthEventStatistics.map(
    (item) => ({
      ...item,
      month: months[item.month - 1],
    }),
  );

  const dayOfWeekChartData = statistics.dayOfWeekStatistics.map((item) => ({
    ...item,
    dayOfWeek: dayOfWeeks[item.dayOfWeek - 1],
  }));

  const reviewsDynamicChartData = statistics.reviewsDynamicStatistics.map(
    (item) => ({
      ...item,
      month: months[item.month - 1],
    }),
  );

  const reviewsAvgRatingChartData = statistics.reviewsAvgRatingStatistics.map(
    (item) => ({
      ...item,
      month: months[item.month - 1],
    }),
  );

  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <div className={'flex items-center gap-5 w-full max-[900px]:flex-col'}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className={'flex items-center gap-2'}>
              <BarChart3 className="h-5 w-5" />
              Моя активность по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthActivityChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={20} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="confirmedEventsCount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Мероприятия"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className={'flex items-center gap-2'}>
              <Users className="h-5 w-5" />
              Моя активность по дням недели
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayOfWeekChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dayOfWeek" />
                <YAxis width={20} />
                <Tooltip />
                <Bar
                  dataKey="attendedEventsCount"
                  fill="#10b981"
                  name="Среднее кол-во мероприятий"
                />
              </BarChart>
            </ResponsiveContainer>
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
        <div className={'flex items-center gap-6 w-full max-[1025px]:flex-col'}>
          <UserActivityItem
            title={'Мероприятий за месяц'}
            myActivity={statistics.attendedEventsLastMonth}
            avgActivity={statistics.avgAttendedEventsPerUserLastMonth || 0}
            maxActivity={10}
          />
          <UserActivityItem
            title={'Отзывов на мероприятие за последний месяц'}
            myActivity={statistics.reviewsLastMonth}
            avgActivity={statistics.avgReviewsPerUserLastMonth || 0}
            maxActivity={100}
          />
          <UserActivityItem
            title={'Средняя оценка'}
            myActivity={statistics.avgRating || 0}
            avgActivity={statistics.avgRatingSystem || 0}
            maxActivity={5}
          />
        </div>
      </div>

      <div className={'flex items-center gap-5 w-full max-[900px]:flex-col'}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Динамика отзывов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reviewsDynamicChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} width={20} />
                <Tooltip />
                <Bar dataKey="reviewsCount" fill="#8b5cf6" name="Отзывов" />
              </BarChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reviewsAvgRatingChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} width={20} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#eab308"
                  strokeWidth={3}
                  name="Средняя оценка"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
