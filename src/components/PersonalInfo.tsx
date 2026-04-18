import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface InfoCardProps {
  label: string;
  content: string;
}

function InfoCard({ label, content }: InfoCardProps) {
  return (
    <Card className="soft-shadow border-border/50 glass-effect opacity-0 intersect:opacity-100 transition-opacity duration-700 hover:shadow-lg hover:scale-105 transition-all">
      <CardHeader className="pb-3">
        <h3 className="text-sm md:text-base font-medium text-primary">
          {label}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-base md:text-lg text-foreground leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}

export function PersonalInfo() {
  const infoItems = [
    {
      label: '我现在主要在做',
      content: '利用AI协作进行产品开发和英语辩论',
    },
    {
      label: '我的兴趣',
      content: '写作、电影、辩论、哲学、音乐',
    },
    {
      label: '我一个比较有记忆点的特点',
      content: '天马行空的丰富想象力及强大的感知力',
    },
    {
      label: '我的主要成就',
      content: '2025中国大学生英语辩论赛一等奖及全国最佳辩手',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {infoItems.map((item, index) => (
        <InfoCard key={index} label={item.label} content={item.content} />
      ))}
    </div>
  );
}
