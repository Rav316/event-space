import React from 'react';
import { Badge, Progress } from '@/components/ui';

interface Props {
  title: string;
  myActivity: number;
  avgActivity: number;
  maxActivity: number;
}

export const UserActivityItem: React.FC<Props> = ({
  title,
  myActivity,
  avgActivity,
  maxActivity,
}) => {
  const diffPercent =
    avgActivity === 0 ? 0 : ((myActivity - avgActivity) / avgActivity) * 100;

  const myIsHigher = myActivity > avgActivity;
  const avgIsHigher = avgActivity > myActivity;

  const myStyle = myIsHigher ? 'font-bold text-lg' : 'text-gray-700';
  const avgStyle = avgIsHigher ? 'font-bold text-lg' : 'text-gray-700';

  let badgeColor: string;
  if (diffPercent > 0) badgeColor = 'text-green-600';
  else if (diffPercent < 0) badgeColor = 'text-red-600';
  else badgeColor = 'text-gray-500';

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-sm text-gray-500">{title}</span>

      <div className="flex items-center gap-2">
        <span className={myStyle}>{myActivity}</span>
        <span className="text-gray-500">vs</span>
        <span className={avgStyle}>{avgActivity}</span>
      </div>

      <Progress value={Math.min(100, (myActivity / maxActivity) * 100)} />

      <Badge variant="outline">
        <span className={badgeColor}>
          {diffPercent > 0 ? '+' : ''}
          {diffPercent.toFixed(0)}%
        </span>
      </Badge>
    </div>
  );
};
